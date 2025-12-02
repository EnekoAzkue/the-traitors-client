import React, { useEffect } from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";

const { width, height } = Dimensions.get('window');
// --- INTERFACE --- //
interface ToastProps {
  toastText: string;
  setAcolyteToastText: (text: string) => void;
};

// --- STYLES --- //
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
  fontSize: ${width * 0.2}%;
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