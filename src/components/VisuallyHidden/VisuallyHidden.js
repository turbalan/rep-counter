import React from 'react';
import styles from './styles.module.css';

function VisuallyHidden({ children }) {
  return <span className={styles.visuallyHidden}>{children}</span>;
}

export default VisuallyHidden;
