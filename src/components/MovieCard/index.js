import React from "react";
import Picture from "../../assets/logo.jpg";

const MovieCard = ({ movie, onDelete, onUpdate }) => {
  return (
    <div className="flex flex-col border p-4 bg-white rounded-lg shadow-lg relative">
      <div className="flex">
        <div className="w-1/2">
          <img
            src={Picture}
            alt={movie.name}
            className="w-full h-auto rounded"
          />
        </div>
        <div className="w-1/2 pl-4">
          <label
            htmlFor={`movie-name-${movie.id}`}
            className="block text-xl font-semibold"
          >
            Title:
          </label>
          <h3 className="text-lg font-semibold text-gray-700">{movie.name}</h3>
          <label
            htmlFor={`movie-type-${movie.id}`}
            className="block text-xl font-semibold"
          >
            Type:
          </label>
          <p className="text-lg font-semibold text-gray-700">{movie.type}</p>
          <label
            htmlFor={`movie-description-${movie.id}`}
            className="block text-xl font-semibold"
          >
            Description:
          </label>
          <p className="text-lg font-semibold text-gray-700">
            {movie.description}
          </p>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-auto absolute bottom-4 right-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
          onClick={() => onUpdate(movie.id)}
        >
          Update
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600"
          onClick={() => onDelete(movie.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
