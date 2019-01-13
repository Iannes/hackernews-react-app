import React, {Component} from "react";

class InternetError extends Component  {
   
    constructor() {
        super();
        this.state = {
            online: true
        };
        this.noInternetConnection = this.noInternetConnection.bind(this);
    }
            
    async componentWillMount() {
        await this.noInternetConnection();
    }

    noInternetConnection = () => {
        if (!navigator.onLine) {
          this.setState({
            online: false
          })     
        } else {
            console.log('Online')
          return false;
        }
      }  
     
    render() {
        if(this.state.online !== true) {
            return (
                <section className='error'>
                    Looks like you're offline :/
                </section>
            );
        } else {
            return false;
        }
      }    
};

export default InternetError;
