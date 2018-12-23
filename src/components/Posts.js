import React from "react";
import Item from "./Item";
import Loader from "./Loader";
import Button from "./Button";

class Posts extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      limit: 10,
      posts: [],
      baseUrl: "https://hacker-news.firebaseio.com/v0"
    };

    this.fetchLatestNews = this.fetchLatestNews.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  async componentDidMount() {
    await this.fetchLatestNews();
  }

  fetchLatestNews = async () => {
    const baseUrl = this.state.baseUrl;

    try {
      const response = await fetch(`${baseUrl}/newstories.json`);
      const storyIds = await response.json();
      storyIds.map(async newsId => {
        const allStories = await fetch(` ${baseUrl}/item/${newsId}.json`);
        const data = await allStories.json();
        this.setState(currentState => {
          currentState.posts.push(data);
          return {
            posts: currentState.posts,
            loading: false
          };
        });
      });
    } catch (e) {
      console.error("You have an error", e);
    }
  };

  onLoadMore(e) {
    e.preventDefault();
    this.setState({
      limit: this.state.limit + 10
    });
  }

  render() {
    const { loading, posts, limit } = this.state;

    if (loading) {
      return <Loader />;
    } else {
      return (
        <section>
          <ul className="posts">
            {posts.slice(0, limit).map(post => {
              return post !== null && <Item key={post.id} post={post} />;
            })}
          </ul>

          <Button
            className="load-more"
            text="Load More"
            onClick={this.onLoadMore}
          />
        </section>
      );
    }
  }
}

export default Posts;
