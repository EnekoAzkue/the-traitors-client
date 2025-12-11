import React, { useContext, useEffect } from 'react';
import ArtifactImage from './ArtifactImage';
import styled from 'styled-components/native';
import { Text, useWindowDimensions } from 'react-native';
import { Images, Screens, swampArtifactIcons } from '../helpers/constants/constants';
import { useActivatedArtifactStore } from '../helpers/stores/useActivatedArtifactStore';
import DropShadow from 'react-native-drop-shadow';
import IconButton from './screens/IconButton';
import { AcolyteInitialScreenContext } from '../helpers/contexts/contexts';


export default function Rosette () { 

  // --- CONSTANTS, CONTEXTS && STORES --- //
  const { width, height } = useWindowDimensions();
  const activatedArtifacts = useActivatedArtifactStore( state => state.activatedArtifacts );
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  
  const artifactsInRosettePositionsPercents = [{x: 20, y: 20}, {x: 80, y: 20}, {x: 20, y: 80}, {x: 80, y: 80}];
  

  // if (activatedArtifacts.length === 0) return;
  if (!initialRouterScreen) return <Text>ERROR! Initial Router Context not got</Text>;
  
  const setInitialScreen = initialRouterScreen[1];

  // --- FUNCTIONS --- //
    const selectInitialObituaryScreen = () => setInitialScreen(Screens.OBITUARY);
  

  // --- STYLED COMPONENTS --- //
  const StyledImage = styled.Image`
    width: ${width * 0.7};
    height: ${width * 0.7};
  `;

  const StyledAbsoluteRosettePosition = styled.View`
    position: absolute;
    top: ${height * 0.78};
    left: ${width * 0.5};
  `;

  const RelativePositionedObituatyButton = styled.View`
    width: ${width * 0.2};
    height: ${width * 0.2}; 
    position: absolute;
    top: 50%;
    left: 50%;
  `;

  const StyledRelativeRosettePositionSoBeInTheMiddle = styled.View`
    position: relative;
    top: -50%;
    left: -50%;
  `;

    const dropShadowStyles = {
    shadowColor: 'rgba(255, 251, 35, 1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 6,
  }


  // --- EFFECTS --- //
  useEffect(() => {
    console.log('object');
    console.log("activated artifacts:", activatedArtifacts);
  }, []);

  return (
    <>
      <StyledAbsoluteRosettePosition>
        <StyledRelativeRosettePositionSoBeInTheMiddle>
          <DropShadow style={dropShadowStyles}>
            <StyledImage source={Images.ROSETTE} resizeMode='center'/>
            {
              activatedArtifacts.map((artifact, i) => {
                return <ArtifactImage key={i} image={swampArtifactIcons[artifact.icon]} pos={artifactsInRosettePositionsPercents[i]} />
              })
            }
          </DropShadow>
          <RelativePositionedObituatyButton>
            <StyledRelativeRosettePositionSoBeInTheMiddle>
              <IconButton
                width={width * 0.2}
                height={width * 0.2}
                xPos={0}
                yPos={0}
                hasBorder={true}
                backgroundImage={Images.OBITUARY_ICON}
                backgrounOpacity={1}
                buttonOnPress={selectInitialObituaryScreen}
                hasBrightness={true}
              />
            </StyledRelativeRosettePositionSoBeInTheMiddle>
          </RelativePositionedObituatyButton>
          
        </StyledRelativeRosettePositionSoBeInTheMiddle>
      </StyledAbsoluteRosettePosition>
    </>
  );

};