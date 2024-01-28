import React from 'react';
import styled from 'styled-components';

const AddToCartButton = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Add to Cart</StyledButton>;
};

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default AddToCartButton;
