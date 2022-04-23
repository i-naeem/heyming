import { Box, Text, Link } from '@chakra-ui/react';

const Footer = props => {
  return (
    <Box
      p={2}
      d="flex"
      shadow="sm"
      as="footer"
      height={70}
      borderTop="1px"
      alignItems="center"
      borderColor="gray.700"
    >
      <Text align="center" flexGrow={1}>
        Developed by{' '}
        <Link target="_blank" href="http://github.com/i-naeem">
          Mohammad Naeem
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
