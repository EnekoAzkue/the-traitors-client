import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import MapView, { Marker } from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { UserContext } from "../../../../helpers/contexts/contexts";
import IconButton from "../../../IconButton";
import { PermissionsAndroid } from "react-native";

async function requestPermission() {
  const fine = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  return (
    fine === PermissionsAndroid.RESULTS.GRANTED);
}



function AcolyteSwamp() {
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
              <Marker
                coordinate={{ latitude: currentPosition?.coords.latitude, longitude: currentPosition?.coords.longitude }}
                image={{ uri: `${user.avatar}`}}
                title={user.nickname}

            />    

        }
        </MapView>

      </View>
      <AcolyteTowerContainer>
      </AcolyteTowerContainer>
    </>
  );

}

export default AcolyteSwamp;