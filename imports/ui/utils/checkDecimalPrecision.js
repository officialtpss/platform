export default function checkDecimalPrecision(value) {
  const numberParts = (Number.parseFloat(value) + '').replace(',', '.').split('.');

  if (numberParts.length > 1) {
    const lastPart = numberParts.pop();

    return (lastPart.length > 2);
  }

  return false;
};