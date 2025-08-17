import { createContext, useContext, useEffect, useReducer, useMemo } from "react";
import React from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const BooksContext = createContext();
export const useBooks = () => useContext(BooksContext);

const initial = {
  books: [],
  myBooks: [],
  loadingBooks: false,
  loadingMyBooks: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "BOOKS_LOADING":
      return { ...state, loadingBooks: true, error: null };
    case "BOOKS_SUCCESS":
      return { ...state, loadingBooks: false, books: action.payload };
    case "BOOKS_ERROR":
      return { ...state, loadingBooks: false, error: action.payload };

    case "MYBOOKS_LOADING":
      return { ...state, loadingMyBooks: true, error: null };
    case "MYBOOKS_SUCCESS":
      return { ...state, loadingMyBooks: false, myBooks: action.payload };
    case "MYBOOKS_ERROR":
      return { ...state, loadingMyBooks: false, error: action.payload };

    case "MYBOOKS_UPDATE_ONE":
      return {
        ...state,
        myBooks: state.myBooks.map((b) =>
          b.bookId === action.payload.bookId ? { ...b, ...action.payload } : b
        ),
      };

    case "MYBOOKS_ADD_ONE":
      const exists = state.myBooks.some(
        (m) => m.bookId === action.payload.bookId
      );
      return {
        ...state,
        myBooks: exists
          ? state.myBooks.map((m) =>
              m.bookId === action.payload.bookId ? action.payload : m
            )
          : [action.payload, ...state.myBooks],
      };

    default:
      return state;
  }
}

export function BooksProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const { user } = useAuth();

  async function fetchBooks() {
    dispatch({ type: "BOOKS_LOADING" });
    try {
      const res = await api.get("/api/books");
      dispatch({ type: "BOOKS_SUCCESS", payload: res.data || [] });
    } catch (err) {
      dispatch({
        type: "BOOKS_ERROR",
        payload: err.response?.data?.message || err.message || "Failed to fetch books",
      });
    }
  }

  async function fetchMyBooks() {
    if (!user) {
      dispatch({ type: "MYBOOKS_SUCCESS", payload: [] });
      return;
    }
    dispatch({ type: "MYBOOKS_LOADING" });
    try {
      const res = await api.get("/api/mybooks");
      const normalized = res.data.map((mb) => ({
        ...mb.bookId,
        bookId: mb.bookId._id,
        status: mb.status,
        rating: mb.rating,
        myBookId: mb._id,
      }));
      dispatch({ type: "MYBOOKS_SUCCESS", payload: normalized });
    } catch (err) {
      dispatch({
        type: "MYBOOKS_ERROR",
        payload: err.response?.data?.message || err.message || "Failed to fetch my books",
      });
    }
  }

  async function addToMyBooks(bookId) {
  try {
    const res = await api.post(`/api/mybooks/${bookId}`); 
    dispatch({ type: "MYBOOKS_ADD_ONE", payload: res.data });
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || "Failed to add book",
    };
  }
}



async function updateStatus(bookId, status) {
  try {
    // We don't even need to store the response if we aren't using it.
    await api.patch(`/api/mybooks/${bookId}/status`, { status });

    // Dispatch a payload with the information we already have.
    dispatch({
      type: "MYBOOKS_UPDATE_ONE",
      payload: { bookId, status }, // The bookId and the new status
    });
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || "Failed to update status",
    };
  }
}


async function updateRating(bookId, rating) {
  try {
    await api.patch(`/api/mybooks/${bookId}/rating`, { rating });

    // Dispatch a payload with the information we already have.
    dispatch({
      type: "MYBOOKS_UPDATE_ONE",
      payload: { bookId, rating }, // The bookId and the new rating
    });
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || "Failed to update rating",
    };
  }
}

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchMyBooks();
  }, [user]);

  const value = useMemo(
    () => ({
      ...state,
      fetchBooks,
      fetchMyBooks,
      addToMyBooks,
      updateStatus,
      updateRating,
    }),
    [state]
  );

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
}
