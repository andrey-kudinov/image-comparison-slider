import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import ImageComparisonSlider from './ImageComparisonSlider';

ReactDOM.render(
  <React.StrictMode>
    <ImageComparisonSlider
      imageLeft="https://cdn.shopify.com/s/files/1/0187/6800/3136/files/GettyImages-1014102550_SQ833x463_356486f5-9545-4123-97c6-8fa75474ac6c.jpg?v=1588659416"
      imageRight="https://cdn.shopify.com/s/files/1/0187/6800/3136/files/GettyImages-1014102550_SQ833x463_356486f5-9545-4123-97c6-8fa75474ac6c.jpg?v=1588659416"
      styleRightImage={{ filter: 'blur(3px)' }}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
