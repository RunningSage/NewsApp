import React, { Component } from 'react'

export class NewsItem extends Component {

    constructor(){
        super();
        console.log("Hello I am a constructor")
    }

  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className="my-3">
        <div className="card">
  <img src={imageUrl ? imageUrl:"https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"} className="card-img-top" alt=""/>
  <div className="card-body">
    <h5 className="card-title">{title}...  <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex : 1}}>
    {source}
  </span></h5>
    <p className="card-text">{description}...</p>
    <p  className="card-text"><small  className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
