import React, { Component } from 'react'
import './style.css'


export class Location extends Component {
    render() {
        return (
            <div>            

      <table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">display_name</th>
      <th scope="col">latitude</th>
      <th scope="col">longitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{this.props.display_name}</td>
      <td>{this.props.latitude}</td>
      <td>{this.props.longitude}</td>
    </tr>
   
  </tbody>
</table>
<div className="divFram">
      <iframe src={this.props.map}  title="country map"  
      className={this.props.iframe}></iframe>
    </div>
            </div>
        )
    }
}

export default Location
