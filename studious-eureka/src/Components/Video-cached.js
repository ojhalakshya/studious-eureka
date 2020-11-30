import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'

import { IconButton, Badge, Input, Button } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import ScreenShareIcon from '@material-ui/icons/ScreenShare'
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare'
import CallEndIcon from '@material-ui/icons/CallEnd'
import ChatIcon from '@material-ui/icons/Chat'

import './Video.css'

export default function Video(props) {

  const localVideoref = useRef()

  // Set states for the app.
  const [askForUserName, setAskForUserName] = useState(true)
  const [userName, setUserName] = useState('')
  const [videoAvailable, setVideoAvailable] = useState(false)
  const [audioAvailable, setAudioAvailable] = useState(false)
  const [video, setVideo] = useState(false)
  const [audio, setAudio] = useState(false)
  const [screen, setScreen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [screenAvailable, setScreenAvailable] = useState(false)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [newMessages, setNewMessages] = useState(0)
  const [connections, setConnections] = useState([])

  getPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video : true })
        .then(() => setVideoAvailable(true))
        .catch(() => setVideoAvailable(false))

      await navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => setAudioAvailable(true))
        .catch(() => setAudioAvailable(false))

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true)
      }
      else {
        setScreenAvailable(false)
      }

      if (videoAvailable || audioAvailable) {
        navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable })
          .then((stream) => {
            window.localStream = stream
            localVideoref.current.srcObject = stream
          })
          .then(() => { })
          .catch((e) => console.log(e))
      }
    } catch (e) { console.log(e) }
  }

  useEffect(() => {
    getPermissions()
  }, [getPermissions])

  connect = () => {
    setAskForUserName(false)
    getMedia()
  }

  return (
    <div className="video-page">
      {
        askForUserName ?
        (<div>
          <div>
            <p>Set User Name : </p>
            <Input placeholder='UserName' value={userName} onChange={e => setUserName(e.target.value)} />
            <Button variant="contained" color="primary" onClick={this.connect}>Connect</Button>
          </div>
        </div>)
        :
        (
          <div>
          </div>
        )
      }
    </div>
  )
}