import './App.css';
import News from './Components/News';
import Navbar from './Components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
} from "react-router-dom";

function App() {
  let pagesize=10;
  let apikey = process.env.REACT_APP_NEWS_API

  return (
    <div>    
      <BrowserRouter>
      <Navbar/>
     
        <Routes>
          <Route exact path="/" element={<News  apikey={apikey}  key="general" pageSize={pagesize} country= {"in"} category={"general"}/>}></Route>
          <Route exact path="/business" element={<News  apikey={apikey}  key="business" pageSize={pagesize} country= {"in"} category={"business"}/>}></Route>
          <Route exact path="/entertainment" element={<News  apikey={apikey}  key="entertainment" pageSize={pagesize} country= {"in"} category={"entertainment"}/>}></Route>
          <Route exact path="/general" element={<News  apikey={apikey}  key="general" pageSize={pagesize} country= {"in"} category={"general"}/>}></Route>
          <Route exact path="/health" element={<News  apikey={apikey}  key="health" pageSize={pagesize} country= {"in"} category={"health"}/>}></Route>
          <Route exact path="/science" element={<News  apikey={apikey}  key="science" pageSize={pagesize} country= {"in"} category={"science"}/>}></Route>
          <Route exact path="/sports" element={<News  apikey={apikey}  key="sports" pageSize={pagesize} country= {"in"} category={"sports"}/>}></Route>
          <Route exact path="/technology" element={<News  apikey={apikey}  key="technology" pageSize={pagesize} country= {"in"} category={"technology"}/>}></Route>
      </Routes>
      </BrowserRouter>
    {/* <Router>
    <Navbar/>
    <News  apikey={apikey}  pageSize={12} country ={'in'} category={'sports'}/>
    </Router> */}
    </div>

  );
}

export default App;
