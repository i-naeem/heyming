import { useState } from 'react';
import encode from './encode';

const STATES = Object.freeze({
  loading: 'loading',
  success: 'success',
  error: 'error',
  idle: 'idle',
});

const useHammingCode = () => {
  const [hammingCode, setHammingCode] = useState([]);
  const [status, setStatus] = useState(STATES.idle);
  const [error, setError] = useState(null);

  const getHammingCode = async (bitsArray, isOdd) => {
    try {
      setStatus(() => STATES.loading);
      const response = await encode(bitsArray);
      setStatus(() => STATES.success);
      setHammingCode(() => response.codeArray);
    } catch (error) {
      setError(() => error.message);
      setStatus(() => STATES.error);
      setHammingCode([]);
    }
  };

  return {
    error,
    status,
    hammingCode,
    isLoading: status === STATES.loading,
    getHammingCode,
  };
};

export default useHammingCode;
