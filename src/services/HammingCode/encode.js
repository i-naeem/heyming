import getRedundantBits from '../../helpers/getRedundantBits';
import isPowerOf2 from '../../helpers/isPowerOfTwo';

const encode = async (data_bits, isOdd = false) => {
  const dataLength = data_bits.length;

  const redundantBitsSize = getRedundantBits(dataLength);
  const hammingCodeSize = dataLength + redundantBitsSize;

  const hammingCode = new Array(hammingCodeSize).fill(0);
  const parityPositions = [];

  // `P` for all the parity bits
  hammingCode.forEach((_, codeIndex) => {
    if (isPowerOf2(codeIndex)) {
      // Since array starts at 0 the parity bit value would be previous one.
      hammingCode[codeIndex - 1] = 'P';
      parityPositions.push({ parityIndex: codeIndex, associatedDataBits: [] });
    }
  });

  // Setting up parity bits and data bits
  let dataIndex = dataLength - 1;
  hammingCode.forEach((code, codeIndex) => {
    if (code === 'P') {
      hammingCode[codeIndex] = 0; // Default values for parity bits
    } else {
      hammingCode[codeIndex] = data_bits[dataIndex--]; // Otherwise its a data bit.
    }
  });

  // Setting the correct parity bits
  for (let r = 0; r < redundantBitsSize; ++r) {
    let parityPosition = Math.pow(2, r);
    let onesCount = 0; // Number of 1s for associated data bits

    for (
      let dataBitIndex = parityPosition;
      dataBitIndex < hammingCodeSize + 1;
      ++dataBitIndex
    ) {
      if (parityPosition & dataBitIndex) {
        // Since array starts at zero so our data bit would always be the previous one and add it the ones
        onesCount += hammingCode[dataBitIndex - 1];

        let parity = parityPositions.find(
          parity => parity.parityIndex === parityPosition
        );

        parity.associatedDataBits.push(dataBitIndex);
      }
    }

    // Again arrays starts at 0; and mod 2 basically would return either 0 or 1
    // if the ones were odd it would return 1 other wise it would return 0
    // if its odd parity we would like to add 1 otherwise we would its even

    if (isOdd) {
      hammingCode[parityPosition - 1] = onesCount % 2 === 0 ? 1 : 0;
    } else {
      hammingCode[parityPosition - 1] = onesCount % 2;
    }
  }

  return {
    code: [...hammingCode].reverse().join(''),
    dataBitSize: dataLength,
    codeArray: hammingCode,
    dataBits: data_bits,
    redundantBitsSize,
    hammingCodeSize,
    isError: false,
    errorIndex: 0,

    efficiency: ((100 * dataLength) / hammingCodeSize).toFixed(2),
    parityPositions,
    parity: isOdd ? 'Odd' : 'Even',
  };
};

export default encode;
