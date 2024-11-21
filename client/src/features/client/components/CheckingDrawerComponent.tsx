import React from "react";
import { ListGroup } from "react-bootstrap";
import "../styles/DrawerComponent.css";
import logo from "../../../assets/images/greater-texas-cu-logo.svg";
import LogOutButton from "./LogOutButton";

interface DrawerProps {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
  isVisible: boolean;
}

const DrawerComponent: React.FC<DrawerProps> = ({
  options,
  selectedOption,
  onSelectOption,
  isVisible,
}) => {
  return (
    <div className={`drawer ${isVisible ? "visible" : "hidden"}`}>
      <ListGroup className="bg-light">
        <ListGroup.Item>
          <img src={logo} alt="greater texas logo" />
        </ListGroup.Item>
        <ListGroup.Item className="bg-blue"></ListGroup.Item>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            {index % 4 === 0 && index !== 0 && index !== options.length - 1 && (
              <ListGroup.Item className="bg-blue"></ListGroup.Item>
            )}
            <ListGroup.Item
              className={option === selectedOption ? "active-item" : ""}
              onClick={() => onSelectOption(option)}
            >
              {option}
            </ListGroup.Item>
          </React.Fragment>
        ))}
      </ListGroup>
      <ListGroup.Item className="bg-blue">
        <LogOutButton />
      </ListGroup.Item>
    </div>
  );
};

export default DrawerComponent;
