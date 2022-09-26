import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import ImageComparisonSlider from './ImageComparisonSlider'

const randomPhoto = 'https://source.unsplash.com/collection/1777528/1280x720'

ReactDOM.render(
  <React.StrictMode>
    <ImageComparisonSlider
      imageLeft={randomPhoto}
      imageRight={randomPhoto}
      blurRightImage={3}
      handleText={'Handler'}
      titleLeft={'Left Title'}
      titleRight={'Right Title'}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
