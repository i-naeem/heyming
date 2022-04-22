import { ButtonGroup, Button } from '@chakra-ui/react';

const BitsArray = ({ bitsArray = [] }) => {
  return (
    <ButtonGroup spacing={1} size="sm">
      {bitsArray.map(bit => (
        <Button colorScheme="blue" borderRadius="none">
          {bit}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default BitsArray;
