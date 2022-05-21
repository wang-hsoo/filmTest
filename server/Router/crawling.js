const express = require('express');
const router = express.Router();
const axios = require("axios"); 
const cheerio = require("cheerio");
let lotte = [];
let trailerKey = [];
let a = [];
let MovieDetail = [];
let lottecinemaInf = [];
let lottecinemaTimeList = [];


function getLotte(){
    const getHTML = async() => {
        try{
            console.log("getHtml!!!!");
            var dic = {"MethodName":"GetMoviesToBe",
            "channelType":"HO",
            "osType":"Chrome",
            "osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36",
            "multiLanguageID":"KR",
            "division":1,"moviePlayYN":"Y",
            "orderType":"1",
            "blockSize":100,"pageNo":1,
            "memberOnNo":""}

            return await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx",  'ParamList='+JSON.stringify(dic));
        }catch(err){
            console.log("크롤링 홈페이지 post 실패 : " + err);
            extractEventInfo()
        }   
    }
    
    const parsing =async() => {
        console.log("크롤링 시작");
        const html = await getHTML();
        console.log("html 받아옴");

        const Movies =  html.data.Movies.Items;
        console.log("아이템: " + Movies[0].MovieNameKR);
        
        for(let i = 0; i < Movies.length;i++){
            lotte.push({
                company:  "LOTTE",
                title: Movies[i].MovieNameKR,
                genre: Movies[i].MovieGenreName,
                img: Movies[i].PosterURL,
                age: Movies[i].ViewGradeNameKR,
                percent: Movies[i].BookingRate,
                key: Movies[i].RepresentationMovieCoden
            });
            trailerKey.push(Movies[i].RepresentationMovieCode);
        }
        console.log("lotte 배열 푸쉬 완료 : " + lotte[0].title);
        // return trailerKey;
}
    
     parsing();
}

// function getTrailer() {
//     const trailerImg = async() => {

//        try {
//         trailerKey = await t;
        
//         for(let i = 0; i < 10; i++){
//             if(trailerKey[i] === "AD"){
//                 continue;
//             }else {
                
//                     var dic = {"MethodName":"GetMovieDetailTOBE","channelType":"HO","osType":"Chrome","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36","multiLanguageID":"KR","representationMovieCode":`${trailerKey[i]}`,"memberOnNo":""}
        
//                     const html = await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx", 'ParamList='+JSON.stringify(dic));
//                     const name = html.data.Movie.MovieNameKR;
//                     const imgUrl = html.data.Trailer.Items[0].ImageURL;
//                     const date = html.data.Movie.PlanedRelsMnth.replace(/-/g, "");
                   
//                     a.push(
//                         {   num:i,
//                             key:trailerKey[i],
//                         mp4 : `https://caching.lottecinema.co.kr//Media/MovieFile/MovieMedia/${date}/${trailerKey[i]}_301_1.mp4`, 
//                         img : imgUrl,
//                         name: name }
//                     );
            
                
                
//             }
           
//         }
//        } catch (error) {
//            console.log(error);
//        }

        
//     };
        
        

//     trailerImg();
// }

// function getMovieDetail() {
//     const detail = async() => {

//         try {
//             key = await t;
        
//         for(let i = 0; i < key.length; i++){
//             if(key[i] === "AD"){
//                 continue;
//             }else {
                    
//                     var dic = {"MethodName":"GetMovieDetailTOBE","channelType":"HO","osType":"Chrome","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36","multiLanguageID":"KR","representationMovieCode":`${key[i]}`,"memberOnNo":""}
        
//                     const html = await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx", 'ParamList='+JSON.stringify(dic));
//                     const name = [];
//                     const image = [];
                    
                    
//                     for(let b = 0; b < html.data.Casting.Items.length; b++){
//                          name.push(html.data.Casting.Items[b].StaffName);
//                          image.push(html.data.Casting.Items[b].StaffImage);
                         
//                     }
                    
