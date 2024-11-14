import React from 'react';
import UserIcon from '../assets/UserIcon.svg';
import '../index.css';
import useFetchData from '../js_folder/panel'; 

export default function Navbar_Panel() {
  const { warehouse } = useFetchData();

  return (
    <>
      <div className='Navbar-Panel'>
        <a className='Navbar-Panel-Icon' href='/'><img src={UserIcon} alt="UserIcon" /></a>
        <a className='Navbar-Panel-Links' href='/barcodes'>جستجو محصول</a>
        <a className='Navbar-Panel-Links' href='/Newprod'>ایجاد پالت جدید</a>
        <a className='Navbar-Panel-Links' href='/panel'>تمام محصولات</a>
      </div>
      <div className='Navbar-Panel-Card'>
        <div className="Navbar-Panel-Card3">
          <h3>مواد اولیه استفاده شده</h3>
          <h4>+{warehouse.raw_materials_used || 0} kg</h4>
        </div>
        <div className="Navbar-Panel-Card1">
          <h3>تعداد محصولاتی تولید شده</h3>
          <h4>+{warehouse.total_items || 0}</h4>
        </div>
        <div className="Navbar-Panel-Card2">
          <h3>تعداد پالت‌ها</h3>
          <h4>+{warehouse.total_pallets || 0}</h4>
        </div>
        <div className="Navbar-Panel-Card2">
          <h3>قیمت هر پالت</h3>
          <h4>{warehouse.price_per_pallet ? `${warehouse.price_per_pallet} تومان` : 'اطلاعات موجود نیست'}</h4>
        </div>
      </div>
    </>
  );
}