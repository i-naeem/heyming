import { useState } from 'react';
const useInput = minLength => {
  const [userData, setUserData] = useState('');
  const [invalid, setInvalid] = useState(false);

  const onInputChange = event => {
    let value = event.target.value;

    if (
      (value !== '' && value.search(/[^10\s]+/g) > -1) ||
      value.length < minLength
    ) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
    setUserData(value);
  };

  const isInvalid = invalid && userData !== '';

  return {
    onInputChange,
    setUserData,
    isInvalid,
    userData,
  };
};

export default useInput;
