import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { 
   fetchProductInfo,
   generateBarcodes,
   createBarcodeImages,
   downloadBarcodesAsPDF 
} from '../js_folder/BarCode'; 

const BarCode = () => {
   const [identifier, setIdentifier] = useState("");
   const [productInfo, setProductInfo] = useState(null);
   const [showConfirmation, setShowConfirmation] = useState(false);
   const [barcodeRange, setBarcodeRange] = useState("");
   const [barcodes, setBarcodes] = useState([]);
   const [generatedBarcodeImages, setGeneratedBarcodeImages] = useState([]);

   return (
     <div className="BarCode-Container">
       <h1>تولید بارکد</h1>
       <Input
         variant="bordered"
         className="BarCode-Input"
         label="شناسه جستجو"
         value={identifier}
         onChange={(e) => setIdentifier(e.target.value)}
         required
       />
       <Button
         variant="ghost"
         className="BarCode-Button"
         onClick={() => fetchProductInfo(identifier, setProductInfo)}
       >
         جستجو
       </Button>

       {productInfo && (
         <div className="BarCode-Hide-Container">
           <div className="BarCode-Hide-Content-1">
             <h2>اطلاعات محصول</h2>
             <p>نام محصول : {productInfo.product_name}</p>
             <p>تعداد پالت : {productInfo.number_of_pallets}</p>
             <p>قیمت کل : {productInfo.total_price}</p>
             <Button
               variant="ghost"
               className="BarCode-Button"
               onClick={() => generateBarcodes(productInfo, identifier, setBarcodes, setBarcodeRange, setShowConfirmation)}
             >
               تولید بارکد
             </Button>
           </div>
           {showConfirmation && (
             <div className="BarCode-Confirmation-Box">
               <div className="BarCode-Confirmation-Box-Desc">
                 <h2>بارکدهای تولید شده</h2>
                 <p>{barcodeRange}</p>
                 <Button
                   variant="ghost"
                   className="BarCode-Button"
                   onClick={() => createBarcodeImages(barcodes, identifier, setGeneratedBarcodeImages)}
                 >
                   ایجاد تصاویر بارکد
                 </Button>
                 <Button
                   variant="ghost"
                   className="BarCode-Button"
                   onClick={() => downloadBarcodesAsPDF(productInfo, identifier, barcodes)}
                 >
                   A5 دانلود سایز
                 </Button>
                 {generatedBarcodeImages.length > 0 && (
                 <div className="barcode_image_item">
                   {generatedBarcodeImages.map((imgSrc, index) => (
                     <div key={index}>
                       <p>{barcodes[index]} : </p>
                       <img src={imgSrc} alt={`Barcode ${index + 1}`} />
                       <hr />
                     </div>
                   ))}
                 </div>
               )}
               </div>
             </div>
           )}
         </div>
       )}
       
       <br />
       <br />
       <br />

     </div>
   );
};

export default BarCode;