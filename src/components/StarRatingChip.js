import React from 'react';
import styled from 'styled-components';

const StarRatingChip = ({ rating, count }) => {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5

  return (
    <Container>
      <StarContainer>
        {[...Array(5)].map((_, index) => (
          <Star key={index} filled={index + 0.5 <= roundedRating} />
        ))}
      </StarContainer>
      <RatingText>{roundedRating} { count} Reviews </RatingText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1px;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1px;
`;

const Star = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ filled }) => (filled ? '#FFA500' : 'transparent')};
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  margin-right: 2px;
`;

const RatingText = styled.span`
  font-size: 14px;
  color: #333;
`;

export default StarRatingChip;
