import React, { useState } from 'react';
import '../index.css';
import useNewProduct from '../js_folder/newprod';
import Navbar_Panel from './Navbar_Panel';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useNavigate } from 'react-router-dom';

const NewProd = () => {
    const {
        numberOfPallets,
        productName,
        setNumberOfPallets,
        setProductName,
        handleSubmit,
        warehouseData
    } = useNewProduct();

    const [identifier, setIdentifier] = useState('');
    const navigate = useNavigate();

    const handleAutoCompleteIdentifier = () => {
        const newIdentifier = `ID-${Math.floor(Math.random() * 10000)}`;
        setIdentifier(newIdentifier);
    };

    const handleSubmitWithIdentifier = async (e) => {
        e.preventDefault();

        const productData = {
            identifier,
            productName,
            numberOfPallets,
            pricePerPallet: warehouseData.price_per_pallet || 0
        };

        try {
            await handleSubmit(productData);
            alert('Product added successfully!');

            navigate('/barcodes');

            resetForm();
        } catch (error) {
            console.error('Error adding product:', error);
            alert(error.message);
        }
    };

    const resetForm = () => {
        setIdentifier('');
        setProductName('');
        setNumberOfPallets(0);
    };

    return (
        <>
            <Navbar_Panel />
            <div className='NewProduct'>
                <h1>ایجاد پالت جدید</h1>
                <form onSubmit={handleSubmitWithIdentifier}>
                    <div className="NewProductInput1">
                        <Input
                            variant="bordered"
                            label="شناسه"
                            size="sm"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>
                    <div className="NewProductInput2">
                        <Input
                            variant="bordered"
                            label="نام محصول"
                            size="sm"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="NewProductInput3">
                        <Input
                            variant="bordered"
                            label="تعداد پالت"
                            size="sm"
                            type="number"
                            value={numberOfPallets || ''}
                            onChange={(e) => setNumberOfPallets(e.target.value ? Number(e.target.value) : 0)}
                            required
                        />
                    </div>
                    <div className="Button">
                        <Button 
                          className='ButtonPr' 
                          radius="sm" 
                          variant="ghost" 
                          type="button" 
                          onClick={resetForm} 
                        >
                          لغو دستورات
                        </Button>
                        <Button
                            className='ButtonPr'
                            radius="sm"
                            variant="ghost"
                            type="button"
                            onClick={handleAutoCompleteIdentifier}
                            style={{ marginRight: '8px' }}
                        >
                            تکمیل خودکار شناسه
                        </Button>
                        <Button className='ButtonPr' radius="sm" variant="ghost" type="submit">ثبت دستورات</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewProd;