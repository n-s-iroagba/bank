import React from 'react'
import { Navbar, Button } from 'react-bootstrap';
type HeaderProps = {
    title:string;
    onToggleDrawer: () => void;
}


const HeaderBar:React.FC<HeaderProps> = ({title,onToggleDrawer})=>{
    return (
        
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Dashboard</Navbar.Brand>
        {/* Only show the toggle button on small and medium screens */}
        <Button
          className="d-lg-none"
          variant="outline-primary"
          onClick={onToggleDrawer}
        >
          ☰
        </Button>
        <h1>{title}</h1>
      </Navbar>
    )
} 
export default HeaderBar;



