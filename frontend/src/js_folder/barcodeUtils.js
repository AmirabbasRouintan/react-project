import JsBarcode from 'jsbarcode';

export const updateWarehouse = async (numberOfPallets) => {
    const totalRawMaterialsUsed = numberOfPallets * 5;

    const response = await fetch('http://localhost:3000/api/update-warehouse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numberOfPallets,
            totalRawMaterialsUsed,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to update warehouse');
    }
};

export const generateBarcodes = async (productName, pricePerPallet, numberOfPallets) => {
    const barcodes = [];

    for (let i = 0; i < numberOfPallets; i++) {
        const date = new Date().toLocaleString();
        const barcodeData = `Product: ${productName}, Date: ${date}, Price: ${pricePerPallet}, Pallet Number: ${i + 1}`;

        const canvas = document.createElement('canvas');
        JsBarcode(canvas, barcodeData, {
            format: "CODE128",
            width: 2,
            height: 40,
            displayValue: true,
        });

        const imgDataUrl = canvas.toDataURL("image/png");
        barcodes.push({ imgDataUrl, palletNumber: i + 1 });
    }

    return barcodes;
};

export const saveBarcodes = async (barcodes) => {
    for (const { imgDataUrl, palletNumber } of barcodes) {
        await fetch('http://localhost:3000/api/save-barcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imgDataUrl, palletNumber }),
        });
    }
};

export const addProduct = async (productName, numberOfPallets, pricePerPallet) => {
    const response = await fetch('http://localhost:3000/api/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productName,
            numberOfPallets,
            pricePerPallet,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to add product');
    }
};