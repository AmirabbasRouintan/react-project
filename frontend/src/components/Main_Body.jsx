import React from 'react'
import '../index.css'
import { Button, ButtonGroup } from "@nextui-org/button"

export default function main_body() {
  return (
    <>
      <div className='MainBody'>
        <div className='Titles'>
          <h1 className='Title'>شرکت پلاستیکی ایران</h1>
          <p className='Content'>
            شرکت پلاستیکی ایران به عنوان یک نهاد کلیدی در صنعت پلاستیک کشور
            نقش مهمی در تولید و تأمین نیازهای بازار داخلی و صادرات ایفا می‌کند. این شرکت‌ها
            به تولید انواع محصولات پلاستیکی از جمله ظروف یکبار مصرف، بسته‌بندی‌های غذایی و صنعتی
            و تجهیزات مرتبط با صنایع پلاستیک مشغول هستند. با توجه به گسترش استفاده از پلاستیک
            در زندگی روزمره، این شرکت‌ها به دنبال نوآوری و بهبود کیفیت محصولات خود هستند.
          </p>
        </div>
      </div>
      <div className='Buttons'>
        <Button className='Button1' variant="ghost" radius="sm" size="md"><a href="/login">ورود کاربر</a></Button>
        <Button className='Button2' variant="solid" radius="sm" size="md">ثبت نام</Button>
      </div>
    </>
  )
}
