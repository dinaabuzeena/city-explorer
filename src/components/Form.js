import React, { Component } from 'react';
class Form extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <input type="text"

                        placeholder="Please interr city name"
                        onChange={this.props.handleLocation}
                    />
               </form>
            </d      <input type="submit"
                        value="Explore"
                    />
               iv>
        )
    }
}

export default Form
