import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Encoder from './routes/Encoder';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Header />
        <Box as="main" p={4} minH="calc(100vh - 70px - 70px)">
          <Routes>
            <Route exact path="/heyming" element={<Encoder />} />
            <Route exact path="/decoder" element={<h1>Decoder</h1>} />
            <Route
              exact
              path="*"
              element={<Navigate to="/heyming" replace />}
            />
          </Routes>
        </Box>
        <Footer />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
