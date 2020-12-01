import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';
import "./Home.css"

export default function Home(props) {
  const [url, setURL] = useState('')

  return (
    <div className="home-style">
      <div className="headings-home">
        <h1>Studious Eureka</h1>
        <p>Study the new Way!</p>
      </div>
      <div>
        <p>Join Class</p>
        <Input placeholder="Link" value={url} onChange={e => setURL(e.target.value)}/>
        <Button variant="contained" color="primary" onClick= {() => {
          if (url !== '') {
            let urlId = url.split('/')
            window.location.href = `/${urlId[urlId.length - 1]}`
          }
          else {
            let urlId = Math.random().toString(36).substring(2, 12)
            window.location.href = `/${urlId}`
          }
        }}>Join</Button>
      </div>
    </div>
  )
}