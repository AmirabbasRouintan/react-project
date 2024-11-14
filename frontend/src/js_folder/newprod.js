import { useState, useEffect } from 'react';

const useNewProduct = () => {
    const [numberOfPallets, setNumberOfPallets] = useState(0);
    const [productName, setProductName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [warehouseData, setWarehouseData] = useState({}); 

    useEffect(() => {
        const fetchWarehouseData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/get-warehouse');
                if (response.ok) {
                    const data = await response.json();
                    setWarehouseData(data); 
                } else {
                    console.error('Failed to fetch warehouse data');
                }
            } catch (error) {
                console.error('Error fetching warehouse data:', error);
            }
        };

        fetchWarehouseData(); 
    }, []);

    const handleSubmit = async (productData) => {
        const { identifier, productName, numberOfPallets } = productData;
    
        if (numberOfPallets < 0) {
            setErrorMessage('تعداد پالت‌ها نمی‌تواند منفی باشد.');
            return;
        }
    
        const pricePerPallet = warehouseData.price_per_pallet || 0;
        const totalPrice = numberOfPallets * pricePerPallet; 
        const totalRawMaterialsUsed = numberOfPallets * 43; 
    
        setLoading(true); 
    
        try {
            const warehouseResponse = await fetch('http://localhost:3000/api/update-warehouse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    numberOfPallets,
                    totalRawMaterialsUsed,
                }),
            });
    
            if (!warehouseResponse.ok) {
                throw new Error('Failed to update warehouse');
            }
    
            const productResponse = await fetch('http://localhost:3000/api/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier, // Pass identifier directly
                    productName,
                    numberOfPallets,
                    totalPrice,
                    rawMaterialsUsed: totalRawMaterialsUsed,
                }),
            });
    
            if (!productResponse.ok) {
                throw new Error('Failed to add product');
            }
    
            setNumberOfPallets(0);
            setProductName('');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        } finally {
            setLoading(false); 
        }
    };

    return {
        numberOfPallets,
        productName,
        loading,
        errorMessage,
        setNumberOfPallets,
        setProductName,
        handleSubmit,
        warehouseData, 
    };
};

export default useNewProduct;