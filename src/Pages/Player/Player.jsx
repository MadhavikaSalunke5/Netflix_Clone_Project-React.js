import React, { useEffect, useState } from 'react';
import "./Player.css"; 
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "", 
    key: "", 
    published_at: "", 
    type: "" ,
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWM1ZGRiNTVkNjBiMzQ1NTA4ZmNiZGU3NjM3ODQ3NSIsIm5iZiI6MTc1Njk4NTI2NS42NDcsInN1YiI6IjY4Yjk3N2IxNWMxZTQ5NjdlYTA2OGU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9kCKorXT_vSmHMd03_cf0NFRn5Q-BxD7L8A2lTrRacE'
  }
};


useEffect(() => { 
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,options) 
      .then(res => res.json()) 
      .then(res => setApiData(res.results[0])) 
      .catch(err => console.error(err)); }, [id]);

  

  
  


  

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-1)}} />
      <iframe 
        width="90%" 
        height="90%" 
        src={`https://www.youtube.com/embed/${apiData.key}`} 
        title="trailer" 
        frameBorder="0" allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at? apiData.published_at.slice(0,10):""}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
