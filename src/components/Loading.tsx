import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  height: 30px;
  width: 30px;
  border-top: 3px solid #123456;
  border-right: 3px solid #123456;
  border-radius: 50%;
  padding: 5px;
  animation: ${rotate} 1s linear infinite;
`;

export default Loading;