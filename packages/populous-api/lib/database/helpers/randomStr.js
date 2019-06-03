const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// This function creates a random String
// of alpha-numeric characters of a given length.
// Adapted from https://stackoverflow.com/a/10727155/5386237
let randomStr = length => {
  if (length > 100) {
    throw new Error('Length too long');
  }

  let result = '';

  for (let i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }

  return result;
};

// Function used for stubbing
const stubRandomStr = stub => {
  randomStr = stub;
};

// Export as non-default to allow stubbing
// as default exports are immutable
export { randomStr, stubRandomStr };
