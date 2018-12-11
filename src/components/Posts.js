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
      
    

     fetchLatestNews = async () => {
	
        const response = await  fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
        const storyIds = await response.json()
        
         storyIds.map( async newsId => {
            const allStories = await fetch(` https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
            const data = await allStories.json()
            this.setState((currentState) => {                    
                currentState.posts.push(data);
                return { 
                    posts: currentState.posts,
                    loading: false
                };
            })  
        })
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