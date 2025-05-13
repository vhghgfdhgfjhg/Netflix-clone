import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apidata, setapidata] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGIxMjJjZjAwZmNhNWU1ZDQwOGIyOWQyZDQ1ODdkZSIsIm5iZiI6MTc0NTY1Mzg5Ni42MTEsInN1YiI6IjY4MGM5MDg4NWMwM2I0NjFkZjg1ODQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dn_V0Xbx9MasxtmYRufXnTo0iRRZ8ibf6ITR9GLQ454",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setapidata(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img onClick={()=>{navigate((-2))}} src={back_arrow_icon} alt="" />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apidata.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apidata.published_at.slice(0,10)}</p>
        <p>{apidata.name}</p>
        <p>{apidata.typeof}</p>
      </div>
    </div>
  );
};

export default Player;
