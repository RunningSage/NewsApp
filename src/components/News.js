import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps={
        country:"in",
        pageSize:8,
        category :'general'
    }
    static propTypes={
         name : PropTypes.string,
         pageSize : PropTypes.number,
         category : PropTypes.string

    }
    constructor(){
        super();
        console.log("Hello I am a constructor from news component")
        this.state = {
            articles : [],
            loading : false ,
            page : 1

        }  
    }

    async componentDidMount(){
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e2a7cca16e040ccbd83bc767eb46af4&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults,loading : false})
    }

    handlePrevClick= async ()=>{
        console.log('Previous')
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e2a7cca16e040ccbd83bc767eb46af4&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading : false
        })
    }

    handleNextClick= async ()=>{
        console.log('Next')
        if(!(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)))
        {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e2a7cca16e040ccbd83bc767eb46af4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading : true});
            let data = await fetch(url);
            let parsedData = await data.json()
            console.log(parsedData);
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading : false
            })
        }
    }
    

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top headlines</h1>
        {this.state.loading && <Spinner></Spinner>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return (  
            <div key={element.url} className="col-md-4">          
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage}
              newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt}
              source={element.source.name}/>
            </div>
        )
            })}
        
      </div>
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} className="btn btn-sm btn-dark mx-2" type="button" onClick={this.handlePrevClick}>&larr;Previous</button>
                <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-sm btn-dark mx-2" type="button" onClick={this.handleNextClick}>Next&rarr;</button>
            </div>
      </div>
    )
  }
}

export default News
