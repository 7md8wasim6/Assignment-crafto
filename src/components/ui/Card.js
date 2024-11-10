import React from "react";

export const Card = ({ quote }) => {
  return (
    <div
      key={quote.id}
      className="bg-white rounded-lg shadow-md m-2 overflow-hidden"
    >
      <div className="relative">
        <img
          src={
            quote.mediaUrl ||
            "https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4="
          }
          alt={quote.text}
          className="w-full h-60 object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded max-w-full truncate">
          {quote.text}
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-gray-800 font-semibold truncate">{quote.username}</p>
        <p className="text-gray-500 text-sm">
          {new Date(quote.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
