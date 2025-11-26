import React, { useEffect } from "react";
import { useScreenDimensions } from "../helpers/stores/useScreenDimensionsStore";
import { getToastStyledComponents } from "../componentStyles/ToastStyles";

// --- INTERFACES --- // 
import { type ToastProps } from "../helpers/interfaces/components/ToastInterfaces";


export default function Toast({ toastText, setMortimerToastText }: ToastProps) {

  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  // --- TOAST STYLED COMPONENTS--- //
  const StyledComponents = getToastStyledComponents(screenDimensions);

  useEffect(() => {
    setTimeout(() => {
      setMortimerToastText('');
    }, 3000);
  }, [toastText]);


  if (!toastText || toastText.trim() === '') return null;

  return (
    <StyledComponents.ToastContainer>
      <StyledComponents.StyledText>{toastText}</StyledComponents.StyledText>
    </StyledComponents.ToastContainer>
  );
}