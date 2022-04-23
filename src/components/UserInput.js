import {
  Input,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Switch,
  useBoolean,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';

const UserInput = ({ onSubmit, isLoading }) => {
  const [userData, setUserData] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [isOddParity, handler] = useBoolean(false);

  const onInputChange = event => {
    let value = event.target.value;

    if (value !== '' && value.search(/[^10]+/g) > -1) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }

    setUserData(value);
  };

  const isInvalid = invalid && userData !== '';

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(userData, isOddParity);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb="2">
        <FormLabel htmlFor="user-input">Enter your message</FormLabel>

        <Input
          id="user-input"
          value={userData}
          letterSpacing={[2, 5]}
          placeholder="110111"
          isInvalid={isInvalid}
          onChange={onInputChange}
        />

        <FormHelperText>Your input must be in binary format.</FormHelperText>
      </FormControl>

      <FormControl display="flex" alignItems="center" mb="2">
        <FormLabel htmlFor="parity-selector" mb="0">
          Toggle this to use <strong>{isOddParity ? 'even' : 'odd'}</strong>{' '}
          parity.
        </FormLabel>
        <Switch
          id="parity-selector"
          value={isOddParity}
          onChange={handler.toggle}
        />
      </FormControl>

      <Box d="flex" justifyContent={['end', 'flex-start']}>
        <Button
          type="submit"
          colorScheme="green"
          disabled={isInvalid}
          isLoading={isLoading}
          loadingText="Generating"
        >
          Generate
        </Button>
      </Box>
    </form>
  );
};

export default UserInput;
