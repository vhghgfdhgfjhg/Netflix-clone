import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCard = ({title , category}) => {

  const [apidata, setapidata] = useState([]);
const cardsRef = useRef () ;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGIxMjJjZjAwZmNhNWU1ZDQwOGIyOWQyZDQ1ODdkZSIsIm5iZiI6MTc0NTY1Mzg5Ni42MTEsInN1YiI6IjY4MGM5MDg4NWMwM2I0NjFkZjg1ODQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dn_V0Xbx9MasxtmYRufXnTo0iRRZ8ibf6ITR9GLQ454'
  }
};

const Handlewheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category ? category :'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setapidata(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',Handlewheel)
},[])


  return (
    <div className='titlecards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apidata.map((card , index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCard
