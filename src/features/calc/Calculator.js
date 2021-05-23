import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  pressKey
} from './calcSlice';
import './Calculator.css';

export function Calculator() {
  const dispatch = useDispatch();

  // We separate our logic into a queue and a stage.
  // Intuitively, the stage contains whatever you would see on the second row of the display - i.e., only the current number you're typing out, or the last operator you clicked.
  // Because this will change frequently, and we need to inspect the data before inserting it into our equation, this is held in local state.
  // The queue contains the entire equation that needs to be solved, and will be stored in the Redux store.
  const [stageText, setStageText] = useState('0')
  const queueText = useSelector(state => state.calculator.queue)

  // An operator button is anything that requires a push to the queue - equals, all-clear, or any math operators.
  const clickOper = e => {
    dispatch(pressKey(e.target.innerText))
  }

  // A "number" button is anything that gets handled locally in the stage - digits, decimal pt, or local clear
  const clickNum = e => {
    const keyPressed = e.target.innerText
    console.log(keyPressed)
    switch (keyPressed) {
      case 'C':
        setStageText('0');
        break;
      case '.':
        if (!stageText.includes('.')) {
          setStageText(stageText + '.')
        }
        break;
      case '0':
        if(stageText !== '0') {
          setStageText(stageText + '0')
        }
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if(stageText === '0') {
          setStageText(keyPressed)
        } else {
          setStageText(stageText + keyPressed);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div id="calculator">
      <div className="gridContainer">
        <div className="display" id="queue">{queueText + stageText}</div>
        <div className="display" id="stage">{stageText}</div>
        <div className="gridItem" id="btn1" onClick={clickNum}>1</div>
        <div className="gridItem" id="btn2" onClick={clickNum}>2</div>
        <div className="gridItem" id="btn3" onClick={clickNum}>3</div>
        <div className="gridItem" id="btn4" onClick={clickNum}>4</div>
        <div className="gridItem" id="btn5" onClick={clickNum}>5</div>
        <div className="gridItem" id="btn6" onClick={clickNum}>6</div>
        <div className="gridItem" id="btn7" onClick={clickNum}>7</div>
        <div className="gridItem" id="btn8" onClick={clickNum}>8</div>
        <div className="gridItem" id="btn9" onClick={clickNum}>9</div>
        <div className="gridItem" id="btn0" onClick={clickNum}>0</div>
        <div className="gridItem" id="btnDec" onClick={clickNum}>.</div>
        <div className="gridItem" id="btnC" onClick={clickNum}>C</div>
        <div className="gridItem" id="btnAC" onClick={clickOper}>AC</div>
        <div className="gridItem" id="btnPls" onClick={clickOper}>+</div>
        <div className="gridItem" id="btnMin" onClick={clickOper}>-</div>
        <div className="gridItem" id="btnMul" onClick={clickOper}>*</div>
        <div className="gridItem" id="btnDiv" onClick={clickOper}>/</div>
        <div className="gridItem" id="btnEql" onClick={clickOper}>=</div>
      </div>
    </div>
  );
}
