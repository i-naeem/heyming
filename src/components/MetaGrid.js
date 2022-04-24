import { SimpleGrid, Text, Box, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const MetaGrid = ({
  parity,
  efficiency,
  dataBitSize,
  hammingCodeSize,
  redundantBitsSize,
}) => {
  const padLength = hammingCodeSize.toString().length;
  return (
    <SimpleGrid columns={[1, 2]} spacing={3} mb="3" px="3">
      <Box>
        <Heading size="md" mb="sm">
          Efficiency
        </Heading>
        <Text>
          Since we have some parity bits, not all of the bits can be used to
          transfer data. Our current efficiency is:
        </Text>
        <Text>
          <strong>{dataBitSize}</strong> data bits /{' '}
          <strong>{redundantBitsSize}</strong> parity bits ={' '}
          <strong>{efficiency}%</strong>
        </Text>
      </Box>

      <Box>
        <Heading size="md" mb="sm">
          Details
        </Heading>
        <SimpleGrid columns={2}>
          <Text>Hamming Code Size</Text>
          <Text fontWeight="bold">
            {hammingCodeSize.toString().padStart(padLength, '0')}
          </Text>
          <Text>Parity Bit Size</Text>
          <Text fontWeight="bold">
            {redundantBitsSize.toString().padStart(padLength, '0')}
          </Text>
          <Text>Data Bit Size</Text>
          <Text fontWeight="bold">
            {dataBitSize.toString().padStart(padLength, '0')}
          </Text>
          <Text>Parity</Text>
          <Text fontWeight="bold">{parity}</Text>
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  );
};

MetaGrid.propTypes = {
  efficiency: PropTypes.string.isRequired,
  dataBitSize: PropTypes.number.isRequired,
  parity: PropTypes.oneOf(['Even', 'Odd']),
  hammingCodeSize: PropTypes.number.isRequired,
  redundantBitsSize: PropTypes.number.isRequired,
};

export default MetaGrid;
