export default function BookCard({ book, onWantToRead }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Book Cover */}
      <div className="aspect-[3/4] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/300x400?text=No+Image"; }}
        />
      </div>

      {/* Book Info */}
      <div className="flex-1 flex flex-col p-4">
        <h3 className="text-base sm:text-lg font-semibold line-clamp-2 text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{book.author}</p>

        {/* Footer: availability + action */}
        <div className="mt-auto flex items-center justify-between">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-md ${
              book.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
            }`}
          >
            {book.availability ? "Available" : "Unavailable"}
          </span>

          <button
            onClick={onWantToRead}
            disabled={!book.availability}
            className={`text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${
              book.availability
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Want to Read
          </button>
        </div>
      </div>
    </div>
  );
}
