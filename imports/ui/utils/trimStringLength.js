export const trimStringLength = (string, maxLength) => {
  return string.length > maxLength ? `${string.substring(0, maxLength)}...` : string;
};

export default {
  trimStringLength,
};