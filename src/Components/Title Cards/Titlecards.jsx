import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Titlecards.css";
import cards_data from "../../assets/cards/Cards_data";

const Titlecards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWM1ZGRiNTVkNjBiMzQ1NTA4ZmNiZGU3NjM3ODQ3NSIsIm5iZiI6MTc1Njk4NTI2NS42NDcsInN1YiI6IjY4Yjk3N2IxNWMxZTQ5NjdlYTA2OGU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9kCKorXT_vSmHMd03_cf0NFRn5Q-BxD7L8A2lTrRacE'
    
  }
};


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('Wheel', handleWheel);

  
    setApiData(cards_data);

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index} >
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.Original_title}</p>
          </Link>
        })}
      </div>
    </div>
  );
}

export default Titlecards;

