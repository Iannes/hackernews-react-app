import React from 'react';
import share from '../share-button.svg'


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.handleShare = this.handleShare.bind(this)
      }
    
      
      handleShare () {        
        
        document.querySelector('.share-button').addEventListener('click', function() {

          if(navigator.share) {
            navigator.share({
              title: 'mobiForge: Web Share API',
              text: 'Check out this great article about the Web Share API',
              url: 'https://mobiforge.com/design-development/web-share-api'
            })
            .then(() => console.log('Share complete'))
            .error((error) => console.error('Could not share at this time', error))
          }
        });
    }
    render() {
        return (        
        <header>
            <div className="container container-header">
                <h1> Hacker News </h1>
                <button>
                    <img onClick={this.handleShare} className="share-button" src={share} width='92' alt="share button"/>
                </button>
            </div>
        </header>
        )
    }
  }

  export default Header;