import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import axios from "axios";

import Home from "../routes/Home";
import { useState } from "react";
import { useEffect } from "react";

function AppRouter(){
  const [data, setData] = useState([]);

  const callApi = async()=>{
    const response = await axios.get('http://localhost:5000/');
    console.log("AppRouter");
    console.log(response.data);
    setData(response.data);


  };

  useEffect(() => {
    callApi();
  }, []);

    return(
      <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element = {<Home data = {data} />} />
      </Routes>
    </Router>
    )
}

export default AppRouter;