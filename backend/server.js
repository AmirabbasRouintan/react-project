const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const BWIPJS = require('bwip-js'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('Welcome to the API'); 
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.execute(query, [email, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error hashing password' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, password });

    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [email], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length > 0) {
            const user = results[0];
            console.log('User found:', user);

            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return res.status(200).json({ message: 'Login successful' });
            } else {
                console.log('Password mismatch');
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            console.log('No user found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

app.post('/api/update-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10); 
        const query = 'UPDATE users SET password = ? WHERE email = ?';
        db.execute(query, [hashedPassword, email], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating password' });
            }
            res.status(200).json({ message: 'Password updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error hashing password' });
    }
});

app.post('/api/add-product', async (req, res) => {
    const { identifier, productName, numberOfPallets } = req.body;

    const warehouseQuery = 'SELECT price_per_pallet FROM warehouse WHERE id = 1';
    db.query(warehouseQuery, async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length > 0) {
            const pricePerPallet = results[0].price_per_pallet;
            const totalPrice = numberOfPallets * pricePerPallet;
            const rawMaterialsUsed = numberOfPallets * 43;

            const query = `
                INSERT INTO \`new-product\` (date, number_of_pallets, total_price, product_name, raw_materials_used, identifier)
                VALUES (NOW(), ?, ?, ?, ?, ?)
            `;

            db.execute(query, [numberOfPallets, totalPrice, productName, rawMaterialsUsed, identifier], (err) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                res.status(201).json({ message: 'Product added successfully' });
            });
        } else {
            return res.status(404).json({ message: 'Warehouse data not found' });
        }
    });
});

app.post('/api/update-warehouse', (req, res) => {
    const { numberOfPallets, totalRawMaterialsUsed } = req.body;

    const query = `
        UPDATE warehouse 
        SET raw_materials_used = raw_materials_used - ?, 
            total_items = total_items + ?, 
            total_pallets = total_pallets + ?
        WHERE id = 1;
    `;

    db.execute(query, [totalRawMaterialsUsed, numberOfPallets * 12, numberOfPallets], (err) => {
        if (err) {
            console.error('Error updating warehouse:', err);
            return res.status(500).json({ message: 'Error updating warehouse' });
        }
        res.status(200).json({ message: 'Warehouse updated successfully' });
    });
});

app.get('/api/get-products', (req, res) => {
    const query = 'SELECT id, date, number_of_pallets, total_price, product_name, raw_materials_used, identifier FROM `new-product`';
  
    db.query(query, (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Server error' });
      }
      res.status(200).json(results);
    });
});

app.get('/api/get-warehouse', (req, res) => {
    const query = 'SELECT * FROM warehouse WHERE id = 1';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: 'No warehouse data found' });
        }
    });
});

app.get('/api/get-product-by-identifier/:identifier', (req, res) => {
    const { identifier } = req.params;

    const query = 'SELECT id, date, number_of_pallets, total_price, product_name, raw_materials_used FROM `new-product` WHERE identifier = ?';

    db.execute(query, [identifier], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length > 0) {
            return res.status(200).json(results[0]); 
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    });
});



app.get('/api/get-product/:barcode', (req, res) => {
    const { barcode } = req.params;
 
    const query = 'SELECT * FROM `new-product` WHERE identifier = ?';
 
    db.execute(query,[barcode],(err,result)=>{
        if(err){
            console.error("Database error:", err);
            return res.status(500).json({message:'Server error'});
        }
 
        if(result.length > 0){
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({message:'Product not found'});
        }
    });
 });

app.listen(PORT || process.env.PORT , () => {
    console.log(`Server running on port ${PORT}`);
});