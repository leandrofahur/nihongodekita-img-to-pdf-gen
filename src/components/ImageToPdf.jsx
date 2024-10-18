import { useState } from "react";
import jsPDF from "jspdf";

const ImageToPdf = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result); // Get image as base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate the PDF from the image
  const generatePdf = () => {
    if (!image) return;

    const doc = new jsPDF();

    // Add image to PDF (x, y, width, height)
    doc.addImage(imageURL, "JPEG", 10, 10, 180, 160); // Adjust size as needed

    // Save the PDF
    doc.save("image.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Generate PDF from Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "10px" }}
      />
      <div>
        {imageURL && (
          <img
            src={imageURL}
            alt="Selected"
            width="200"
            style={{ marginBottom: "10px" }}
          />
        )}
      </div>
      <button
        onClick={generatePdf}
        disabled={!image}
        style={{ padding: "10px" }}
      >
        Generate PDF
      </button>
    </div>
  );
};

export default ImageToPdf;
