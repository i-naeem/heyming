/**
 * getRandomBis => returns random bits from min to max as string.
 * @param {Number = 10} min
 * @param {Number = 100} max
 * @returns {String}
 */

const getRandomBits = (min = 10, max = 60) => {
  const size = Math.floor(Math.random() * (max - min + 1) + min);

  let randomBits = '';

  for (let i = 0; i < size; ++i) {
    randomBits += Math.random() > 0.5 ? '0' : '1';
  }

  return randomBits;
};

export default getRandomBits;
