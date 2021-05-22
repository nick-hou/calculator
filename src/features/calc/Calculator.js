import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {
//
// } from './calcSlice';
import styles from './Calculator.module.css';

export function Calculator() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');


  return (
    <div>

    </div>
  );
}
