const userInput = document.getElementById("input");

const addBtn = document.getElementById("add");

const subtractBtn = document.getElementById("subtract");
const multiplyBtn = document.getElementById("multiply");
const divideBtn = document.getElementById("divide");

const currentResultOutput = document.getElementById("result");
const currentCalculationOutput = document.getElementById("calculation");

function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}
