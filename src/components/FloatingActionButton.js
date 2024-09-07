import React from 'react';
import styles from './FloatingActionButton.module.css';

const FloatingActionButton = ({ onClick }) =>
{
  return (
    <div className={styles.fab} onClick={onClick}>
      <img src="/svgs/plus.svg" alt="plus" />
    </div>
  );
};

export default FloatingActionButton;