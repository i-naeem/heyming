import {
  Input,
  HStack,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';

const UserInput = ({ onSubmit, isLoading }) => {
  const [userData, setUserData] = useState('');
  const [invalid, setInvalid] = useState(false);

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
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <FormControl>
          <FormLabel htmlFor="email">Enter your message</FormLabel>

          <Input
            value={userData}
            letterSpacing={5}
            placeholder="110111"
            isInvalid={isInvalid}
            onChange={onInputChange}
          />

          <FormHelperText>Your input must be in binary format.</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          colorScheme="green"
          disabled={isInvalid}
          isLoading={isLoading}
          loadingText="Generating"
        >
          Generate
        </Button>
      </HStack>
    </form>
  );
};

export default UserInput;
