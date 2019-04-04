import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Welcome to Data Collection</h1>
          <p>Join us in a fun environment for recording videos.</p>
          {this.props.isAuthenticated
            ? <div className="lander2"><br/><p>OR JOIN US FOR EVIL DOMINATION OF THE WORLD!!!</p></div>
            : <p/>}
        </div>
      </div>
    );
  }
}
