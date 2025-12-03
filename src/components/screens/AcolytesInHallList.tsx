import React from "react";
import styled from "styled-components/native";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";

const Circle = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: rgba(255,255,255,0.1);
  border: 2px solid rgba(0, 144, 171);
`;

const Container = styled.View`
  flex: 1;           
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 20px 0px; 
  flex-direction: row;
  gap: 12px;
`;



const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const CircleImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;


interface AcolytesInHallListProps {
  acolytesInHall: KaotikaPlayer[];
}

const AcolytesInHallList: React.FC<AcolytesInHallListProps> = ({ acolytesInHall }) => {

  console.log('AcolytesInHallList rendering with acolytes:', acolytesInHall[0].avatar);
  const count = acolytesInHall.length;
  if (count === 0) {
    return <Container></Container>;
  }

  return (
    <Container>
      {acolytesInHall.map((acolyte, index) => {
        return (
          <Circle key={index}>
            <CircleImage source={{ uri: acolyte.avatar }} resizeMode="cover" />
          </Circle>
        );
      })}

    </Container>
  );
};



export default AcolytesInHallList;
