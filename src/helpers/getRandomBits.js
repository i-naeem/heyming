const getRandomBits = () => {
  const size = Math.floor(Math.random() * (100 - 10 + 1) + 10);

  let randomBits = '';

  for (let i = 0; i < size; ++i) {
    randomBits += Math.random() > 0.5 ? '0' : '1';
  }

  return randomBits;
};

export default getRandomBits;
