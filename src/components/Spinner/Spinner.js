import React from 'react';
import styles from './Spinner.module.css';

export default () => (
  <div className={`${styles['lds-spinner']}`}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
