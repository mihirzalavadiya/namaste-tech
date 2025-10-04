import React from 'react';

const Loader = ({
  fullScreen = true,
  size = 'medium',
  text = 'Loading...',
}) => {
  return (
    <>
      <div className={`loader-wrapper ${fullScreen ? 'fullscreen' : 'inline'}`}>
        {/* Spinner Loader - Default */}
        <div className="loader-spinner">
          <div className={`loader-spinner-ring ${size}`}></div>
        </div>

        {/* Dots Loader */}
        <div className="loader-dots">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>

        {text && <p className="loader-text">{text}</p>}
      </div>
    </>
  );
};

// Different Loader Variants
export const SpinnerLoader = ({ size = 'medium', text }) => {
  return (
    <>
      <div className="spinner-loader-container">
        <div className={`spinner-loader ${size}`}></div>
        {text && <p className="spinner-text">{text}</p>}
      </div>
    </>
  );
};

export const DotsLoader = ({ text }) => {
  return (
    <>
      <div className="dots-loader-container">
        <div className="dots-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        {text && <p className="dots-text">{text}</p>}
      </div>
    </>
  );
};

export const BarsLoader = ({ text }) => {
  return (
    <>
      <div className="bars-loader-container">
        <div className="bars-loader">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        {text && <p className="bars-text">{text}</p>}
      </div>
    </>
  );
};

export default Loader;
