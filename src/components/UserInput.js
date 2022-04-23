import {
  Icon,
  Input,
  Button,
  HStack,
  Switch,
  FormLabel,
  useBoolean,
  IconButton,
  InputGroup,
  FormControl,
  useMediaQuery,
  InputRightElement,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaRandom, FaCheck, FaExclamationCircle } from 'react-icons/fa';
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
  const size = isLargerThan900 ? 'md' : 'sm';

  const handleSubmit = event => {
    event.preventDefault();
    const dataBits = userData.replace(/\s/g, '');
    onSubmit(dataBits, isOddParity);
  };

  const handleRandomButtonClick = () => {
    setUserData(getRandomBits());
  };

  useEffect(() => {
    const randomBits = getRandomBits(4, 16);
    setUserData(randomBits);
    onSubmit(randomBits);

    // eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <HStack mb="2">
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
            size={size}
            colorScheme="blue"
            icon={<FaRandom />}
            aria-label="Generate Random Bits"
            onClick={handleRandomButtonClick}
          />
        )}

        <InputGroup size={size}>
          <Input
            variant="filled"
            id="user-input"
            value={userData}
            isInvalid={isInvalid}
            letterSpacing={[2, 5]}
            onChange={onInputChange}
            _placeholder={{ letterSpacing: 'normal' }}
            placeholder="Your input must be in binary format (110111)"
          />
          {userData !== '' ? (
            <InputRightElement
              children={
                <Icon
                  as={isInvalid ? FaExclamationCircle : FaCheck}
                  color={isInvalid ? 'red.500' : 'green.500'}
                />
              }
            />
          ) : null}
        </InputGroup>

        <Button
          size={size}
          type="submit"
          colorScheme="green"
          isLoading={isLoading}
          disabled={isInvalid || userData === '' || isLoading}
        >
          Generate
        </Button>
      </HStack>

      <FormControl display="flex" alignItems="center" mb="2" fontSize={size}>
        <FormLabel htmlFor="parity-selector" mb="0">
          Would you like to use <strong>Odd Parity</strong> ?
        </FormLabel>
        <Switch
          id="parity-selector"
          value={isOddParity}
          onChange={handler.toggle}
        />
      </FormControl>
    </form>
  );
};

export default UserInput;
