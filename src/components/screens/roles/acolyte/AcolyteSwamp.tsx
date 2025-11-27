import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { InventoryContext, UserContext } from "../../../../helpers/contexts/contexts";
import IconButton from "../../IconButton";
import { PermissionsAndroid } from "react-native";
import AcolyteSwampContainer from "./AcolyteSwampContainer";
import InventoryContainer from "./InventoryContainer";
import { Images } from "../../../../helpers/constants/constants";
import Button from "../../../Button";


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
      icon: 0,
      state: 'active',
    },
    {
      name: 'Hubris',
      coordenates: {
        latitude: 43.310673,
        longitude: -2.002441,
      },
      image: 'https://wiki.leagueoflegends.com/en-us/images/Hubris_item_HD.png?b4418',
      icon: 1,
      state: 'active',
    },
    {
      name: "Jak'sho",
      coordenates: {
        latitude: 43.309534,
        longitude: -2.002030,
      },
      image: 'https://wiki.leagueoflegends.com/en-us/images/Jak%27Sho%2C_The_Protean_item_HD.png?2ebc2',
      icon: 2,
      state: 'active',
    },
    {
      name: 'Phantom Dancer',
      coordenates: {
        latitude: 43.309801,
        longitude: -2.003381,
      },
      image: 'https://wiki.leagueoflegends.com/en-us/images/Phantom_Dancer_item_HD.png?64a8b',
      icon: 3,
      state: 'active',
    }
  ]

  const icons = [
    Images.DRAGON_HEART_ICON,
    Images.HUBRIS_ICON,
    Images.JAKSHO_ICON,
    Images.PHANTOM_DANCER_ICON,
  ]

  const [currentPosition, setCurrentPosition] = useState<GeolocationResponse | null>(null)
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  const [animatedPosition, setAnimatedPosition] = useState({ latitude: 0, longitude: 0 });
  const [nearArtifacts, setNearArtifacts] = useState<{ [name: string]: boolean }>({});


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

          console.log("POSICIÓN:", info.coords.latitude, "", info.coords.longitude);
        },
      );
    }


    getLocation();

  }, []);

  useEffect(() => {
    if (!currentPosition) return;

    setAnimatedPosition({
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude,
    });
  }, [currentPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPosition(pos => ({
        ...pos,
        latitude: pos.latitude + 0.00001, // incremento animado
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    const updated = { ...nearArtifacts }; // copia del estado actual

    artifacts.forEach((artifact) => {
      if (artifact.state !== 'active') return;

      const distance = getDistanceFromLatLonInMeters(
        animatedPosition.latitude,
        animatedPosition.longitude,
        artifact.coordenates.latitude,
        artifact.coordenates.longitude
      );

      updated[artifact.name] = distance <= 10;
      console.log(`Distancia a ${artifact.name}: ${distance.toFixed(2)} m`);
    });

    setNearArtifacts(updated);
  }, [animatedPosition]);



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

  function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  useEffect(() => {
    if (!currentPosition) return;


  }, [currentPosition]);




  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false)


  return (
    <>
      <InventoryContext.Provider value={[isInventoryOpen, setIsInventoryOpen]}>
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
                  coordinate={{ latitude: animatedPosition.latitude, longitude: animatedPosition.longitude }}
                  image={{ uri: `${user.avatar}` }}
                  title={user.nickname}
                />

              }
              <>
                {artifacts.map((a) => {
                  if (a.state === 'active')
                    return (
                      <>
                        {artifacts.map((artifact) =>
                          nearArtifacts[artifact.name] && (
                            <>
                              <Marker image={require('../../../../assets/images/logos/grab_icon.png')} coordinate={{ latitude: a.coordenates.latitude + 0.0001, longitude: a.coordenates.longitude}} />
                            </>
                          )
                        )}                      <Marker
                          coordinate={{ latitude: a.coordenates.latitude, longitude: a.coordenates.longitude }}
                          image={icons[a.icon]}
                          title={a.name}
                        />
                      </>
                    )
                })}


              </>

            </MapView>

          </View>
        </AcolyteSwampContainer>
      </InventoryContext.Provider>

    </>
  );

}

export default AcolyteSwamp;