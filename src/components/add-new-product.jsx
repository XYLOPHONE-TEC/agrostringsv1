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
    if (isOpen) {
      setForm(f => ({ ...f, imageFile: null }))
    }
  }, [isOpen])

  const handleFileChange = e => {
    const file = e.target.files?.[0]
    if (file) {
      setForm(f => ({ ...f, imageFile: file }))
    }
  }

  const handleChooseImage = () => {
    fileInputRef.current?.click()
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSave = () => {
    onSave({ ...form, image: form.imageFile })
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={open => !open && onClose()} >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="480px" bg={"gray.800"}>
            <Dialog.Header>
              <Dialog.Title color="white">Add New Product</Dialog.Title>
              <Dialog.CloseTrigger asChild >
                <CloseButton size="sm" color="white" onClick={onClose} />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body>
              <Box mb="3">
                <Button size="sm" mb="2" bg="gray"  onClick={handleChooseImage}>
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
                  <Box mt="3" maxH="150px" overflow="hidden" borderRadius="md" bg="gray">
                    <Image
                      src={URL.createObjectURL(form.imageFile)}
                      alt="Preview"
                      objectFit="contain"
                      maxH="150px"
                      w="100%"
                    />
                  </Box>
                )}
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                {['name', 'price', 'location', 'quantity'].map(field => (
                  <Input
                    key={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    size="sm"
                    bg="gray.800"
                    color="white"
                    className='whitePlaceholder'
                  />
                ))}
              </SimpleGrid>
            </Dialog.Body>

            <Dialog.Footer>
              <Button  onClick={onClose} mr="3" size="sm">
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
