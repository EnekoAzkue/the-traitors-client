

export type IconButtonProps = {
  width: number,
  height: number,
  xPos: number,
  yPos: number,
  backgroundImage: any,
  buttonOnPress: any,
  hasBrightness?: boolean, //Optional parameter --> must give 
  hasBorder?: boolean,
  backgrounOpacity?: number,
};


export interface getIconButtonStyledComponentsParams {
  width: number,
  height: number,
  xPos: number,
  yPos: number,
  hasBorder: boolean,
  backgrounOpacity: number, 
};