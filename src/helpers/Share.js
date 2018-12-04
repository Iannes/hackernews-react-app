const Share = () => {

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

export default Share;