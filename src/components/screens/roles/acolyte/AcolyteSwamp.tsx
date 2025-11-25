import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { UserContext } from "../../../../helpers/contexts/contexts";
import IconButton from "../../IconButton";
import { PermissionsAndroid } from "react-native";
import AcolyteSwampContainer from "./AcolyteSwampContainer";

async function requestPermission() {
  const fine = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  return (
    fine === PermissionsAndroid.RESULTS.GRANTED);
}



function AcolyteSwamp() {
  const artifact1 = {
    latitude: 43.310625,
    longitude: -2.003209,
    image: require('../../../../assets/artifactImages/Dragon_heart_icon.png'),
    title: 'Dragon heart'
  }  
  const artifact2 = {
    latitude: 43.310673,
    longitude: -2.002441,
    image: require('../../../../assets/artifactImages/Hubris_icon.png'),
    title: 'Hubris',
  }  
  const artifact3 = {
    latitude: 43.309534,
    longitude: -2.002030,
        image: require('../../../../assets/artifactImages/Jak_sho_icon.png'),
    title: "Jak'sho",
  }  
  const artifact4 = {
    latitude: 43.309801,
    longitude: -2.003381,
        image: require('../../../../assets/artifactImages/Phantom_dancer_icon.png'),
    title: 'Phantom Dancer',
  }


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
      height: 850,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFill,
    },
  });

  return (
    <>
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
            <>
              <Marker
                coordinate={{ latitude: currentPosition?.coords.latitude, longitude: currentPosition?.coords.longitude }}
                image={{ uri: `${user.avatar}`}}
                title={user.nickname}
                />
              <Marker
                coordinate={{ latitude: artifact1.latitude, longitude: artifact1.longitude}}
                image={artifact1.image}
                title={artifact1.title}
              />
              <Marker
                coordinate={{ latitude: artifact2.latitude, longitude: artifact2.longitude}}
                image={artifact2.image}
                title={artifact2.title}
              />
              <Marker
                coordinate={{ latitude: artifact3.latitude, longitude: artifact3.longitude}}
                image={artifact3.image}
                title={artifact3.title}
              />
              <Marker
                coordinate={{ latitude: artifact4.latitude, longitude: artifact4.longitude}}
                image={artifact4.image}
                title={artifact4.title}
              />
            </>

          }
        </MapView>

      </View>
      <AcolyteSwampContainer>
      </AcolyteSwampContainer>
    </>
  );

}

export default AcolyteSwamp;