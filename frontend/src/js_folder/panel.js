import { useEffect, useState } from 'react';

const useFetchData = () => {
    const [products, setProducts] = useState([]);
    const [warehouse, setWarehouse] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/get-products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchWarehouseData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/get-warehouse');
                if (response.ok) {
                    const data = await response.json();
                    setWarehouse(data);
                } else {
                    console.error('Failed to fetch warehouse data');
                }
            } catch (error) {
                console.error('Error fetching warehouse data:', error);
            }
        };

        fetchProducts();
        fetchWarehouseData();
    }, []);

    return { products, warehouse };
};

export default useFetchData;