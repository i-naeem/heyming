import { ButtonGroup, Button } from '@chakra-ui/react';
import isPowerOf2 from '../helpers/isPowerOfTwo';

const BitsArray = ({ bitsArray = [] }) => {
  return (
    <ButtonGroup spacing={1} size="lg">
      {bitsArray.map((bit, bitIndex) => (
        <Button
          colorScheme="teal"
          variant={isPowerOf2(bitIndex + 1) ? 'solid' : 'outline'}
          borderRadius="none"
          key={bitIndex}
        >
          {bit}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default BitsArray;
