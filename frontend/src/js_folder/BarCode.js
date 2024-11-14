import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";

export const fetchProductInfo = async (identifier, setProductInfo) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/get-product-by-identifier/${identifier}`
    );
    if (!response.ok) throw new Error("Product not found");
    const data = await response.json();
    setProductInfo(data);
  } catch (error) {
    console.error("Error fetching product info:", error);
    alert(error.message);
  }
};

export const generateBarcodes = (productInfo, identifier, setBarcodes, setBarcodeRange, setShowConfirmation) => {
  if (!productInfo) return;
  const generatedBarcodes = Array.from(
    { length: productInfo.number_of_pallets },
    (_, i) => `${identifier}-${i + 1}`
  );
  setBarcodes(generatedBarcodes);
  setBarcodeRange(
    `${identifier}-1 to ${identifier}-${productInfo.number_of_pallets}`
  );
  setShowConfirmation(true);
};

export const createBarcodeImages = async (barcodes, identifier, setGeneratedBarcodeImages) => {
  const images = await Promise.all(
    barcodes.map(async (barcode, index) => {
      const baseBarcode = identifier.replace("ID-", "");
      const barcodeNumber = `${baseBarcode}-${index + 1}`;
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, barcodeNumber, {
        format: "code128",
        width: 2,
        height: 40,
      });
      return canvas.toDataURL();
    })
  );
  setGeneratedBarcodeImages(images);
};

export const downloadBarcodesAsPDF = (productInfo, identifier, barcodes) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a5",
  });

  doc.text(`Identifier: ${identifier}`, 10, 20);

  const barcodeWidth = 40;
  const barcodeHeight = 20;
  const margin = 5;
  let x = 10;
  let y = 30;

  const pallets = parseInt(productInfo.number_of_pallets);
  const baseBarcode = identifier.split("-")[1];

  for (let i = 1; i <= pallets; i++) {
    const barcodeNumber = `${baseBarcode}-${i}`;
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, barcodeNumber, {
      format: "code128",
      width: 1,
      height: 20,
      displayValue: true,
    });
    const dataURL = canvas.toDataURL();

    if (x + barcodeWidth > 140) {
      x = 10;
      y += barcodeHeight + margin;
    }

    if (y > 250) {
      doc.addPage();
      x = 10;
      y = 30;
    }

    doc.addImage(dataURL, "PNG", x, y, barcodeWidth, barcodeHeight);
    doc.text(barcodeNumber, x, y + barcodeHeight + 5);

    x += barcodeWidth + margin;
  }

  doc.save(`${identifier}-barcodes.pdf`);
};