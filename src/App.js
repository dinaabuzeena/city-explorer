import React, { Component } from 'react';
import Location from './components/Location';
import axios from 'axios';
import Form from './components/Form';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./components/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      latitude: "",
      longitude: "",
      showData: false,
      iframe: "",
      weatherData: []

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
        display_name: responseData.display_name,
        longitude: responseData.lon,
        latitude: responseData.lat,
        showData: true,
        // iframe: "iframe",

      })
    }).then(() => {
      let city_name=this.state.display_name.split(',')[0]
      axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/name?lat=${this.state.latitude}&lon=${this.state.longitude}&searchQuery=${city_name}`)
        .then(res => {this.setState({weatherData: res.data})
        
        });

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
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}
                   &center=${this.state.latitude},${this.state.longitude}&zoom=1-18`} alt="" />

        {
          this.state.weatherData.map(item=>{
            return<>
            <h1>{item.date}</h1>
            <h1>{item.description}</h1>

            </>
          })
        }
      </>

    )
  }
}

export default App