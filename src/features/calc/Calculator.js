import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  pressKey
} from './calcSlice';
import { evaluate } from 'mathjs'
import './Calculator.css';

export function Calculator() {
  const dispatch = useDispatch();

  // We separate our logic into a queue and a stage.
  // Intuitively, the stage contains whatever you would see on the second row of the display - i.e., only the current number you're typing out, or the last operator you clicked.
  // Because this will change frequently, and we need to inspect the data before inserting it into our equation, this is held in local state.
  // The queue contains the entire equation that needs to be solved, and will be stored in the Redux store.
  const [stageText, setStageText] = useState('0')
  const queueText = useSelector(state => state.calculator.queue)
  const status = useSelector(state => state.calculator.status)

  // An operator button is anything that requires a push to the queue - equals, all-clear, or any math operators.
  const clickOper = e => {
    const keyPressed = e.target.innerText
    // Dispatch keypress to update the equation in queue
    dispatch(pressKey({keyPressed, stageText}))
    // Update the stage based on the key pressed
    switch (keyPressed) {
      // For /*-+, display that on the stage
      case '/':
      case '*':
      case '+':
      case '-':
        setStageText(keyPressed);
        break;
      // For AC, clear the stage
      case 'AC':
        setStageText('0');
        break;
      // For =,
      case '=':
        // Check for a valid equation, i.e. doesn't end with an operator
        if(status==='inwork' && !(/[/*+-]/.test(stageText.split(-1)))) {
          // So.. this only barely works. Since dispatch is async-ish, if the browser runs fast enough, the queueText hasn't updated before it gets to this line.
          // Ideally, I would know how to write an await and .then() to only run evaluate /after/ the state is updated.
          const eq = queueText + stageText
          console.log(eq)
          const soln = evaluate(eq)
          setStageText(soln);
        }
        break;
      default:
        break;
    }
  }

  // A "number" button is anything that gets handled locally in the stage - digits, decimal pt, or local clear
  const clickNum = e => {
    const keyPressed = e.target.innerText
    switch (keyPressed) {
      case 'C':
        setStageText('0');
        // If we click C after solving an equation, clear all
        if(status === 'solved') dispatch(pressKey({keyPressed: 'AC'}))
        break;
      case '.':
        if(status === 'solved') {
          // If we just solved an equation, start a new one with 0.xx
          dispatch(pressKey({keyPressed: 'AC'}))
          setStageText('0.')
        }
        else if (!stageText.includes('.')) {
          // If not solved, check for an existing decimal in the stage
          setStageText(stageText + '.')
        }
        break;
      case '0':
        if(status === 'solved') {
          // If we just solved an equation, start a new one with 0.xx
          dispatch(pressKey({keyPressed: 'AC'}))
          setStageText('0')
        }
        else if(stageText !== '0') {
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
          // If stage says 0, replace it with the new digit
          setStageText(keyPressed)
        } else if(/[/*+-]/.test(stageText)) {
          // If we last pressed an operator, replace the stage with the new text
          setStageText(keyPressed)
        } else if (status === 'solved') {
          // If we just solved an equation, clear the board. Equivalent to pressing AC
          dispatch(pressKey({KeyPressed: 'AC'}))
          setStageText(keyPressed)
        } else {
          // Otherwise, just push the digit
          setStageText(stageText + keyPressed);
        }
        break;
      default:
        break;
    }
  }

  // Create a variable to show in the top display bar. Since the redux store doesn't update until we dispatch an operation, we need to add what's in the staging area to that display - but not if it's an operation, or if we just hit =
  let queueDisplay = queueText + (/[/*+-]/.test(stageText) ? '' : stageText)

  return (
    <div id="calculator">
      <div className="gridContainer">
        <div className="display" id="queue">{queueDisplay}</div>
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
