import Button from "../Button";
import SwampContainer from "./SwampContainer";
import styled from "styled-components/native";
import MapView, { Marker } from 'react-native-maps';
import { socket } from "../../helpers/socket/socket";
import InventoryContainer from "../InventoryContainer";
import Artifact from "../../helpers/interfaces/Artifact";
import { Image, PermissionsAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useUserStore } from "../../helpers/stores/useUserStore";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { GeolacationCoords } from "../../helpers/interfaces/Geolocation";
import { useArtifactsStore } from "../../helpers/stores/useArtifactStore";
import { useCollectionStore } from "../../helpers/stores/useCollectionStore";
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { useActivatedArtifactStore } from "../../helpers/stores/useActivatedArtifactStore";
import { InventoryContext, IstvanInitialScreenContext, MortimerInitialScreenContext, VillainInitialScreenContext } from "../../helpers/contexts/contexts";
import { Images, Roles, Screens, SocketClientToServerEvents, SocketServerToClientEvents, swampArtifactCoordinates, swampArtifactIcons } from "../../helpers/constants/constants";

function Swamp() {
  // --- STATES, STORES && CONSTANTS --- //

  const { artifacts, setArtifacts } = useArtifactsStore(state => state);
  const setAreAllArtifactsCollected = useCollectionStore(state => state.setAreAllArtifactsCollected)

  const user = useUserStore(state => state.user);
  const { width, height } = useWindowDimensions();
  const [currentPosition, setCurrentPosition] = useState<GeolocationResponse | null>(null);
  const [acolytesInSwamp, setAcolytesInSwamp] = useState<KaotikaPlayer[]>([]);
  const [acolytesInSwampCoords, setAcolytesInSwampCoords] = useState<{ email: string, coords: GeolacationCoords }[]>([]);
  const [animatedPosition, setAnimatedPosition] = useState({ latitude: 0, longitude: 0 });
  const [nearArtifacts, setNearArtifacts] = useState<{ [name: string]: boolean }>({});
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);
  
  const {activatedArtifacts, setActivatedArtifacts} = useActivatedArtifactStore( state => state );

  const mortimerInitialScreenContext = useContext(MortimerInitialScreenContext);
  const istvanInitialScreenContext = useContext(IstvanInitialScreenContext);
  const villainInitialScreenContext = useContext(VillainInitialScreenContext);


  if (!user) return;
  if (!mortimerInitialScreenContext) return;
  if (!istvanInitialScreenContext) return;
  if (!villainInitialScreenContext) return;

  const setMortimerInitialScreen = mortimerInitialScreenContext[1];
  const setIstvanInitialScreen = istvanInitialScreenContext[1];
  const setVillainInitialScreen = villainInitialScreenContext[1];

  if (!user) return;

  // --- FUNCTIONS --- //
  async function requestPermission() {
    const fine = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    return (fine === PermissionsAndroid.RESULTS.GRANTED);
  }

  function setActiveArtifacts(artifacts: Artifact[]) {
    const activatedArtifacts = artifacts.filter(a => a.state === "active" || a.state === "collected");
    setActivatedArtifacts(activatedArtifacts);
    return activatedArtifacts
  }

  function setCollectedArtifacts(artifact: Artifact[]) {
    const collectedArtifacts = artifacts.filter(a => a.state === 'collected');
    if (collectedArtifacts.length === 4) {
      setAreAllArtifactsCollected(true)
    }
  }

  // --- EFFECTS --- // 
  useEffect(() => {

    switch (user.rol) {

      case (Roles.MORTIMER):
        socket.emit(SocketClientToServerEvents.MORTIMER_IN_HALL, false)
        setMortimerInitialScreen(Screens.SWAMP);
        break;

      case (Roles.ISTVAN):
        setIstvanInitialScreen(Screens.SWAMP);
        break;

      case (Roles.VILLAIN):
        setVillainInitialScreen(Screens.SWAMP);
        break;

    }

    let requestInSwampInterval: NodeJS.Timeout | undefined;

    async function getMyLocationAsAcolyte(user: KaotikaPlayer) {

      if (user.rol !== Roles.ACOLYTE) return;

      const granted = await requestPermission();
      if (!granted) {
        return;
      }

      Geolocation.getCurrentPosition(
        info => {
          socket.emit(SocketClientToServerEvents.SEND_ACOLYTES_COORDS, { email: user.email, coords: info.coords }); 
          console.log('sending initial coords to server as acolyte', info.coords);
          setCurrentPosition(info)

        },
      );

    };

    if (user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER) {

      socket.emit(SocketClientToServerEvents.REQUEST_ARTIFACTS, user.rol);

      socket.on(SocketServerToClientEvents.SENDING_ARTIFACTS, (artifacts) => {
        setArtifacts(artifacts)
      })

      socket.on(SocketServerToClientEvents.COLLECTED, () => {
        socket.emit(SocketClientToServerEvents.REQUEST_ARTIFACTS, user.rol)
      })

    }

    // Solicitar al servidor los acóltos que estén dentro de Swamp y se queda escuchando para que se actualice: 
    // -- La posicion del los acolitos.
    // -- La llegada de nuevos acólitos al pantano 
    // -- La salida de nuevos acólitos al pantano
    // Todo en tiempo real.

    // --- GESTIÓN DE LOS EVENTOS SOCKET TRATADOS EN ESTE COMPONENTE --- //
    if (user.rol === Roles.MORTIMER || user.rol === Roles.ISTVAN || user.rol === Roles.VILLAIN) {

      requestInSwampInterval = setInterval(() => { console.log("Sending to server request for swamp acolytes"); socket.emit(SocketClientToServerEvents.REQUEST_SWAMP_ACOLYTES); }, 1000);

      socket.on(SocketServerToClientEvents.GET_IN_SWAMP_ACOLYTES, (acolytes) => {
        console.log("GET ACOLYTES IN SWAMP: ");
        console.log(acolytes);
        setAcolytesInSwamp(acolytes);
      });

    }

    socket.on(SocketServerToClientEvents.GET_ACOLYTE_NEW_COORDS, (newCoords) => {
      setAcolytesInSwampCoords(prev => {

        console.log("PREV:", prev);

        const exists = prev.find(acolyte => acolyte.email === newCoords.email);

        if (!exists) {
          return [...prev, newCoords];
        }

        return prev.map(acolyte =>
          acolyte.email === newCoords.email ? { ...acolyte, coords: newCoords.coords } : acolyte
        );
      });
    });



    getMyLocationAsAcolyte(user);

    return () => {

      if (user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER) {
        socket.off(SocketServerToClientEvents.SENDING_ARTIFACTS);
        socket.off(SocketServerToClientEvents.COLLECTED);
      }

      if (user.rol === Roles.MORTIMER || user.rol === Roles.ISTVAN || user.rol === Roles.VILLAIN) {
        socket.off(SocketServerToClientEvents.GET_IN_SWAMP_ACOLYTES);
        if (requestInSwampInterval) clearInterval(requestInSwampInterval);
      }

    };

  }, []);

  useEffect(() => {
    setActiveArtifacts(artifacts)
    setCollectedArtifacts(artifacts)
  }, [artifacts]);

  useEffect(() => {
    if (!currentPosition) return;

    setAnimatedPosition({
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude,
    });
  }, [currentPosition]);

  useEffect(() => {
    const MIN_ACCURACY = 50; 

    const watchId = Geolocation.watchPosition(
      (info) => {
        if (info.coords.accuracy > MIN_ACCURACY) {
          console.log("Descartada por mala precisión:", info.coords.accuracy);
          return;
        }

        socket.emit(SocketClientToServerEvents.SEND_ACOLYTES_COORDS, { email: user.email, coords: info.coords }); 
        console.log('sending live coords to server as acolyte', info.coords);

        setCurrentPosition(info);
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 1000,
        fastestInterval: 1000,
      }
    );


    return () => {

      Geolocation.clearWatch(watchId);
    };

  }, []);

  useEffect(() => {
    checkDistanceWithArtifacts()
  }, [currentPosition]);


  useEffect(() => {
    checkDistanceWithArtifacts()
  }, [activatedArtifacts]);

  const checkDistanceWithArtifacts = () => {
    const updated = { ...nearArtifacts };
    if (!currentPosition) return

    activatedArtifacts.forEach((artifact, i) => {
      if (artifact.state !== 'active') return;

      const distance = getDistanceFromLatLonInMeters(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude,
        swampArtifactCoordinates[i].latitude,
        swampArtifactCoordinates[i].longitude
      );

      updated[artifact.name] = distance <= 1;

    });
    setNearArtifacts(updated);
  }


  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFill,
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

  const mapRegion = {
    latitude: 43.309504,
    longitude: -2.001994,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const collectArtifact = (artifact: Artifact) => {
    socket.emit(SocketClientToServerEvents.COLLECT, artifact.name)
  }

  const getInventory = () => {
    if ((user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER) && isInventoryOpen) return (<InventoryContainer artifacts={activatedArtifacts} />);
    return (<></>);
  }

  // --- STYLED COMPONENTS --- // 
  const StyledCollectButtonContainer = styled.View`
    width: ${width};
    position: relative;
    top: ${-height * 0.24};
    justify-content: center;
    align-items: center;
  `;

  const StyledArtifactImage = styled.Image`
    width: ${width * 0.04};
    height: ${width * 0.04};
    border-radius: ${height}px;
  `;

  return (
    <>
      <InventoryContext.Provider value={[isInventoryOpen, setIsInventoryOpen]}>

        <SwampContainer user={user}>

          {getInventory()}
          <View style={styles.container}>
            <MapView provider={"google"} style={styles.map} region={mapRegion} rotateEnabled={false} showsCompass={false} showsPointsOfInterests={false}>
              {
                /* Players own ubication Marker */
                currentPosition &&
                <Marker
                  coordinate={{ latitude: animatedPosition.latitude, longitude: animatedPosition.longitude }}
                  title={user.nickname}
                >
                  {/* Añadir estilos con react-native-maps es mejor no usar styled components ya que no lo recoge bien */}
                  <View style={{ width: width * 0.1, height: width * 0.1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      source={Images.AVATAR_CONTAINER}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                      resizeMode="contain"
                    />

                    <Image
                      source={{ uri: user.avatar }}
                      style={{
                        width: '47%',
                        height: '47%',
                        borderRadius: (width * 0.1 * 0.47) / 2,
                        position: 'relative'
                      }}
                      resizeMode="cover"
                    />
                  </View>

                </Marker>
              }
              <>
                {
                  /*  */
                  activatedArtifacts.map((a, i) => {
                    if (a.state === 'active') {
                      return (
                        <Marker
                          key={i}
                          coordinate={{ latitude: swampArtifactCoordinates[i].latitude, longitude: swampArtifactCoordinates[i].longitude }}
                          title={a.name}
                        >
                          <StyledArtifactImage
                            source={swampArtifactIcons[a.icon]}
                            resizeMode="contain"
                          />
                        </Marker>
                      )
                    }
                  })}
              </>

              {
                (user.rol === Roles.MORTIMER || user.rol === Roles.ISTVAN || user.rol === Roles.VILLAIN) ?
                  acolytesInSwamp.map((acolyte, index) => {

                    return <Marker
                      key={index}
                      coordinate={{ latitude: acolytesInSwampCoords[index].coords.latitude, longitude: acolytesInSwampCoords[index].coords.longitude }}
                      image={{ uri: `${acolyte.avatar}` }}
                      title={acolyte.name}
                    />

                  })
                  : <></>
              }
            </MapView>

            <StyledCollectButtonContainer >
              {activatedArtifacts.map((artifact, j) =>
                nearArtifacts[artifact.name] && artifact.state === 'active' ? (

                  <Button key={j} buttonText={`Collect artifact`} onPress={() => { collectArtifact(artifact) }} />
                ) : null
              )}
            </StyledCollectButtonContainer>
          </View>
        </SwampContainer>

      </InventoryContext.Provider>

    </>
  );

}

export default Swamp;