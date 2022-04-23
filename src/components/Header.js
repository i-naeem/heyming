import {
  Box,
  Link,
  HStack,
  Heading,
  Container,
  IconButton,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { APP_NAME } from '../configs/constants';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Header = props => {
  return (
    <Box p={2} d="flex" as="header" shadow="sm" height={70} alignItems="center">
      <Container maxW="container.xl">
        <HStack justifyContent="space-between">
          <Heading
            bgGradient="linear(to-r, teal.500, green.500)"
            bgClip="text"
            as={Link}
            href="/"
          >
            {APP_NAME}
          </Heading>
          <section>
            <IconButton
              size="md"
              as="a"
              fontSize="lg"
              marginLeft="2"
              target="_blank"
              color="current"
              variant="outline"
              icon={<FaGithub />}
              aria-label="Link to github source"
              href="https://github.com/i-naeem/heyming"
            />

            <ColorModeSwitcher justifySelf="flex-end" />
          </section>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
