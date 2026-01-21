import React, { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Images, Roles } from "../../helpers/constants/constants";
import ScreenContainer from "./ScreenContainer";
import styled from "styled-components/native";
import Button from "../Button";
import { useUserStore } from "../../helpers/stores/useUserStore";

function Trial() {
  const [isVoted, setIsVoted] = useState<boolean>(false)
  const [isTrialActive, setTrialActive] = useState<boolean>(false)
  const [innocentVotes, setInnocentVotes] = useState<number>(1)
  const [guiltyVotes, setGuitlyVotes] = useState<number>(0)

  const user = useUserStore(state => state.user)

  const { width, height } = useWindowDimensions()

  const vote = () => {
    setIsVoted(true)
  }

  const startTrial = () => {
    setTrialActive(true)
  }

  const ButtonContainer = styled.View`
    width: ${width * 0.5};
    height: ${height};
  `

  const Text = styled.Text`
    color: white;
    font-family: KochAltschrift;
    font-size: ${Math.min(width * 0.5, 60)}px;
    top: ${height * 0.8};
    position: absolute;
  `

  const AngeloContainer = styled.View`
    position: absolute;
    width: ${width * 0.2};
    height: ${width * 0.2};
    top: ${height * 0.43};
    left: ${width * 0.4};
    align-items: center;
    justify-content: center;
  `

  const AvatarContainer = styled.View`
    position: absolute;
    width: ${width};
    height: ${height};
  `
  const Avatar = styled.Image`
    width: ${width * 0.2};
    height: ${width * 0.2};  
    border-radius: 50px;
  `

  const SecondaryAvatar = styled.Image`
    width: ${width * 0.1};
    height: ${width * 0.1};  
    border-radius: 50px;
  `

  const MortimerContainer = styled.View`
    position: absolute;
    width: ${width * 0.2};
    height: ${width * 0.2};
    top: ${height * 0.05};
    left: ${width * 0.4};
    align-items: center;
    justify-content: center;
  `

  const VillainsContainer = styled.View`
    position: absolute;
    width: ${width * 0.2};
    height: ${width * 0.2};
    top: ${height * 0.25};
    left: ${width * 0.8};
    align-items: center;
    justify-content: center;
  `
  const VoteImage = styled.Image`
    width: ${width * 0.3};
    height: ${width * 0.3};
    top: ${height * 0.65};
    position: absolute;
  `

  return (
    <ScreenContainer backgroundImg={Images.TRIAL}>
      {user?.rol !== Roles.MORTIMER ?
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          {!isVoted ?
            <>
              <ButtonContainer>
                <Button buttonText="Guilty" onPress={vote} />
              </ButtonContainer>
              <ButtonContainer>
                <Button buttonText="Innocent" onPress={vote} />
              </ButtonContainer>
            </> :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Vote sent</Text>
            </View>
          }
        </View>
        :
        <>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!isTrialActive ?
              <>
                <Button buttonText="Start trial" onPress={startTrial} />
              </>
              :
              <>
                {innocentVotes > guiltyVotes && 
                <>
                <Text>Innocent</Text>
                <VoteImage source={Images.VOTE} />
                </>
                }
                {innocentVotes === guiltyVotes && 
                <>
                <Text>Draw</Text>
                <VoteImage style={{transform: [{rotate: '-90deg'}]}} source={Images.VOTE} />
                </>                
                }
                {innocentVotes < guiltyVotes && 
                <>
                <Text>Guilty</Text>
                <VoteImage style={{transform: [{rotate: '180deg'}]}} source={Images.VOTE} />
                </>
              }

              </>
            }
          </View>
        </>
      }

      <AvatarContainer>
        <AngeloContainer>
          <Avatar source={Images.ANGELO_AVATAR} />
        </AngeloContainer>

        <MortimerContainer>
          <Avatar source={Images.MORTIMER_AVATAR} />
        </MortimerContainer>

        <VillainsContainer>
          <SecondaryAvatar source={Images.ISTVAN_AVATAR} />
          <SecondaryAvatar source={Images.VILLAIN_AVATAR} />

        </VillainsContainer>

      </AvatarContainer>
    </ScreenContainer>
  );
}

export default Trial;