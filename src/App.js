import React, { Component } from 'react';
import Location from './components/Location';
import axios from 'axios';
import Form from './components/Form';
import Weather from './components/Weather';
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style.css";
import Movie from './components/Movie';
import BSimg from './components/BSimg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      latitude: "",
      longitude: "",
      showData: false,
      showError: false,
      weatherData: [],
      weatherData: [],
      display_location: "",
      shoWeatherAndMovie: false,
      movie: []


    }
  }
  handleLocation = (e) => {
    let display_name = e.target.value;
    this.setState({
      display_name: display_name
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let config = {
      method: "GET",
      baseURL: `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.display_name}`
    }
    axios(config).then(res => {
      let responseData = res.data[0]
      this.setState({
        display_location: responseData.display_name,
        longitude: responseData.lon,
        latitude: responseData.lat,
        showData: true,
        // iframe: "iframe",
        showError: false,

      })
    }).then(() => {
      let city_name = this.state.display_location.split(',')[0]
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`)
        .then(res => {
          this.setState({
            weatherData: res.data,
            showError: false,
            shoWeatherAndMovie: true
          })


        }).catch(err => {
          console.log(err)
          this.setState({
            shoWeatherAndMovie: false,
            weatherData: [],
          })

        })
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies?query=${city_name}`)
        .then((res) => {

          this.setState({
            movie: res.data,
            status: "",
            showError: false,
            shoWeatherAndMovie: true,
          })
        })

    }).catch(err => {
      console.log(err)
      this.setState({
        weatherData: [],
        showError: true,
        shoWeatherAndMovie: false
      })
    })

  }
  render() {
    return (
      <>
        <h1>Welcome to City explorer</h1>
        <Form handleSubmit={this.handleSubmit}
          handleLocation={this.handleLocation} />

        {
          this.state.showError && <ErrorCard />
        }
        {this.state.showData &&
          <Weather
            shoWeatherAndMovie={this.state.shoWeatherAndMovie}
            display_location={this.state.display_location}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            weatherData={this.state.weatherData} />
        }
        {this.state.showData &&
          <Movie
            shoWeatherAndMovie={this.state.shoWeatherAndMovie}
            display_location={this.state.display_location}
            movie={this.state.movie} />
        }

        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.0d2c71af8109151c7f51d71c9df17cee&center=${this.state.latitude},${this.state.longitude}&zoom=1-18`} alt="" />


        <h2>{this.state.status}</h2>

        <BSimg latitude={this.state.latitude}
          longitude={this.state.longitude} />
      </>

    )
  }
}

export default App