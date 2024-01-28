import React from 'react';
import styled from 'styled-components';

const BuyNowButton = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Buy Now</StyledButton>;
};

const StyledButton = styled.button`
  background-color: #4caf55;
  color: white;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin:10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default BuyNowButton;
