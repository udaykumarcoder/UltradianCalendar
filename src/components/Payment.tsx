// import Image from "next/image";
// const Payment = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Here’s Your Image</h1>
//       <Image 
//         src="/QR.jpg" 
//         alt="Displayed Image" 
//         width={400} 
//         height={300} 
//         className="rounded-lg shadow-lg"
//       />
//     </div>
//   );
// };

// export default Payment;
import { useState } from "react";
import Image from "next/image";

const Payment = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);



  return (
    <div className="payment-container">
      <h1 className="payment-heading">Pay 1rs</h1>

      {/* QR Code Image */}
      <Image 
        src="/QR.jpg" 
        alt="Displayed QR Code" 
        width={400} 
        height={300} 
        className="qr-image"
      />

      {/* Image Upload Input */}
      

      {/* Preview Uploaded Image */}
      {uploadedImage && (
        <div className="uploaded-image-container">
          <img 
            src={uploadedImage} 
            alt="Uploaded Preview" 
            className="uploaded-image"
          />
        </div>
      )}
    </div>
  );
};

export default Payment;
