import React from 'react';
import styled from 'styled-components';

const TruncatedText = ({ text, maxLength, ...restProps }) => {
  const truncatedText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return <StyledTypography {...restProps}>{truncatedText}</StyledTypography>;
};

const StyledTypography = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default TruncatedText;
