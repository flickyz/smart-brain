import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Demographics from './components/Demographics/Demographics';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'a157a8e4e6f045c9ab84e5e00c6b906a'
});


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.DEMOGRAPHICS_MODEL, 
      this.state.input)
    .then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      console.log(response.outputs[0].data.regions[0].data.face);
    },
    function(err) {
      // there was an error
    }
  );
  }


  render() {
    return (
      <div className="App">
        <Particles className = 'particles' params = {particlesOptions}/>
        <Navigation />              
            <Logo /> 
            <Rank /> 
            <ImageLinkForm
              onInputChange = { this.onInputChange }
              onButtonSubmit = { this.onButtonSubmit }/>
            <Demographics imageUrl = { this.state.imageUrl }/>
      </div>
    );
  }
}

export default App;
