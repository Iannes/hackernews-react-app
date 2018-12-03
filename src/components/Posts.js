import React from 'react';
import Item from './Item';

class Posts extends React.Component {

    constructor() {
      super();
      
      this.state = { 
          limit: 10,
          posts: [] 
        };

      this.fetchLatestNews =  this.fetchLatestNews.bind(this)
      this.onLoadMore = this.onLoadMore.bind(this)
    }
    
    componentDidMount() {
        this.fetchLatestNews();
    }
    
    fetchLatestNews() {
      fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
        .then(response => response.json())
        .then(data => {
            data.map( newsId => {
            return fetch(` https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
                .then(response => response.json())
                .then( itemDetail => {
              
                this.setState((currentState) => {
                    currentState.posts.push(itemDetail);
                    return { posts: currentState.posts };
                })
             })
          });
      })
    }

     onLoadMore(e) {
         e.preventDefault();
        this.setState({
            limit: this.state.limit + 10
        });
    }
    
    render() {

        const { posts } = this.state
        return <section>
            <ul className="posts">
                {posts.slice(0,this.state.limit).map(function (post, i) {  
                              
                    return post !== null  && <Item key={post.id} post={post}/>
                })}
            </ul>
            <button className="load-more" onClick={this.onLoadMore}>Load More</button>
        </section>
    }
  }

  export default Posts;