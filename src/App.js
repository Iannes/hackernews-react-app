import React, { Component } from 'react';
import './App.css';
import Header  from "./components/Header";
import Posts  from "./components/Posts";


class App extends Component {

  render() {
    return (
      <main className="App">          
          <Header />
          <Posts />
      </main>
    );
  }
}

export default App;
