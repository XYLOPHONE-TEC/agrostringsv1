import React, { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  Portal,
  Button,
  CloseButton,
  Input,
  Box,
  Image,
  SimpleGrid,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'

export default function AddNewProduct({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    location: '',
    quantity: '',
    imageFile: null,
  })
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (isOpen) setForm(f => ({ ...f, imageFile: null }))
  }, [isOpen])

  const handleFileChange = e => {
    const file = e.target.files?.[0]
    if (file) setForm(f => ({ ...f, imageFile: file }))
  }

  const handleChooseImage = () => fileInputRef.current?.click()
  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }
  const handleSave = () => {
    onSave({ ...form, image: form.imageFile })
    onClose()
  }

  const dialogWidth = useBreakpointValue({ base: '95%', md: '480px' })

  return (
    <Dialog.Root open={isOpen} onOpenChange={open => !open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            maxW="480px"
            w={dialogWidth}
            bg="gray.800"
            borderRadius="md"
            overflow="hidden"
          >
            <Dialog.Header>
              <Dialog.Title color="white">Add New Product</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" color="white" onClick={onClose} />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body px={{ base: 4, md: 6 }} py={4}>
              <VStack spacing={4} align="stretch">
                <Button
                  size="sm"
                  bg="yellow.500"
                  color="black"
                  onClick={handleChooseImage}
                >
                  Choose Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />

                {form.imageFile && (
                  <Box
                    maxH="150px"
                    overflow="hidden"
                    borderRadius="md"
                    bg="black"
                  >
                    <Image
                      src={URL.createObjectURL(form.imageFile)}
                      alt="Preview"
                      objectFit="contain"
                      maxH="150px"
                      w="100%"
                    />
                  </Box>
                )}

                <SimpleGrid columns={2} gap={3} w="100%">
                  {['name', 'price', 'location', 'quantity'].map(field => (
                    <Input
                      key={field}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      size="sm"
                      bg="gray.700"
                      color="white"
                      border="none"
                      className="whitePlaceholder"
                    />
                  ))}
                </SimpleGrid>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer px={{ base: 4, md: 6 }} py={3}>
              <Button onClick={onClose} mr="3" size="sm">
                Cancel
              </Button>
              <Button colorScheme="yellow" onClick={handleSave} size="sm">
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
