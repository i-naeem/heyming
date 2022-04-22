import isPowerOf2 from '../../helpers/isPowerOfTwo';

const decode = async hamming_code => {
  let error = [];
  hamming_code.forEach((bit, bitIndex) => {
    if (isPowerOf2(bitIndex + 1)) {
      let position = bitIndex + 1;
      let ones = 0;
      for (let i = position; i < hamming_code.length + 1; ++i) {
        if (position & i) {
          ones += hamming_code[i - 1];
        }
      }

      let parity = ones % 2;
      if (parity !== bit) {
        error.unshift(parity);
      } else {
        error.unshift(parity);
      }
    }
  });

  let errorIndex = parseInt(error.join(''), 2) - 1;
  return {
    errorIndex,
    isError: errorIndex > -1 ? true : false,
  };
};

export default decode;
