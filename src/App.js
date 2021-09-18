import React, { Component } from 'react';
import Location from './components/Location';
import axios from 'axios';
import Form from './components/Form';
import Weather from './components/Weather';
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style.css";
import Movie from './components/Movie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      latitude: "",
      longitude: "",
      showData: false,
      iframe: "",
      weatherData: [],
      weatherDataApi: [],
      MovieList:[],
      original_title: "",
      overview: "",
      poster_path: "",
      vote_average: "",
      popularity: "",
      release_date: "",


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
      baseURL: `https://api.locationiq.com/v1/autocomplete.php?key=pk.0d2c71af8109151c7f51d71c9df17cee&q=${this.state.display_name}`
    }
    axios(config).then(res => {
      let responseData = res.data[0]
      this.setState({
        display_name: responseData.display_name,
        longitude: responseData.lon,
        latitude: responseData.lat,
        showData: true,
        // iframe: "iframe",

      })
    }).then(() => {
      let city_name = this.state.display_name.split(',')[0]
      axios.get(`http://localhost:8002/name?lat=${this.state.latitude}&lon=${this.state.longitude}&searchQuery=${city_name}`)
        .then(res => {
          this.setState({ weatherData: res.data })


        })

    }).then(() => {
      axios.get(`http://localhost:8002/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`)
        .then(res => { this.setState({ weatherDataApi: res.data }) })
    }).then(() => {
      axios.get(`http://localhost:8002/moive?original_title=${this.state.original_title}
      &overview=${this.state.overview}
      &poster_path=${this.state.poster_path}
      & vote_average=${this.state.vote_average}
      &popularity=${this.state.popularity}
      &release_date=${this.state.release_date}`)
        .then(res => { this.setState({ MovieList: res.data }) })
    })
  }


  render() {
    return (
      <>
        <h1>Welcome to City explorer</h1>
        <Form handleSubmit={this.handleSubmit}
          handleLocation={this.handleLocation} />


        {this.state.showData &&
          <Location display_name={this.state.display_name}
            latitude={this.state.latitude}
            longitude={this.state.longitude} />
        }
        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.0d2c71af8109151c7f51d71c9df17cee&center=${this.state.latitude},${this.state.longitude}&zoom=1-18`} alt="" />


        {
          this.state.weatherData.map(item => {
            return <>
              <h1>{item.date}</h1>
              <h1>{item.description}</h1>

            </>
          })
        }
        <Weather weatherDataApi={this.state.weatherDataApi} />
        <Movie MovieList={this.state.MovieList} />
      </>

    )
  }
}

export default App