import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detailMovie, detailMovieSet] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    console.log(json);
    detailMovieSet(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1> Loading...</h1>
      ) : (
        <div>
          <h1>{detailMovie.title_long}</h1>
          <ul>
            <img src={detailMovie.medium_cover_image} alt="test" />
            <li>{detailMovie.title_english}</li>
            <li>{detailMovie.rating}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
