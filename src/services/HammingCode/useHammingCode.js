import { useState } from 'react';
import decode from './decode';
import encode from './encode';

const STATES = Object.freeze({
  loading: 'loading',
  success: 'success',
  error: 'error',
  idle: 'idle',
});

// default values so our code doesn't break at start-up
const defaultHammingCode = {
  code: '1100001',
  errorIndex: -1,
  isError: false,
  parity: 'Even',
  dataBitSize: 4,
  hammingCodeSize: 7,
  dataBits: [1, 1, 0, 0],
  efficiency: '57.14',
  redundantBitsSize: 3,
  codeArray: [1, 0, 0, 0, 0, 1, 1],
  parityPositions: [
    { parityIndex: 1, associatedDataBits: [1, 3, 5, 7] },
    { parityIndex: 2, associatedDataBits: [2, 3, 6, 7] },
    { parityIndex: 4, associatedDataBits: [4, 5, 6, 7] },
  ],
};

const useHammingCode = () => {
  const [hammingCode, setHammingCode] = useState(defaultHammingCode);
  const [status, setStatus] = useState(STATES.idle);
  const [error, setError] = useState(null);

  const getHammingCode = async (bitsArray, isOdd) => {
    try {
      setStatus(() => STATES.loading);
      const response = await encode(bitsArray, isOdd);
      setStatus(() => STATES.success);
      setHammingCode(() => response);
    } catch (error) {
      setError(() => error.message);
      setStatus(() => STATES.error);
      setHammingCode([]);
    }
  };

  const getDataBits = async (bitsArray, isOdd) => {
    try {
      setStatus(() => STATES.loading);
      const response = await decode(bitsArray, isOdd);
      setStatus(() => STATES.success);
      setHammingCode(() => response);
    } catch (error) {
      setError(() => error.message);
      setStatus(() => STATES.error);
      setHammingCode([]);
    }
  };

  return {
    error,
    status,
    code: hammingCode.code,
    parity: hammingCode.parity,
    isError: hammingCode.isError,
    dataBits: hammingCode.dataBits,
    bitsArray: hammingCode.codeArray,
    efficiency: hammingCode.efficiency,
    errorIndex: hammingCode.errorIndex,
    dataBitSize: hammingCode.dataBitSize,
    parityPositions: hammingCode.parityPositions,
    hammingCodeSize: hammingCode.hammingCodeSize,
    redundantBitsSize: hammingCode.redundantBitsSize,

    isLoading: status === STATES.loading,
    getHammingCode,
    getDataBits,
  };
};

export default useHammingCode;
