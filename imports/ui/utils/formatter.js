import moment from 'moment';

export const formatDateTime = value => {
  if (!value) {
    return value;
  }
  return moment(value).toISOString();
};

export const floor = (value) => {
  const n = 2, x = 3;
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  const val = parseFloat(value || 0).toFixed(2);
  return val.replace(new RegExp(re, 'g'), '$&,');
};

export const scientificToDecimal = (value) => {

  //if the number is in scientific notation remove it
  if(/\d+\.?\d*e[\+\-]*\d+/i.test(value)) {
    let zero = '0',
      parts = String(value).toLowerCase().split('e'), //split into coeff and exponent
      e = parts.pop(),                                //store the exponential part
      l = Math.abs(e),                                //get the number of zeros
      sign = e/l,
      coeff_array = parts[0].split('.');
    if(sign === -1) {
      value = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
    }
    else {
      let dec = coeff_array[1];
      if(dec) l = l - dec.length;
      value = coeff_array.join('') + new Array(l+1).join(zero);
    }
  }

  return value;
};

export default {
  floor,
  scientificToDecimal,
  formatDateTime
};
