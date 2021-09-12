import React, { Component } from 'react';
import Location from './components/Location';
import axios from 'axios';
import Form from './components/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      latitude: "",
      longitude: "",
      showData: false

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
      console.log(res.data);
      let responseData = res.data[0]
      console.log(responseData);
      this.setState({
        display_name: responseData.display_name,
        longitude: responseData.lon,
        latitude: responseData.lat,
        showData: true

      })
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
                   &center=${this.state.latitude},${this.state.longitude}&zoom=1-18`}/>
      </>
    )
  }
}

export default App