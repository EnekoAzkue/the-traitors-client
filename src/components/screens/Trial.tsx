import React, { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Images, Roles, SocketClientToServerEvents, SocketServerToClientEvents } from "../../helpers/constants/constants";
import ScreenContainer from "./ScreenContainer";
import styled from "styled-components/native";
import Button from "../Button";
import { useUserStore } from "../../helpers/stores/useUserStore";
import { socket } from "../../helpers/socket/socket";
import { useInnocentStore } from "../../helpers/stores/useInnocentStore";
import { useGuiltyStore } from "../../helpers/stores/useGuiltyStore";
import { useTrialStore } from "../../helpers/stores/useTrialStore";

function Trial() {
  const [isVoted, setIsVoted] = useState<boolean>(false)
  const { isTrialActive, setTrialActive } = useTrialStore(state => state)
  let { innocentVotes, setInnocentVotes, incrementInnocentVotes, resetInnocentVotes } = useInnocentStore(state => state)
  let { guiltyVotes, setGuiltyVotes, incrementGuiltyVotes, resetGuiltyVotes } = useGuiltyStore(state => state)
  const [endTrialText, setEndTrialText] = useState<string>('Reset trial')

  const user = useUserStore(state => state.user)

  const { width, height } = useWindowDimensions()

  useEffect(() => {


    socket.on(SocketServerToClientEvents.VOTATION, (vote: boolean) => {
      console.log('vote received')

      if (vote) {
        incrementInnocentVotes()
      } else {
        incrementGuiltyVotes()
      }
    })

    socket.on(SocketServerToClientEvents.TRIAL_RESETED, () => {
      resetGuiltyVotes()
      resetInnocentVotes()
      setIsVoted(false)
    })

    return (() => {
      socket.off(SocketServerToClientEvents.VOTATION);
      socket.off(SocketServerToClientEvents.TRIAL_RESETED);
    })
  }, [])

  useEffect(() => {
    console.log(innocentVotes, '/', guiltyVotes)
    console.log('votes changed')
    if (innocentVotes !== guiltyVotes) {
      setEndTrialText('End trial')
    }
  }, [innocentVotes, guiltyVotes])

  const vote = (vote: boolean) => {
    socket.emit(SocketClientToServerEvents.VOTE, vote)
    setIsVoted(true)
  }

  const endTrial = () => {
    if (innocentVotes > guiltyVotes) {
      setTrialActive(false)
      socket.emit(SocketClientToServerEvents.RELEASE_ANGELO)
    } else if (innocentVotes < guiltyVotes) {
      setTrialActive(false)
    } else {
      socket.emit(SocketClientToServerEvents.RESET_TRIAL)
    }
  }



  const ButtonContainer = styled.View`
    width: ${width * 0.5};
    height: ${height};
    border: 
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
    top: ${height * 0.15};
    position: absolute;
  `
  const ResultText = styled.Text`
    color: white;
    font-family: KochAltschrift;
    font-size: ${Math.min(width * 0.5, 60)}px;
    top: ${height * 0.3};
    position: absolute;
  `

  return (
    <ScreenContainer backgroundImg={Images.TRIAL}>
      {user?.rol !== Roles.MORTIMER ?
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          {!isVoted ?
            <>
              <ButtonContainer>
                <Button buttonText="Guilty" onPress={() => { vote(false) }} />
              </ButtonContainer>
              <ButtonContainer>
                <Button buttonText="Innocent" onPress={() => { vote(true) }} />
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
            {isTrialActive &&
              <>
                {innocentVotes > guiltyVotes &&
                  <>
                    <ResultText>Innocent</ResultText>
                    <VoteImage source={Images.VOTE} />
                  </>
                }
                {innocentVotes === guiltyVotes &&
                  <>
                    <ResultText>Draw</ResultText>
                    <VoteImage style={{ transform: [{ rotate: '-90deg' }] }} source={Images.VOTE} />
                  </>
                }
                {innocentVotes < guiltyVotes &&
                  <>
                    <ResultText>Guilty</ResultText>
                    <VoteImage style={{ transform: [{ rotate: '180deg' }] }} source={Images.VOTE} />
                  </>
                }
                <Button buttonText={`${endTrialText}`} onPress={endTrial} />

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