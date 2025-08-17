import StarRating from "./StarRating";

const STATUS = ["Want to Read", "Currently Reading", "Read"];

export default function MyBookCard({ item, onStatusChange, onRatingChange }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Book Cover */}
      <div className="w-full h-48 sm:h-56 bg-gray-100 flex justify-center items-center overflow-hidden">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/160x200?text=No+Image"; }}
        />
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold line-clamp-2 text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-500 mb-4">{item.author}</p>
        </div>

        {/* Status + Rating */}
        <div className="flex flex-wrap items-center gap-3 mt-auto">
          <select
            value={item.status || "Want to Read"}
            onChange={(e) => onStatusChange(item._id || item.myBookId, e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <StarRating
            value={item.rating || 0}
            onChange={(r) => onRatingChange(item._id || item.myBookId, r)}
          />
        </div>
      </div>
    </div>
  );
}
