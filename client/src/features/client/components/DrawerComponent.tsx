import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface DrawerProps {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
  isVisible: boolean;
}

const DrawerComponent: React.FC<DrawerProps> = ({ options, selectedOption, onSelectOption, isVisible }) => {
  return (
    <div className={`drawer ${isVisible ? 'visible' : 'hidden'}`} style={{ width: '33vw', background: '#f8f9fa', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 999 }}>
      <ListGroup>
        {options.map(option => (
          <ListGroup.Item key={option} active={option === selectedOption} onClick={() => onSelectOption(option)}>
            {option}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default DrawerComponent;

