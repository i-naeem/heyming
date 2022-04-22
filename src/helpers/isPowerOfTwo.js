/**
 * isPowerOf2 checks if the given number is power of two or not.
 * @param {Number} num
 * @returns {Boolean}
 */
const isPowerOf2 = num => {
  if (num === 0) {
    return false;
  }

  return !(num & (num - 1)); //bitwise AND the number and one less than it
};

export default isPowerOf2;
