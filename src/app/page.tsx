'use client'

import { useState } from "react";

const Home = () => {
  const [currentOperand, setCurrentOperand] = useState('');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const click = (item: string) => {
    if (!isNaN(Number(item))) {
      if (isCalculated) {
        setCurrentOperand(item);
        setIsCalculated(false);
      } else {
        setCurrentOperand(prev => prev + item);
      }
      return;
    }

    if (item === '・') {
      if (isCalculated) {
        setCurrentOperand('0' + item);
        setIsCalculated(false);
        return;
      }
      if (currentOperand.includes('・')) return;
      setCurrentOperand(prev => prev + item);
      return;
    }

    setIsCalculated(false);

    switch (item) {
      case '+':
      case '-':
      case '×':
      case '÷':
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            calculate();
        }
        setOperation(item);
        setPreviousOperand(currentOperand);
        setCurrentOperand('');
        break;

      case 'CE':
        setCurrentOperand('');
        break;

      case 'O/C':
        setCurrentOperand('');
        setPreviousOperand('');
        setOperation('');
        break;

      case '=':
        if (operation === '' || previousOperand === '' || currentOperand === '') {
          return;
        }
        calculate();
        setPreviousOperand('');
        setOperation('');
        setIsCalculated(true);
        break;
    }
  }

  const calculate = () => {
    let result;
    const prev = parseFloat(previousOperand.replace('・', '.'));
    const current = parseFloat(currentOperand.replace('・', '.'));

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '×': result = prev * current; break;
      case '÷': result = prev / current; break;
      default: return;
    }
    setCurrentOperand(String(result));
  };

  const downButtons = [
    '7', '8', '9', 'CE', 'O/C',
    '4', '5', '6', '×', '÷',
    '1', '2', '3', '+', '-',
    '0', '・', '='
  ];
  
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-slate-900 p-4 rounded-2xl shadow-2xl w-full max-w-md">
        
        <div className="bg-slate-800 text-white font-mono text-right p-4 mb-4 rounded-lg overflow-x-auto">
          <div className="text-3xl text-gray-400 h-8 break-all">
            {previousOperand && `${previousOperand} ${operation}`}
          </div>
          <div className="text-6xl break-words">
            {currentOperand || '0'}
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {downButtons.map((item, index) => {
            const isOperator = ['×', '÷', '+', '-', '=', 'M+'].includes(String(item));
            const isClear = ['CE', 'O/C'].includes(String(item));
            return(
              <button  
                key={index} 
                onClick={() => {click(item)}}
                className={`text-3xl h-16 rounded-lg transition-colors ${isOperator ? 'bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600' : ''} ${isClear ? 'bg-gray-400 text-black hover:bg-gray-300 active:bg-gray-500' : ''} ${!isOperator && !isClear ? 'bg-gray-200 text-black hover:bg-gray-100 active:bg-gray-300' : ''}`}>
                {item}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home;