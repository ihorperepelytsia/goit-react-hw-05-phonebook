import React from 'react';
import './alert.scss';

const Alert = ({ text }) => (
  <div className="alert">
    <p>{text}</p>
  </div>
);

export default Alert;
