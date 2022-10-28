import React from 'react'
import {useDisclosure} from '@chakra-ui/react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import SearchQuery from './searchQuery'

function History(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const focusRef = React.useRef()

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        History
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={focusRef}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader ref={focusRef} >History</DrawerHeader>

          <DrawerBody>
            {
              props.history.map((search, idx) => 
                <SearchQuery key={`query-${idx}`} search={search} rerender={props.rerender} pointer={idx}/>
              )
            }
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline'>Clear History</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default History;