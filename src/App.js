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
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: clarifaiFace.left_col * width,
      top: clarifaiFace.top_row * height,
      right: width - clarifaiFace.right_col * width,
      bottom: height - clarifaiFace.bottom_row * height
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.DEMOGRAPHICS_MODEL, 
      this.state.input)
    .then(response =>{
      // do something with response
      //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      console.log(response.outputs[0].data.regions[0].data.face.age_appearance);
      this.displayFaceBox(this.calculateFaceLocation(response))
    }).catch(err => console.log(err));
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
              onButtonSubmit = { this.onButtonSubmit }
            />
            <Demographics 
            imageUrl = { this.state.imageUrl } 
            box = { this.state.box }/>
      </div>
    );
  }
}

export default App;
