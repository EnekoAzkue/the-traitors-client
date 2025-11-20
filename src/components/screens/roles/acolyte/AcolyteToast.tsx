import React, { use, useEffect } from "react";
import { Text } from "react-native";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";


const { width, height } = Dimensions.get('window');

interface ToastProps {
  toastText: string;
  setAcolyteToastText: (text: string) => void;
};


const ToastContainer = styled.View`
  position: absolute;
  top: ${height * 0.85}px;
  left: ${width * 0.13}px;
  border: 1px solid rgba(255, 255, 255, 1);
  width: ${width * 0.75}px;
  height: ${height * 0.05}px;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);

  fontSize: 15px;
`;

const StyledText = styled.Text`
  text-align: center;
  color: white;
`;


export default function AcolyteToast({ toastText, setAcolyteToastText }: ToastProps) {
  useEffect(() => {
    setTimeout(() => {
      setAcolyteToastText('');
    }, 3000);
  }, [toastText]);


  if (!toastText || toastText.trim() === '') return null;

  return (
      <ToastContainer>
        <StyledText>{toastText}</StyledText>
      </ToastContainer>
  );
}