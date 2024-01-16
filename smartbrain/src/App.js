

import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import 'tachyons';
import './App.css';
import { useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false)


const PAT = 'ed97fb1a61fb4943b965ef8e1dd96ec0';
const USER_ID = 'sabina27';
const APP_ID = 'brain';
const MODEL_ID = 'face-detection';
const IMAGE_URL = imageUrl;

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                    // "base64": IMAGE_BYTES_STRING
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
  const onInputChange = (event) =>{
    console.log('event', event.target.value)
    setInput(event.target.value)
  }
  const onRouteChange = (route) =>{
    setIsSignedIn((route ==='home') ? true : false);
    console.log('signin', isSignedIn)
    setRoute(route);
  }

  const calculateFaceLocation = (...data) =>{
    const [topRow,leftCol,bottomRow,rightCol] = [...data]
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('width', width, height, topRow, leftCol)
    return{ leftCol: leftCol * width,
             topRow:  topRow * height,
            rightCol: width - (rightCol * width),
             bottomRow: height-( bottomRow * height)}
  }
  const displayFaceBox = (box) =>{
    setBox(box)
  }
  const onButtonSubmit = ()=>{
    setImageUrl(input);


fetch("https://api.clarifai.com/v2/models/" + MODEL_ID  + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {
        const regions = result.outputs[0].data?.regions;

        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);
             
            displayFaceBox(calculateFaceLocation(topRow,leftCol,bottomRow,rightCol))
            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                
            });
        });

    })
    .catch(error => console.log('error', error));

  }

  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} className='particles'/>
      <Navigation onRouteChange={onRouteChange} isSignedIn ={isSignedIn}/>
      { (route === 'home') ? 
            <div>
              <Logo/>
              <ImageLinkForm onInputChange ={onInputChange} onButtonSubmit={onButtonSubmit}/>
              <FaceRecognition imageUrl={imageUrl} box= {box} />
          </div> : 
          (route === 'signin') ?
      <SignIn onRouteChange={onRouteChange}/> : 
      <Register onRouteChange={onRouteChange}/>
      }


    </div>
  );
}

export default App;
