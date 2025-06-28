// SignInModal.jsx
import React, { useState } from 'react';
import {
  Dialog,
  Portal,
  Button,
  CloseButton,
  Input,
  InputGroup,
  Text,
  HStack,
  Box,
} from '@chakra-ui/react';
import { HiX, HiEye, HiEyeOff } from 'react-icons/hi';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import '../index.css';

const SignInModal = ({ open, onOpenChange, onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    onSubmit({ phone, password });
    setPhone('');
    setPassword('');
    // Modal only closes on close icon
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {}}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="#222" color="white" alignItems="center">
            <Dialog.Header>Sign In to AgroStrings</Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                aria-label="Close"
                size="md"
                variant="ghost"
                color="white"
                pos="absolute"
                top="2"
                right="2"
                onClick={handleClose}
              >
                <HiX />
              </CloseButton>
            </Dialog.CloseTrigger>

            <Dialog.Body px={6} py={4}>
              <Box w="100%" maxW="sm">
                <HStack w="100%" spacing={2} mb={4}>
                  <Box flex="1">
                    <PhoneInput
                      defaultCountry="UG"
                      placeholder="phone number"
                      _placeholder={{ color: 'gray.400' }}
                      value={phone}
                      onChange={setPhone}
                      international
                      className="custom-phone-input"
                    />
                  </Box>
                </HStack>

                <InputGroup mb={4} endElement={
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <HiEyeOff /> : <HiEye />}
                  </Button>
                }>
                  <Input
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    bg="gray.700"
                    border="none"
                    _placeholder={{ color: 'gray.400' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>

                <Dialog.Footer px={0} py={4}>
                  <Button
                    colorScheme="yellow"
                    bg="#fff"
                    color="black"
                    w="100%"
                    onClick={handleSubmit}
                  >
                    Sign In
                  </Button>
                </Dialog.Footer>

                <Text fontSize="sm" color="gray.400" textAlign="center">
                  Don’t have an account?{' '}
                  <Button variant="link" colorScheme="yellow">
                    Create one
                  </Button>
                </Text>
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SignInModal;
