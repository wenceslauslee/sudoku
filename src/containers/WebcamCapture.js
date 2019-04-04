import React, { Component } from "react";
import { Button } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import Webcam from "react-webcam";
import { s3UploadImage } from "../libs/awsLib";
import "./WebcamCapture.css";

export default class WebcamCapture extends Component {
  constructor(props) {
    super(props);

    this.windowConstraints = {
      width: 640,
      height: 480
    };

    this.videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    this.state = {
    	isLoading: false,
    	pic: null
    };
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const pic = this.webcam.getScreenshot();
    /*console.log(pic);
    var i = pic.indexOf('base64,');
    console.log(atob(pic.slice(i + 7)))*/
    this.setState({
      pic: pic
    });
  };

  upload = async () => {
    if (this.state.pic === null) {
      alert(`Please take a picture first.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      await s3UploadImage(this.state.pic);
      console.log('stupid rabbit');
      this.setState({ 
      	isLoading: false,
      	pic: null
      });
    } catch (e) {
    	console.log(e);
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
		return(
			<div className="WebcamCapture">
				<div className="WebcamImage">
					<Webcam
						audio={false}
	          height={this.windowConstraints.height}
	          ref={this.setRef}
	          screenshotFormat="image/jpeg"
	          screenshotQuality={1}
	          width={this.windowConstraints.width}
	          videoConstraints={this.videoConstraints}
	          style={{ transform: "scaleX(-1)" }} />
	      </div>
        <div className="ImageControl">
        	<Button
        		bsStyle="primary"
            bsSize="large"
            onClick={this.capture}>
            Capture
          </Button>
        	<LoaderButton
            bsStyle="primary"
            bsSize="large"
            disabled={this.state.pic === null}
            onClick={this.upload}
            isLoading={this.state.isLoading}
            text="Upload"
            loadingText="Uploading..."
          />
        </div>
			</div>
		);
  }
}