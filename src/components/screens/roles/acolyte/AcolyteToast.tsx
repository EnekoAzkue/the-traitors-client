import React, { useEffect } from "react";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";
import { getAcolyteToastStyledComponents } from "../../../../componentStyles/screensStyles/roles/acolyte/AcolyteToastStyles";


interface ToastProps {
  toastText: string;
  setAcolyteToastText: (text: string) => void;
};


export default function AcolyteToast({ toastText, setAcolyteToastText }: ToastProps) {


  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  const  {ToastContainer, StyledText} = getAcolyteToastStyledComponents(screenDimensions);

  useEffect( removeToastMessage ,[toastText]);

  function removeToastMessage() {
        setTimeout(() => {
        setAcolyteToastText('');
      }, 3000);
  }
  if (!toastText || toastText.trim() === '') return null;

  return (
    <ToastContainer>
      <StyledText>{toastText}</StyledText>
    </ToastContainer>
  );
}