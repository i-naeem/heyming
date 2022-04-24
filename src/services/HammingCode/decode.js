import isPowerOf2 from '../../helpers/isPowerOfTwo';

const decode = async (hamming_code, isOdd = false) => {
  let error = [];
  let parityPositions = [];
  let redundantBitsSize = 0;
  let dataBits = [];

  hamming_code.forEach((bit, bitIndex) => {
    if (isPowerOf2(bitIndex + 1)) {
      let position = bitIndex + 1;
      ++redundantBitsSize;

      let onesCount = 0;
      parityPositions.push({ parityIndex: position, associatedDataBits: [] });

      for (let i = position; i < hamming_code.length + 1; ++i) {
        if (position & i) {
          onesCount += hamming_code[i - 1];
          let parityBit = parityPositions.find(p => p.parityIndex === position);
          parityBit.associatedDataBits.push(i);
        }
      }

      let parity = 0;

      if (isOdd) {
        parity = onesCount % 2 === 0 ? 1 : 0;
      } else {
        parity = onesCount % 2;
      }

      if (parity !== bit) {
        error.unshift(parity);
      } else {
        error.unshift(parity);
      }
    } else {
      dataBits.unshift(bit);
    }
  });

  let hammingCodeSize = hamming_code.length;
  let dataBitSize = hammingCodeSize - redundantBitsSize;

  let errorIndex = parseInt(error.join(''), 2);

  return {
    efficiency: ((100 * dataBitSize) / hammingCodeSize).toFixed(2),
    isError: errorIndex > 0 ? true : false,
    code: [...hamming_code].join(''),
    codeArray: hamming_code,
    redundantBitsSize,
    parityPositions,
    hammingCodeSize,
    dataBitSize,
    errorIndex,
    dataBits,
    parity: isOdd ? 'Odd' : 'Even',
  };
};

export default decode;
