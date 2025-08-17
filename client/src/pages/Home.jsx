import { useAuth } from "../context/AuthContext";
import { useBooks } from "../context/BooksContext";
import BookCard from "../components/BookCard";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const { books, loadingBooks, addToMyBooks } = useBooks();
  const navigate = useNavigate();

  const safeBooks = Array.isArray(books) ? books : [];

  if (loadingBooks) {
    return <p className="p-6 text-center text-gray-600 text-base sm:text-lg">Loading books…</p>;
  }

  if (safeBooks.length === 0) {
    return <p className="p-6 text-center text-gray-600 text-base sm:text-lg">No books found.</p>;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">All Books</h1>

      <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {safeBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onWantToRead={() => {
              if (!user) {
                alert("Please log in to add books to your list.");
                navigate("/login");
                return;
              }
              addToMyBooks(book._id).then((r) => {
                if (!r.success) alert(r.message);
              });
            }}
          />
        ))}
      </div>
    </section>
  );
}
