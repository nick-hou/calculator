import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  pressKey
} from './calcSlice';
import './Calculator.css';

export function Calculator() {
  const dispatch = useDispatch();

  // const queueText = useSelector(state => state.calculator.queue)
  const queueText = '0'
  // const [stageText, setStageText] = useState('0')
  const stageText = '0'

  const clickBtn = e => {
    dispatch(pressKey(e.target.innerText))
  }

  return (
    <div id="calculator">
      <div className="gridContainer">
        <div className="display" id="queue">{queueText}</div>
        <div className="display" id="stage">{stageText}</div>
        <div className="gridItem" id="btn1" onClick={clickBtn}>1</div>
        <div className="gridItem" id="btn2" onClick={clickBtn}>2</div>
        <div className="gridItem" id="btn3" onClick={clickBtn}>3</div>
        <div className="gridItem" id="btn4" onClick={clickBtn}>4</div>
        <div className="gridItem" id="btn5" onClick={clickBtn}>5</div>
        <div className="gridItem" id="btn6" onClick={clickBtn}>6</div>
        <div className="gridItem" id="btn7" onClick={clickBtn}>7</div>
        <div className="gridItem" id="btn8" onClick={clickBtn}>8</div>
        <div className="gridItem" id="btn9" onClick={clickBtn}>9</div>
        <div className="gridItem" id="btn0" onClick={clickBtn}>0</div>
        <div className="gridItem" id="btnDec" onClick={clickBtn}>.</div>
        <div className="gridItem" id="btnPls" onClick={clickBtn}>+</div>
        <div className="gridItem" id="btnMin" onClick={clickBtn}>-</div>
        <div className="gridItem" id="btnMul" onClick={clickBtn}>*</div>
        <div className="gridItem" id="btnDiv" onClick={clickBtn}>/</div>
        <div className="gridItem" id="btnAC" onClick={clickBtn}>AC</div>
        <div className="gridItem" id="btnEql" onClick={clickBtn}>=</div>
      </div>
    </div>
  );
}
