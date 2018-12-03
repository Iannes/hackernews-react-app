import React from 'react';
class Footer extends React.Component {
    render() {
        const { post } = this.props;
        return <small>            
            {post.score} { post.score === 1 ? ' point' : ' points' } by <span className="bold">{post.by}</span> |
            &nbsp; { post.descendants } { post.descendants === 1 ? ' comment' : ' comments' }
        </small>;
    }
  }

  export default Footer;