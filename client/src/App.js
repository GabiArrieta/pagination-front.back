import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  padding-top: 120px;
  margin:  auto;
  border-color: gray;
`;

const App = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts?page=${page}`);
        const { data, pages: totalPages } = await res.json();
        setPages(totalPages);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Some error occured");
      }
    };
    fetchPosts();
  }, [page]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
      setLoading(false);
    }, 300);
    }
  }, [loading]);

  return (
    <div className="app">
      {loading ? (
        <>
        <ClipLoader color='red' loading={loading} css={override} size={60} />
        <h2 className="loading-text">Loading</h2>
        </>
      ) : error ? (
        <h3 className="error-text">{error}</h3>
      ) : (
        <>
        <img src="https://newrelic.com/sites/default/files/2021-04/good-programmer-banner-final.jpg" className='image__app'width="1000" height="200" alt="dev" />
          <Pagination page={page} pages={pages} changePage={setPage} />
          <div className="app__posts">
            {posts?.map((post) => (
              <Card key={post._id} post={post} />
            ))}
          </div>
          <Pagination page={page} pages={pages} changePage={setPage} />
        </>
      )}
    </div>
  );
};

export default App;
