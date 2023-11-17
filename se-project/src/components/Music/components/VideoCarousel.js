import "./VideoCarousel.css";
import React, { useContext, useEffect, useState } from "react";
import { Carousel, FormLabel, FormText, InputGroup } from "react-bootstrap";
import axios from "axios";
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.css";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import AppContext from "../../../contexts/AppContext";
const VideoCarousel = () => {
  const appContext = useContext(AppContext)
  const headers = {
    Authorization: 'accessToken=' + appContext.userInfo.accessToken + ';username=' + appContext.userInfo.username
  }
  const [videoProperties, setVideoProperties] = useState([
    /* {
      id: 1,
      title: "Video 1",
      src: "https://youtu.be/amfWIRasxtI?si=ENdJ4SdTsoVJdPLu",
      credit: "Video by cottonbro from Pexels",
    },
    {
      id: 2,
      title: "Video 2",
      src: "https://www.youtube.com/live/35kwlY_RR08?si=TaWR6jl5glIU101i",
      credit: "Video by cottonbro from Pexels",
    },
    {
      id: 3,
      title: "Video 3",
      src: "https://youtu.be/UbXYxaf1itQ?si=b4BAQDCes1lX7-GV",
      credit: "Video by cottonbro from Pexels",
    }, */
  ])
  useEffect(() => {
    if (videoProperties.length == 0 && appContext.userInfo && appContext.userInfo.accessToken) {
      getMusic()
    }
  }, [videoProperties])
  var lastId = 3
  const getMusic = () => {
    console.log("Getting music for you")
    axios.get("/api/load/music", { headers: headers })
      .then((response) => {
        console.log("Response from server for music:", response)
        setVideoProperties(response.data.music.map(obj => obj.url))
      })
      .catch((err) => {
        if (err.code == "ERR_BAD_REQUEST") {
          console.log("No internet")
          return
        }
        console.log("Could not get music:", err)
        //throw new Error(err)
      })
  }
  const addMusic = (event) => {
    event.preventDefault()
    console.log("Submitting", event.target.urlInput.value)
    var body = {
      username: appContext.userInfo.username,
      url: event.target.urlInput.value
    }
    axios.post("/api/load/music", body, { headers: headers })
      .then((response) => {
        lastId += 1
        event.target.urlInput.value = ""
        console.log(response.data)
        addToList(response.data.url)
      })
      .catch((error) => {
        console.log("error in /load/music", error)
        event.target.urlInput.value = ""
      })
  }
  const addToList = (newMusic) => {
    var list = videoProperties
    list.push(newMusic)
    setVideoProperties(list)
  }
  return (
    <div className="MusicPlayerPage">
      {videoProperties.length == 0 ?
        <div>
          <h1> No videos :( </h1>
          </div> : <span></span>}
      {appContext.userInfo && appContext.userInfo.accessToken ?
        <div className="MusicPlayer">
          <Carousel interval={null} className="d-flex align-items-center">
            {videoProperties.map((url) => {
              return (
                <Carousel.Item key={videoProperties.indexOf(url)}>
                  <ReactPlayer
                    url={url}
                    pip={true}
                    controls={true}
                    playing={false}
                    wrapper="div"
                    height="100vh"
                    width="100vw"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div> :
        <div>
          <h2>Your playlist could not be retrieved</h2>
          <p>Please check if you are logged in</p>
        </div>}
      {(appContext.userInfo && appContext.userInfo.accessToken) ?
        <div className="MusicPlayerInput">
          <h1>Add your music</h1>
          <Card>
            <CardHeader>
              Add a video to your focus music playlist
            </CardHeader>
            <CardBody>
              <Form onSubmit={addMusic}>
                <Form.Group>
                  <Form.Label>Enter youtube URL</Form.Label>
                  <Form.Control type="url" placeholder="Enter url" id="urlInput" />
                </Form.Group>
                <Button variant="outline-dark" type="submit">
                  + Add
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div> : <div></div>}
    </div>
  );
};

export default VideoCarousel;
