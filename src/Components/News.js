import React from 'react'
import { useEffect,useState } from 'react';
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const  News =(props)=> {
const [articles, setarticles] = useState([])
const [loading, setloading] = useState(true)
const [page, setPage] = useState(1)
const [totalResults, settotalResults] = useState(0)

// document.title= ` News Monkey - ${capitalizestring(props.category)}`
    
     const capitalizestring = (string)=>{
       return (string.charAt(0).toUpperCase() + string.slice(1));
    }
    
    const update =async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        setloading(true)
        let data = await fetch(url)
        let parseddata =await data.json()
        setarticles(parseddata.articles)
        setloading(false)
        settotalResults(parseddata.totalResults)  
    }
    useEffect(() => {update()}, [])
    
   
    // handleNextClick= async()=>{
    // setpage(page+1)
    // update()
    // }

    // handlePreviousClick= async()=>{
    // setpage(page-1)
    // update()
    // }
    const fetchMoreData = async() => {
        setPage(page+1)
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        let parseddata =await data.json()
        setarticles(articles.concat(parseddata.articles))
        settotalResults(parseddata.totalResults)
        setloading(false)
      };
  
    return (
        <>
        
        <h2 className='text-center' style={{marginTop:"90px"}}>News Monkey - Top {capitalizestring(props.category)} Headlines</h2>
        {loading && <Loader/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==  totalResults}
          loader={<Loader/>}
        >
      <div className='container my-3'>

            <div className="row my-4">
            {articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
<NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,85):""} imageUrl={element.urlToImage?element.urlToImage:"https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max"} 
                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            })}
            
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
        <button type="button"  disabled={page<=1}className="btn btn-dark" onClick={handlePreviousClick}> &#8592; Previous </button>
        <button type="button" disabled={page+1 > Math.ceil((totalResults)/props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &#8594;</button>   
        </div> */}
        
    </>
    )
  
}

News.defaultProps ={
    country:'in',
    pageSize:8,
    category:'general',
}
News.propTypes ={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,
}

export default News
