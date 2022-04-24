import {
  Icon,
  Input,
  Button,
  HStack,
  Switch,
  FormLabel,
  IconButton,
  InputGroup,
  FormControl,
  useMediaQuery,
  InputRightElement,
} from '@chakra-ui/react';
import useInput from '../hooks/useInput';
import { useState, useEffect } from 'react';
import { FaRandom, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import getRandomBits from '../helpers/getRandomBits';
import PropTypes from 'prop-types';

const UserInput = ({ onSubmit, isLoading, minLength = 4 }) => {
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  const [isOddParity, setOddParity] = useState(false);
  const { isInvalid, userData, setUserData, onInputChange } =
    useInput(minLength);

  const size = 'md';

  const toggleOddParity = () => setOddParity(p => !p);

  const handleRandomButtonClick = () => setUserData(getRandomBits());

  useEffect(() => {
    const randomBits = getRandomBits(minLength, 16);
    setUserData(randomBits);
    onSubmit(randomBits);

    // eslint-disable-next-line
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const dataBits = userData.replace(/\s/g, '');
    onSubmit(dataBits, isOddParity);
  };

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
          onChange={toggleOddParity}
        />
      </FormControl>
    </form>
  );
};

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  minLength: PropTypes.number,
};
export default UserInput;
