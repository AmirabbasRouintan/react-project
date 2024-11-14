import FetchData from '../js_folder/panel'; 
import React from 'react';
import '../index.css';

const Panel = () => {
    const { products, warehouse } = FetchData();

    return (
        <div className="panel">
            <div className="product-cards">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2>{product.product_name}</h2>
                        <p>شناسه: {product.identifier}</p>
                        <p>تاریخ: {new Date(product.date).toLocaleString()}</p>
                        <p>تعداد پالت‌ها: {product.number_of_pallets}</p>
                        <p>قیمت هر پالت: {warehouse.price_per_pallet} تومان</p>
                        <p>قیمت کل: {product.total_price} تومان</p>
                        <p>مواد اولیه استفاده شده: {product.raw_materials_used} کیلوگرم</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Panel;