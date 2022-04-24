import { Button, Heading, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Bit = props => {
  const { bit, bitIndex, isCompact, isParityBit, errorIndex, ...rest } = props;
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');

  return (
    <Button
      borderRadius="sm"
      colorScheme={errorIndex === bitIndex ? 'red' : 'teal'}
      minH={isCompact ? 'auto' : '80px'}
      variant={isParityBit || errorIndex === bitIndex ? 'solid' : 'outline'}
      {...rest}
    >
      <Stack>
        <Heading size={!isCompact && isLargerThan900 ? 'lg' : 'md'}>
          {bit}
        </Heading>

        {isCompact ? null : (
          <Text fontSize={isLargerThan900 ? 'md' : 'sm'}>
            {isParityBit ? 'P' : 'D'}
            {bitIndex}
          </Text>
        )}
      </Stack>
    </Button>
  );
};

Bit.propTypes = {
  isCompact: PropTypes.bool,
  isParityBit: PropTypes.bool,
  errorIndex: PropTypes.number,
  bit: PropTypes.number.isRequired,
  bitIndex: PropTypes.number.isRequired,
};

export default Bit;