//                     const title = html.data.Movie.MovieNameKR;
//                     const genre1 = html.data.Movie.MovieGenreNameKR;
//                     const genre2 = html.data.Movie.MovieGenreNameKR3;
//                     const synops = html.data.Movie.SynopsisKR.replace(/<br>/g, "").replace(/<b>/g, "").replace(/<\/b>/g, "");
//                     const viewRate = html.data.Movie.ViewRate; //평점
//                     const age = html.data.Movie.ViewGradeCode;
//                     const viewEvalu = html.data.Movie.ViewEvaluation;//예매율
//                     const playTime = html.data.Movie.PlayTime;
//                     const AgePrefer10 = html.data.Movie.AgePrefer10;
//                     const AgePrefer20 = html.data.Movie.AgePrefer20;
//                     const AgePrefer30 = html.data.Movie.AgePrefer30;
//                     const AgePrefer40 = html.data.Movie.AgePrefer40;
//                     const trailImg = html.data.Trailer.Items;

                    
                   
//                     MovieDetail.push({
//                         company: "LOTTE",
//                         title: title,
//                         name : name,
//                         image: image,
//                         genre1: genre1,
//                         genre2: genre2,
//                         synops: synops,
//                         viewRate: viewRate,
//                         age: age,
//                         viewEvalu: viewEvalu,
//                         playTime: playTime,
//                         AgePrefer10: AgePrefer10,
//                         AgePrefer20: AgePrefer20,
//                         AgePrefer30: AgePrefer30,
//                         AgePrefer40: AgePrefer40,
//                         trailImg: trailImg,

//                     });

                    
                    
//             }}
//         } catch (error) {
            
//         }

           
        
//     };
        
        

//     detail();
// }

// function lottecinemaInfo(){
//     const detail = async() => {  
//         try {
//             var dic = {"MethodName":"GetTicketingPageTOBE","channelType":"HO","osType":"W","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36","memberOnNo":"0"}
//             const html = await axios.post("https://www.lottecinema.co.kr/LCWS/Ticketing/TicketingData.aspx", 'ParamList='+JSON.stringify(dic));
            
//             lottecinemaInf.push(html.data.Cinemas.Cinemas.Items);
//             return lottecinemaInf;
//         } catch (error) {
//             console.log(error);
//         }
       
//     }

//     const movieTime = async(data) => {
//         try {
//             for(let i = 0; i < data[0].length; i++){
//                 const  temStorage = [];
//                 var dic = {"MethodName":"GetPlaySequence",
//                             "channelType":"HO",
//                             "osType":"W",
//                             "osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
//                             "playDate":"2022-05-21",
//                             "cinemaID":`${data[0][i].DivisionCode}|${data[0][i].DetailDivisionCode}|${data[0][i].CinemaID}`,
//                             "representationMovieCode":""}
    
//                 const html = await axios.post("https://www.lottecinema.co.kr/LCWS/Ticketing/TicketingData.aspx", 'ParamList='+JSON.stringify(dic));
    
//                 const d = html.data.PlaySeqs.Items;
//                 for(let a = 0; a < d.length; a++){
//                     temStorage.push({
//                         CinemaNameKR: d[a].CinemaNameKR,
//                         MovieNameKR: d[a].MovieNameKR,
//                         FilmNameKR: d[a].FilmNameKR,
//                         PlayDt : d[a].PlayDt,
//                         StartTime : d[a].StartTime,
//                         EndTime : d[a].EndTime,
//                         ScreenNameKR : d[a].ScreenNameKR
//                     })
//                 }
    
                
                
//                 lottecinemaTimeList.push(temStorage);
    
                
//             }
//         } catch (error) {
//             console.log(error);
//         }
        
        
        
//     }
           
        
    
//     const crawl = async() => {
//         const data = await detail();
//         movieTime(data);
//     }
        

    
//     crawl();

// }




getLotte();
// getTrailer();
// getMovieDetail();
// lottecinemaInfo();


router.get('/', (req, res)=>{
  res.send({
      lotte: lotte,
    //   trailer: a,
    //   lotteMovieDetail : MovieDetail,
    //   lottecinemaInf: lottecinemaInf,
    //   lottecinemaTimeList : lottecinemaTimeList
    });
});

module.exports = router;



