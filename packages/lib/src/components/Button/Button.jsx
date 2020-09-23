import React from 'react';

import styles from './Button.scss';

const Button = ({ type = 'button' }) => <button className={styles.button} type={type} />;

export default Button;
