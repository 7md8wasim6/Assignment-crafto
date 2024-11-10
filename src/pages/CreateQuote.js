import React, { useState } from "react";
import { createQuoteApi, uploadImage } from "../api/Api";

export const CreateQuote = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    uploadImage(file)
      .then((mediaUrl) => {
        const token = localStorage.getItem("token");
        return createQuoteApi(text, mediaUrl, token);
      })
      .then(() => {
        setLoading(false);
        setSuccess("Quote created successfully!");
        setText("");
        setFile(null);
      })
      .catch((error) => {
        setLoading(false);
        setError("Error submitting quote. Please try again.");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-md shadow-md max-w-lg mx-auto bg-white"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Quote</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your quote"
        className="border p-2 rounded w-full mb-2"
      />
      <input type="file" onChange={handleFileChange} className="mt-2 mb-4" />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded w-full disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      {success && <p className="mt-4 text-green-600">{success}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </form>
  );
};
