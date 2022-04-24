import {
  Box,
  Link,
  HStack,
  Heading,
  Container,
  IconButton,
  Button,
  useMediaQuery,
  Icon,
} from '@chakra-ui/react';
import { APP_NAME } from '../configs/constants';
import { FaGithub, FaHashtag } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Header = props => {
  const [isLargerThan900] = useMediaQuery(`(min-width: 900px)`);

  const size = isLargerThan900 ? 'md' : 'sm';
  return (
    <Box>
      <Box
        p={2}
        d="flex"
        as="header"
        shadow="sm"
        height={70}
        alignItems="center"
      >
        <Container maxW="container.xl">
          <HStack justifyContent="space-between">
            <Heading
              as={Link}
              bgClip="text"
              href="/heyming"
              size={isLargerThan900 ? 'lg' : 'xl'}
              bgGradient="linear(to-r, teal.500, green.500)"
            >
              {APP_NAME}
            </Heading>

            <HStack spacing={2}>
              <Button
                size={size}
                as={RouterLink}
                to="/heyming"
                leftIcon={<Icon as={FaHashtag} />}
              >
                Encoder
              </Button>
              <Button
                size={size}
                as={RouterLink}
                to="/decoder"
                leftIcon={<Icon as={FaHashtag} />}
              >
                Decoder
              </Button>
              <IconButton
                as="a"
                size={size}
                fontSize="lg"
                marginLeft="2"
                target="_blank"
                color="current"
                variant="outline"
                icon={<FaGithub />}
                aria-label="Link to github source"
                href="https://github.com/i-naeem/heyming"
              />

              <ColorModeSwitcher justifySelf="flex-end" size={size} />
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
