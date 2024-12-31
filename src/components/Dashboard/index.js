import React, { useState, useEffect } from "react";
import Header from "../Header";
import MovieCard from "../MovieCard";
import Modal from "../modal";
import { useSelector, useDispatch } from "react-redux";
import {
  addMovie,
  deleteMovie,
  setFilter,
  setMovies,
} from "../../redux/slices/movieSlice";
import {
  axiosGet,
  axiosPost,
  axiosPut,
  axiosDelete,
} from "../../utils/axios/axiosMovies";

const Dashboard = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const filter = useSelector((state) => state.movies.filter);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    id: "",
    name: "",
    type: "",
    description: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        const fetchedMovies = await axiosGet("/");
        dispatch(setMovies(fetchedMovies));
      } catch (error) {
        setErrorMessage(`Failed to fetch movies: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [dispatch]);

  const filteredMovies = movies.filter(
    (movie) =>
      (filter === "all" || movie.type === filter) &&
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await axiosDelete(`/${id}`);
      dispatch(deleteMovie(id));
    } catch (error) {
      setErrorMessage(`Failed to delete movie: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMovie = async () => {
    if (!newMovie.name || !newMovie.description || !newMovie.type) {
      setErrorMessage("Please fill the Title, Type, and Description fields.");
      return;
    }

    try {
      setIsLoading(true);
      const addedMovie = await axiosPost("/", newMovie);
      dispatch(addMovie(addedMovie));
      setNewMovie({ id: "", name: "", type: "", description: "", image: "" });
      setErrorMessage("");
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(`Failed to add movie: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (id) => {
    const movieToUpdate = movies.find((movie) => movie.id === id);
    if (movieToUpdate) {
      setSelectedMovie(movieToUpdate);
      setModalTitle("Update Movie");
      setIsModalOpen(true);
    }
  };

  const handleSaveUpdate = async () => {
    if (
      !selectedMovie.name ||
      !selectedMovie.description ||
      !selectedMovie.type
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      const updatedMovie = await axiosPut(
        `/${selectedMovie.id}`,
        selectedMovie
      );
      const updatedMovies = movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
      dispatch(setMovies(updatedMovies));
      setIsModalOpen(false);
      setSelectedMovie(null);
    } catch (error) {
      setErrorMessage(`Failed to update movie: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-black">
        <button
          onClick={() => {
            setModalTitle("Add New Movie");
            setNewMovie({
              id: "",
              name: "",
              type: "",
              description: "",
              image: "",
            });
            setIsModalOpen(true);
          }}
          className="mt-4 ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 shadow-lg"
        >
          + Add Movie
        </button>
      </div>
      <div className="min-h-screen py-4 flex flex-col items-center justify-start bg-black">
        <div className="flex justify-center items-center w-full max-w-4xl mb-8 p-4">
          <div className="flex space-x-4 w-full bg-black p-4 rounded-md">
            <input
              type="text"
              placeholder="Search movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded bg-white text-black"
            />
            <select
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value))}
              className="p-2 border rounded bg-white text-black"
            >
              <option value="all">All Types</option>
              <option value="Action">Action</option>
              <option value="Romance">Romance</option>
              <option value="Animation">Animation</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Crime">Crime</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>
        </div>

        {isLoading ? (
            <div className="flex items-center justify-center min-h-screen">
            <div className="loader border-t-4 border-b-4 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))
            ) : (
              <div className="flex items-center justify-center w-full min-h-[200px]">
                <div className="text-white text-lg font-semibold">
                  No movies found matching your search.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={
          modalTitle === "Add New Movie" ? handleAddMovie : handleSaveUpdate
        }
        title={modalTitle}
        errorMessage={errorMessage}
        isLoading={isLoading}
      >
        <input
          type="text"
          placeholder="Title"
          value={
            modalTitle === "Add New Movie"
              ? newMovie.name
              : selectedMovie?.name || ""
          }
          onChange={(e) =>
            modalTitle === "Add New Movie"
              ? setNewMovie({ ...newMovie, name: e.target.value })
              : setSelectedMovie({ ...selectedMovie, name: e.target.value })
          }
          className="p-2 border rounded mb-2 w-full"
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Type"
          value={
            modalTitle === "Add New Movie"
              ? newMovie.type
              : selectedMovie?.type || ""
          }
          onChange={(e) =>
            modalTitle === "Add New Movie"
              ? setNewMovie({ ...newMovie, type: e.target.value })
              : setSelectedMovie({ ...selectedMovie, type: e.target.value })
          }
          className="p-2 border rounded mb-2 w-full"
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Description"
          value={
            modalTitle === "Add New Movie"
              ? newMovie.description
              : selectedMovie?.description || ""
          }
          onChange={(e) =>
            modalTitle === "Add New Movie"
              ? setNewMovie({ ...newMovie, description: e.target.value })
              : setSelectedMovie({
                  ...selectedMovie,
                  description: e.target.value,
                })
          }
          className="p-2 border rounded mb-2 w-full"
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={
            modalTitle === "Add New Movie"
              ? newMovie.image
              : selectedMovie?.image || ""
          }
          onChange={(e) =>
            modalTitle === "Add New Movie"
              ? setNewMovie({ ...newMovie, image: e.target.value })
              : setSelectedMovie({ ...selectedMovie, image: e.target.value })
          }
          className="p-2 border rounded mb-2 w-full"
          disabled={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
