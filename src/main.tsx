import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import ImageComparisonSlider from './ImageComparisonSlider'

ReactDOM.render(
  <React.StrictMode>
    <ImageComparisonSlider
      imageLeft='https://cdn.pixabay.com/photo/2022/01/07/07/13/chicago-6921297_1280.jpg'
      imageRight='https://cdn.pixabay.com/photo/2022/01/07/07/13/chicago-6921297_1280.jpg'
      blurRightImage={'3'}
      handleText={'Handler'}
      titleLeft={'Left Title'}
      titleRight={'Right Title'}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
