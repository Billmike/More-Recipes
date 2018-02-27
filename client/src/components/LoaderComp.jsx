import React from 'react';
import Loader from 'react-loader';

const LoaderComp = props => (
  <div>
    <Loader
      loaded={props.loaded}
      lines={13}
      length={20}
      width={10}
      radius={30}
      corners={1}
      rotate={0}
      direction={1}
      color="#5f9ea0"
      speed={1}
      trail={60}
      shadow={false}
      hwaccel={false}
      className="spinner"
      zIndex={2e9}
      top="50%"
      left="50%"
      scale={1.00}
      loadedClassName="loadedContent"
    />
  </div>
);

export default LoaderComp;
