import React from 'react';
import Footer from "./Footer";
class Item extends React.Component {
    render(props) {
        const { post } = this.props;
        return <li>
            <a href={post.url}>{post.title}</a>
            <Footer post={post}/>
       </li>;
    }
  }

  export default Item;