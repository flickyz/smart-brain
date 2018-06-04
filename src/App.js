import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Demographics from './components/Demographics/Demographics';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';




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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
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
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input,
          })
    })
    .then(response => response.json())
    .then(response => {
      // do something with response
      if(response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(err => console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignIn: true });
    } else if (route === 'signout'){
      this.setState(initialState);
    }
    this.setState({ route: route });
  }


  render() {
    return (
      <div className="App">
        <Particles className = 'particles' params = {particlesOptions}/>
        <Navigation isSignIn = {this.state.isSignIn} onRouteChange = { this.onRouteChange } />              
        
        {this.state.route === 'home' 
        ? <div>
            <Logo /> 
            <Rank name = { this.state.user.name } entries = { this.state.user.entries } />
          
            <ImageLinkForm
              onInputChange = { this.onInputChange }
              onPictureSubmit = { this.onPictureSubmit }
            />
            <Demographics 
              imageUrl = { this.state.imageUrl } 
              box = { this.state.box }/> 
          </div>

        : (
          this.state.route === 'signin' 
          ? <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
          : <Register loadUser = { this.loadUser } onRouteChange = {this.onRouteChange} />
         
          )
        }
      </div>
    );
  }
}

export default App;
