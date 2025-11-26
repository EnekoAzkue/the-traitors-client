import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { UserContext } from "../../../../helpers/contexts/contexts";
import IconButton from "../../IconButton";
import { PermissionsAndroid } from "react-native";
import AcolyteSwampContainer from "./AcolyteSwampContainer";
import InventoryContainer from "./InventoryContainer";


async function requestPermission() {
  const fine = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  return (
    fine === PermissionsAndroid.RESULTS.GRANTED);
}



function AcolyteSwamp() {

  const [screen, setScreen] = useState(Dimensions.get("window"));
  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });
    return () => sub.remove();
  }, []);

  const { width, height } = screen;


  const artifacts = [
    {
      name: 'Dragon heart',
      coordenates: {
        latitude: 43.310625,
        longitude: -2.003209,
      },
      image: 'https://wiki.leagueoflegends.com/en-us/images/Dragonheart_item_HD.png?e7af3',
      icon: require('../../../../assets/artifactImages/Dragon_heart_icon.png'),
      state: 'collected',
    },
    {
      name: 'Hubris',
      coordenates: {
        latitude: 43.310673,
        longitude: -2.002441,
      },
      image: 'https://wiki.leagueoflegends.com/en-us/images/Hubris_item_HD.png?b4418',
      icon: require('../../../../assets/artifactImages/Hubris_icon.png'),
      state: 'collected',
    },
    {
      name: "Jak'sho",
      coordenates: {
        latitude: 43.309534,
        longitude: -2.002030,
      },
      image: 'https://wiki.leagueoflegends.com/en-us/images/Jak%27Sho%2C_The_Protean_item_HD.png?2ebc2',
      icon: require('../../../../assets/artifactImages/Jak_sho_icon.png'),
      state: 'collected',
    },
    {
      name: 'Phantom Dancer',
      coordenates: {
        latitude: 43.309801,
        longitude: -2.003381,
      },
      image: 'https://wiki.leagueoflegends.com/en-us/images/Phantom_Dancer_item_HD.png?64a8b',
      icon: require('../../../../assets/artifactImages/Phantom_dancer_icon.png'),
      state: 'collected',
    }
  ]

  const [currentPosition, setCurrentPosition] = useState<GeolocationResponse | null>(null)
  useEffect(() => {
    async function getLocation() {
      const granted = await requestPermission();
      if (!granted) {
        console.log("Permiso NO otorgado");
        return;
      }

      Geolocation.getCurrentPosition(
        info => {
          setCurrentPosition(info)
          console.log("POSICIÓN:", info.coords);
        },
      );
    }

    getLocation();
  }, []);


  const userContext = useContext(UserContext)
  if (!userContext) return
  const [user] = userContext

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFill,
      //TODO: refactor dimensions in geolocation map
      height: height,
      width: width,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFill,
    },
  });

    const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false)


  return (
    <>
      <AcolyteSwampContainer>
        <InventoryContainer artifacts={artifacts}>
        </InventoryContainer>
        <View style={styles.container}>
          <MapView
            provider={"google"}
            style={styles.map}
            region={{
              latitude: 43.309504,
              longitude: -2.001994,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            rotateEnabled={false}
            showsCompass={false}
            showsPointsOfInterests={false}
          >
            {currentPosition &&
              <Marker
                coordinate={{ latitude: currentPosition?.coords.latitude, longitude: currentPosition?.coords.longitude }}
                image={{ uri: `${user.avatar}` }}
                title={user.nickname}
              />
            }
            <>
              <Marker
                coordinate={{ latitude: artifacts[0].coordenates.latitude, longitude: artifacts[0].coordenates.longitude }}
                image={artifacts[0].icon}
                title={artifacts[0].name}
              />
              <Marker
                coordinate={{ latitude: artifacts[1].coordenates.latitude, longitude: artifacts[1].coordenates.longitude }}
                image={artifacts[1].icon}
                title={artifacts[1].name}
              />
              <Marker
                coordinate={{ latitude: artifacts[2].coordenates.latitude, longitude: artifacts[2].coordenates.longitude }}
                image={artifacts[2].icon}
                title={artifacts[2].name}
              />
              <Marker
                coordinate={{ latitude: artifacts[3].coordenates.latitude, longitude: artifacts[3].coordenates.longitude }}
                image={artifacts[3].icon}
                title={artifacts[3].name}
              />
            </>


          </MapView>

        </View>
      </AcolyteSwampContainer>
    </>
  );

}

export default AcolyteSwamp;