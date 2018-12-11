import React from 'react';
import Item from './Item';
import Loader from './Loader';

class Posts extends React.Component {

    constructor() {
      super();
      
      this.state = { 
          loading: true,
          limit: 10,
          posts: [] 
        };

      this.fetchLatestNews =  this.fetchLatestNews.bind(this)
      this.onLoadMore = this.onLoadMore.bind(this)
    }
    
   async componentDidMount() {
        await this.fetchLatestNews();
    }

    
    fetchLatestNews() {
      fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
        .then(response => response.json())
            .catch(error => console.log('No news: ',error))
        .then(data => {
            data.map( newsId => {
            return fetch(` https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
                .then(response => response.json())
                .catch(error => console.log('Failed to fetch news: ',error))
                .then( itemDetail => {
              
                this.setState((currentState) => {                    
                    currentState.posts.push(itemDetail);
                    return { 
                        posts: currentState.posts,
                        loading: false
                    };
                })
             })             
          });
      })    
      .catch(error => console.log('Failed to fecth first response: ',error))
    }

     onLoadMore(e) {
        e.preventDefault();
        this.setState({
            limit: this.state.limit + 10
        });
    }
    
    render() {

        const { loading, posts } = this.state
        
        if(loading) {
            return <Loader />
        } else {

        return (<section>
            <ul className="posts">
                {posts.slice(0,this.state.limit).map(function (post, i) {            
                    return post !== null  && <Item key={post.id} post={post}/>
                })}
            </ul>
            <button className="load-more" onClick={this.onLoadMore}>Load More</button>
        </section>)
        }
    }
  }

  export default Posts;