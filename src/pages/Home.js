import React, { useEffect, useState } from "react";
import { getQuotes } from "../api/Api";
import { useAuth } from "../contexts/AuthContext";
import { Card } from "../components/ui/Card";
import { Pagination } from "../components/ui/Pagination";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let offset = (page - 1) * 20;
    setLoading(true);
    getQuotes(token, offset)
      .then((data) => {
        setData(data.data);
        if (data.data.length === 0) {
          setHasMore(false);
        } else {
          setData(data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, page]);

  const handleNextPage = () => {
    if (!loading && hasMore) setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setHasMore(true);
      setData([]);
    }
  };

  const handleCreateQuote = () => {
    navigate("/create-quote");
  };

  return (
    <>
      <button
        onClick={handleCreateQuote}
        className="z-50 fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        +
      </button>
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        page={page}
        hasMore={hasMore}
        loading={loading}
      />
      <div className="flex flex-wrap justify-center mx-auto">
        {data &&
          data.map((item, i) => (
            <div key={i} className="w-full sm:w-1/2 md:1/2 lg:w-1/3 xl:w-1/4">
              <Card quote={item} />
            </div>
          ))}
        {!hasMore && <p>No More Data</p>}
      </div>
    </>
  );
};
