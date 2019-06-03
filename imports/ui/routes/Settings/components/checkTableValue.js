import React from 'react';

export default function checkTableValue(value, notProvidedText = 'required', callback = null, checkFunction){

  let boolResult = !!value;

  if (Array.isArray(value) && !value.length) {
    boolResult = false;
  }

  if(checkFunction && typeof checkFunction === 'function'){
    boolResult = checkFunction(value);
  }

  if(boolResult){

    if(callback && typeof callback === 'function'){
      return callback(value);
    }

    return value
  }else{
    return (<span className="not-provided">{notProvidedText}</span>);
  }
}
