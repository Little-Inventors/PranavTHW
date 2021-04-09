const defaultResult = 0;
let currentResult = defaultResult;
let description;
let logEntries = [];

function inputValueFromUser() {
  return parseFloat(userInput.value);
}

function updateLog(previousValue, opertator, inputValue) {
  description = `${previousValue} ${opertator} ${inputValue}`;
  outputResult(currentResult, description);
}

function storeLog(opertator, previousValue, inputValue, result) {
  const logEntry = {
    opertator: opertator,
    previousValue: previousValue,
    inputValue: inputValue,
    result: currentResult,
  };
  console.log(logEntry.opertator);
}

function add() {
  let inputValue = inputValueFromUser();
  let previousValue = currentResult;
  currentResult += inputValue;
  storeLog("+", previousValue, inputValue, currentResult);
  updateLog(previousValue, "+", inputValue);
}

function subtract() {
  let inputValue = inputValueFromUser();
  let previousValue = currentResult;
  currentResult -= inputValue;
  storeLog("-", previousValue, inputValue, currentResult);
  updateLog(previousValue, "-", inputValue);
}

function multiply() {
  let inputValue = inputValueFromUser();
  let previousValue = currentResult;
  currentResult *= inputValue;
  storeLog("*", previousValue, inputValue, currentResult);
  updateLog(previousValue, "*", inputValue);
}

function divide() {
  let inputValue = inputValueFromUser();
  let previousValue = currentResult;
  currentResult /= inputValue;
  storeLog("/", previousValue, inputValue, currentResult);
  updateLog(previousValue, "/", inputValue);
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
