import { useEffect, useState } from "react";
import axios from "axios";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from "react-router-dom";
import Trailer from "../component/Trailer";
import style from "./Home.module.css";

function Home(){
    let moviesA = [];
    let moving = 0;
    let trailMoving = 0;
    const [trailerTitle, setTrailerTitle ] = useState("");
    const [movie, setMovie] = useState([]);
    const [move, setMove] = useState(0);
    const [trailmove, settrailMove] = useState(0);
    const [loading, setLoading] = useState(false);
    const [trailer, setTrailer] = useState([]);
    const [genre, setGenre] = useState("드라마");
    const slideImages  = [{
        url : "https://caching2.lottecinema.co.kr/lotte_image/2022/Hot/0323/Hot_1920774.jpg",
    }, 
    {
        url :"https://caching2.lottecinema.co.kr/lotte_image/2022/Movi/0323/Movi_1920774.jpg",
    } ,
    {
        url :"https://caching2.lottecinema.co.kr/lotte_image/2022/Ani/Ani_1920774.jpg",
    } ]
    
    const callApi = async()=>{
      const response = await axios.get('http://localhost:5000/');

      setMovie(response.data);
      setTrailer(response.data.trailer);

    
      if(movie){
          setLoading(true);
      }
    };

    const sliderNext = () => {
        let length = moviesA.length;
        const ulWidth = length * 19 - 100;
        if(move > -ulWidth){
            moving = move - 50;
            setMove(moving);
        } 

    }

    const sliderPrev = () => { 
        if(move === 0){

        }else if(move < 0){
            moving = move + 50;
            setMove(moving);
        }
        
    };

    const trailerNext = () => {
        let length = trailer.length;
        const ulWidth = length * 25 - 100;
        if(trailmove > -ulWidth){
            moving = trailmove - 50;
            settrailMove(moving);
        } 
    }

    const trailerPrev = () => {
        if(trailmove === 0){

        }else if(trailmove < 0){
            trailMoving = trailmove + 50;
            settrailMove(trailMoving);
        }

    }

    const filter = () => {
        movie.cgv?.map( (cgv) => {
            movie.lotte?.map( (lotte) => {
                if(cgv.title === lotte.title){
                    moviesA.push(cgv);
                }
            })
        })
    }

    const changeGenre = (event) => {
        setGenre(event.target.innerText);
    }

    const [Open, setlOpen] = useState("none");
    
    const close = () => {
        setlOpen("none");

        const video = document.getElementById("Video1");
        video.pause();
       
    }
    
    
  

    const trailerClick = (event) => {

        if(event.target.className == "Home_tailerImg__GTNWn"){
            setTrailerTitle(event.target.offsetParent.innerText);
            setlOpen("inline-block");
        }else if(event.target.className == "Home_playBtn__EKuPx"){
            setTrailerTitle(event.nativeEvent.path[2].innerText);
            setlOpen("inline-block");
        }
        

    }

  

  
    useEffect(()=>{
      callApi();
    }, []);

    filter();
    
   

    

    return(
        <div>
            {loading ? 
              <> 
                <header>
                    <h2>Film</h2>
                    <Link to={'/Login'} className = {style.loginBtn}>Login</Link>
                </header>
                <main>
                    <div className="slide-container">
                        <Slide>
                            {slideImages.map((slideImage, index)=> (
                                <div className="each-slide" key={index}>
                                <div style={{'backgroundImage': `url(${slideImage.url})`,'height': '774px'}} />
                                </div>
                            ))} 
                        </Slide>
                    </div>

                    <div className={style.top_movie} >
                        <h3>현재 상영중인 영화</h3>
                        <div className={style.allBtn}>모두보기</div>
                        <div id={style.top_movie_group} className={style.nonscroll}>
                            <button onClick={sliderPrev}> prev</button>
                            <button onClick={sliderNext}> next</button>
                            <ul className = {style.top_movie_ul} style = {{"margin-left": `${move}vw`}}>
                            {moviesA?.map( (movies) => (
                                <Link to={`/film/${movies.title}`}>
                                    <li key = {movies.key} className = {style.top_movie_li}>
                                        <span className = {style.top_movie_li_title}>{movies.title}</span>
                                        <img src={movies.img}></img>
                                        <span className = {style.top_movie_li_percent}>{movies.percent}</span>
                                        <span  className = {style.top_movie_li_open}>{movies.open}</span>
                                        <span className = {style.top_movie_li_age}>{movies.age}</span>
                                        {/* 구성에 따라 순서 바꿔도 무관 */}
                                    </li>
                                </Link>
                                ))}
                            </ul>
                            
                        </div>
                    </div>

                    <div className={style.trailer}>
                        <h3>트레일러</h3>

                        <button onClick={trailerPrev}> prev</button>
                        <button onClick={trailerNext}> next</button>
                        
                        <div className={style.trailer_group}>
                            {/* Trailer.js 파일로 가면됨 component 폴더 밑에 있음 */}
                            <div className={style.trailer_ul}  style = {{"margin-left": `${trailmove}vw`}} onClick={trailerClick}>
                                {trailer.map( (trailer) => (   
                                    <Trailer 
                                        id = {trailer.num}
                                        name = {trailer.name}
                                        key = {trailer.name}
                                        trailer = {trailer.mp4}
                                        img = {trailer.img}
                                    /> 
                                ))}
                            </div>
                        
                        </div>
                        <div className={style.mainTrailer} style={{"display": `${Open}`}}>
                            <button onClick={close}>X</button>
                            {trailer.map( (trailer) => (   
                                    trailerTitle === trailer.name ? 
                                    <div>
                                        <video autoPlay id="Video1">
                                            <source src={trailer.mp4}/>
                                        </video>
                                    </div>: null
                                    
                                ))}
                        </div>
                    </div>

                    <div className={style.genre}>
                        <h3>장르별</h3>
                        <div className={style.genreBtns}>
                            <button onClick={changeGenre}>드라마</button>
                            <button onClick={changeGenre}>액션</button>
                            <button onClick={changeGenre}>애니메이션</button>
                            <button onClick={changeGenre}>범죄</button>
                        </div>
                        <div className={style.genreList}>
                            <ul>
                                {movie.lotte?.map( (lotte) => (
                                    <>
                                        {genre === lotte.genre ? 
                                        <div className={style.genreMovies}>
                                            <Link to={`/film/${lotte.title}`}>
                                                <li>
                                                    <img src={lotte.img} />
                                                    <span className={style.genreTitle}>{lotte.title}</span>
                                                </li>
                                            </Link> 
                                        </div>: console.log("")
                                        }
                                    </>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
         
                    
                </>:
                <div>
                    Loading...
                </div>
        
            }
        
        </div>
    )

}

export default Home;