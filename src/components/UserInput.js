import {
  Box,
  Input,
  Button,
  HStack,
  Switch,
  FormLabel,
  useBoolean,
  IconButton,
  FormControl,
  useMediaQuery,
  FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaRandom } from 'react-icons/fa';
import getRandomBits from '../helpers/getRandomBits';

const UserInput = ({ onSubmit, isLoading }) => {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  const [userData, setUserData] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [isOddParity, handler] = useBoolean(false);

  const onInputChange = event => {
    let value = event.target.value;

    if (value !== '' && value.search(/[^10\s]+/g) > -1) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }

    setUserData(value);
  };

  const isInvalid = invalid && userData !== '';

  const handleSubmit = event => {
    event.preventDefault();
    const dataBits = userData.replace(/\s/g, '');
    onSubmit(dataBits, isOddParity);
  };

  const handleRandomButtonClick = () => {
    setUserData(getRandomBits());
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb="2">
        <FormLabel htmlFor="user-input">Enter your message</FormLabel>

        <HStack>
          <Input
            size="md"
            variant="filled"
            id="user-input"
            value={userData}
            letterSpacing={[2, 5]}
            placeholder="110111"
            isInvalid={isInvalid}
            onChange={onInputChange}
          />

          {isLargerThan900 ? (
            <Button
              px="6"
              size="md"
              colorScheme="blue"
              leftIcon={<FaRandom />}
              onClick={handleRandomButtonClick}
            >
              Generate Random Bits
            </Button>
          ) : (
            <IconButton
              colorScheme="blue"
              icon={<FaRandom />}
              aria-label="Generate Random Bits"
              onClick={handleRandomButtonClick}
            />
          )}
        </HStack>
        <FormHelperText>Your input must be in binary format.</FormHelperText>
      </FormControl>
      <FormControl display="flex" alignItems="center" mb="2">
        <FormLabel htmlFor="parity-selector" mb="0">
          Would you like to use <strong>Odd Parity</strong> ?
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
          disabled={isInvalid || userData === ''}
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
