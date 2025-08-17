import React from "react";
import { useBooks } from "../context/BooksContext";
import MyBookCard from "../components/MyBookCard";
import { useAuth } from "../context/AuthContext";

export default function MyBooks() {
  const { user } = useAuth();
  const { myBooks, loadingMyBooks, updateStatus, updateRating } = useBooks();

  const safeMyBooks = Array.isArray(myBooks) ? myBooks : [];

  if (!user) {
    return <p className="p-6 text-center text-gray-600 text-base sm:text-lg">Please log in to see your books.</p>;
  }

  if (loadingMyBooks) {
    return <p className="p-6 text-center text-gray-600 text-base sm:text-lg">Loading your books…</p>;
  }

  if (safeMyBooks.length === 0) {
    return <p className="p-6 text-center text-gray-600 text-base sm:text-lg">You have no books in your list.</p>;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">My Books</h1>
      <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {safeMyBooks.map((item) => (
          <MyBookCard
            key={item.myBookId || item._id}
            item={item}
            onStatusChange={updateStatus}
            onRatingChange={updateRating}
          />
        ))}
      </div>
    </section>
  );
}
