import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" className='mb-3'>
      <Container>
        <Navbar.Brand href="#home">
          <img
            height={30}
            src="/moxieprintlogo.png"
          />{'Moxie Print'}
        </Navbar.Brand>  
        <Navbar.Brand href="#setting">
          <img
            height={30}
            src="/login.png"
          />{'Login'}
        </Navbar.Brand>  
      </Container>
    </Navbar>
  )
}