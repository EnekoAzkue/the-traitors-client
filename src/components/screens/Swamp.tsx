import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AcolyteTowerContainer from "./roles/acolyte/AcolyteTowerContainer";
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { InventoryContext, UserContext } from "../../helpers/contexts/contexts";
import IconButton from "./IconButton";
import { PermissionsAndroid } from "react-native";
import SwampContainer from "./SwampContainer";
import InventoryContainer from "./roles/acolyte/InventoryContainer";
import { Images, Roles, SocketClientToServerEvents, SocketServerToClientEvents, swampArtifactCoordinates, swampArtifactIcons } from "../../helpers/constants/constants";
import Button from "../Button";
import { socket } from "../../helpers/socket/socket";
import Artifact from "../../helpers/interfaces/Artifact";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";


async function requestPermission() {
  const fine = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  return (
    fine === PermissionsAndroid.RESULTS.GRANTED);
}



function Swamp() {

  const [currentPosition, setCurrentPosition] = useState<GeolocationResponse | null>(null)
  const [animatedPosition, setAnimatedPosition] = useState({ latitude: 0, longitude: 0 });
  const [nearArtifacts, setNearArtifacts] = useState<{ [name: string]: boolean }>({});
  const [artifacts, setArtifacts] = useState<Artifact[]>([])
  const [activatedArtifacts, setActivatedArtifacts] = useState<Artifact[]>([])

  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);

  const [screen, setScreen] = useState(Dimensions.get("window"));
  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });
    return () => sub.remove();
  }, []);
  const { width, height } = screen;



  const userContext = useContext(UserContext)
  if (!userContext) return;
  const [user] = userContext


  useEffect(() => {
    async function getMyLocationAsAcolyte(user: KaotikaPlayer) {

      // Solo si se es Acolito se debe recibir la ubicación actual
      if (user.rol !== Roles.ACOLYTE) return;

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

    // Si el rol del usuario que ejecuta la aplicación son mortimer o acolyte se les muestra los artefactos, solo a ellos.
    if(user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER){
      socket.emit(SocketClientToServerEvents.REQUEST_ARTIFACTS, user.rol)

      socket.on(SocketServerToClientEvents.SENDING_ARTIFACTS, (artifacts) => {
        setArtifacts(artifacts)
      })

      socket.on(SocketServerToClientEvents.COLLECTED, () => {
        socket.emit(SocketClientToServerEvents.REQUEST_ARTIFACTS, user.rol)
      })

    }


    getMyLocationAsAcolyte(user);


    return () => {
      if(user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER){
        socket.off(SocketServerToClientEvents.SENDING_ARTIFACTS);
        socket.off(SocketServerToClientEvents.COLLECTED);
      }
    };

  }, []);

  useEffect(() => {
    console.log(artifacts);

    // Filter for only activated artifacts
    const activatedArtifacts = artifacts.filter(a => a.state === "active" || a.state === "collected");

    setActivatedArtifacts(activatedArtifacts);
    console.log(activatedArtifacts)
  }, [artifacts]);

  useEffect(() => {
    if (!currentPosition) return;

    setAnimatedPosition({
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude,
    });
  }, [currentPosition]);

  useEffect(() => {

    let interval = null;
    // TODO: Borrar la animacion Hardcodeada y poner el seguimiento en TImepo real del acólito.
    // La posición animada del acólito
    if(user.rol === Roles.ACOLYTE) {
      interval = setInterval(() => {
        setAnimatedPosition(pos => ({
          ...pos,
          latitude: pos.latitude + 0.00001,
        }));
      }, 500);
    }

    return () => {

      if(typeof interval === 'number'){ // Si el rol es el de acolito interval contendrá un number en lugar de null
        clearInterval(interval)};
      }
  }, []);

  useEffect(() => {
    const updated = { ...nearArtifacts };

    activatedArtifacts.forEach((artifact, i) => {
      if (artifact.state !== 'active') return;

      const distance = getDistanceFromLatLonInMeters(
        animatedPosition.latitude,
        animatedPosition.longitude,
        swampArtifactCoordinates[i].latitude,
        swampArtifactCoordinates[i].longitude
      );

      updated[artifact.name] = distance <= 10;
      console.log(`Distancia a ${artifact.name}: ${distance.toFixed(2)} m`);
      if (distance <= 10) {
        socket.emit(SocketClientToServerEvents.COLLECT, artifact.name)
      }
    });

    setNearArtifacts(updated);
  }, [animatedPosition]);


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


  const mapRegion = {
    latitude: 43.309504,
    longitude: -2.001994,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  return (
    <>
      <InventoryContext.Provider value={[isInventoryOpen, setIsInventoryOpen]}>
        <SwampContainer user={user}>
          {(user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER) ? <InventoryContainer artifacts={activatedArtifacts}/> : <></>}
          <View style={styles.container}>
            <MapView
              provider={"google"}
              style={styles.map}
              region={mapRegion}
              rotateEnabled={false}
              showsCompass={false}
              showsPointsOfInterests={false}
            >
              {
                /* Players own ubication Marker */
                currentPosition &&
                <Marker
                  coordinate={{ latitude: animatedPosition.latitude, longitude: animatedPosition.longitude }}
                  image={{ uri: `${user.avatar}` }}
                  title={user.nickname}
                />

              }
              <>
                {
                  /*  */
                  activatedArtifacts.map((a, i) => {
                    if (a.state === 'active') {
                      return (
                        <View key={i}>
                          <Marker 
                            coordinate={{ latitude: swampArtifactCoordinates[i].latitude, longitude: swampArtifactCoordinates[i].longitude }}
                            image={swampArtifactIcons[a.icon]}
                            title={a.name}
                          />
                        </View>
                      )
                    }
                  })}
              </>

            </MapView>

          </View>
        </SwampContainer>
      </InventoryContext.Provider>

    </>
  );

}

export default Swamp;