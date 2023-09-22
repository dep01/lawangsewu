
import React, { createContext, useState, useContext } from 'react';
import styled from 'styled-components';

const LoadingBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7); /* Add an overlay background color */
  z-index: 9999; /* Set a high z-index to ensure it's displayed above other content */
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db; /* Loading spinner color */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
`;

const GlobalLoadingBlock = () => {
  return (
    <LoadingBlock>
      <LoadingSpinner />
    </LoadingBlock>
  );
};

export default GlobalLoadingBlock;