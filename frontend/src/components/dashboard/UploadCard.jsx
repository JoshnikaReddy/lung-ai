import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

function UploadCard() {
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-6">
        Upload Chest X-ray
      </h2>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-2xl h-96 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
      >
        <input {...getInputProps()} />

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-80 object-contain rounded-xl"
          />
        ) : (
          <>
            <FaCloudUploadAlt
              size={70}
              className="text-blue-500 mb-5"
            />

            <p className="text-2xl font-semibold">
              Drag & Drop X-ray Here
            </p>

            <p className="text-gray-500 mt-3">
              or click to browse
            </p>
          </>
        )}
      </div>

      <button
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
      >
        Analyze X-ray
      </button>

    </div>
  );
}

export default UploadCard;