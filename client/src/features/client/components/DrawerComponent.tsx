import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../styles/DrawerComponent.css';
import logo from '../assets/greater-texas-cu-logo.svg'

interface DrawerProps {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
  isVisible: boolean;
  blocked: any
  
}

const DrawerComponent: React.FC<DrawerProps> = ({ options, selectedOption, onSelectOption, isVisible }) => {
  return (
    <div className={`drawer ${isVisible ? 'visible' : 'hidden'}`}>
      <ListGroup>
        <ListGroup.Item >
          <img src={logo} alt='greater texas logo' />
        </ListGroup.Item>
        {options.map((option, index) => (
          <ListGroup.Item
            key={option}
            className={option === selectedOption || index % 6 === 0 ? 'active-item' : ''}
            onClick={() => onSelectOption(option)}
          >
            {option}
          </ListGroup.Item>
        ))}

      </ListGroup>
    </div>
  );
};

export default DrawerComponent;

