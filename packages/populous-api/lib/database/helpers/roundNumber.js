export default function roundNumber(inputValue, decimal = 2){

  const numberInputValue = Number.parseFloat(inputValue);

  if(!Number.isFinite(numberInputValue) || Number.isNaN(numberInputValue)){
    return 0;
  }

  return Number.parseFloat(numberInputValue.toFixed(decimal));
}
