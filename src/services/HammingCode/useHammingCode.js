import { useState } from 'react';
import encode from './encode';

const STATES = Object.freeze({
  loading: 'loading',
  success: 'success',
  error: 'error',
  idle: 'idle',
});

const defaultHammingCode = {
  code: '',
  parity: '',
  codeArray: [],
  dataBitSize: 0,
  efficiency: '0',
  hammingCodeSize: 0,
  parityPositions: [],
  redundantBitsSize: 0,
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

  return {
    error,
    status,
    code: hammingCode.code,
    parity: hammingCode.parity,
    bitsArray: hammingCode.codeArray,
    efficiency: hammingCode.efficiency,
    dataBitSize: hammingCode.dataBitSize,
    parityPositions: hammingCode.parityPositions,
    hammingCodeSize: hammingCode.hammingCodeSize,
    redundantBitsSize: hammingCode.redundantBitsSize,
    isLoading: status === STATES.loading,
    getHammingCode,
  };
};

export default useHammingCode;
