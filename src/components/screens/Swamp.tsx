import Button from "../Button";
import SwampContainer from "./SwampContainer";
import { PermissionsAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { socket } from "../../helpers/socket/socket";
import InventoryContainer from "../InventoryContainer";
import Artifact from "../../helpers/interfaces/Artifact";
import { useUserStore } from "../../helpers/stores/useUserStore";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { CollectionContext, InventoryContext } from "../../helpers/contexts/contexts";
import { Roles, SocketClientToServerEvents, SocketServerToClientEvents, swampArtifactCoordinates, swampArtifactIcons } from "../../helpers/constants/constants";
import { GeolacationCoords } from "../../helpers/interfaces/Geolocation";

function Swamp() {
  
  // --- STATES, STORES && CONSTANTS --- //
  const user                                                    = useUserStore(state => state.user);
  const { width, height }                                       = useWindowDimensions();
  const [currentPosition, setCurrentPosition]                   = useState<GeolocationResponse | null>(null);
  const [acolytesInSwamp, setAcolytesInSwamp]                   = useState<KaotikaPlayer[]>([]);
  const [acolytesInSwampCoords, setAcolytesInSwampCoords]       = useState<{ email: string, coords: GeolacationCoords }[]>([]);
  const [animatedPosition, setAnimatedPosition]                 = useState({ latitude: 0, longitude: 0 });
  const [nearArtifacts, setNearArtifacts]                       = useState<{ [name: string]: boolean }>({});
  const [artifacts, setArtifacts]                               = useState<Artifact[]>([]);
  const [activatedArtifacts, setActivatedArtifacts]             = useState<Artifact[]>([]);
  const [isInventoryOpen, setIsInventoryOpen]                   = useState<boolean>(false);
  const [areAllArtifactsCollected, setAreAllArtifactsCollected] = useState<boolean>(false);
  const fakeCoordenates = [
    // { original
    //   latitude: 43.3097,
    //   longitude: -2.0021,
    // },
    {
      latitude: 43.3094074,
      longitude: -2.0019351,
    },
    {
      latitude: 43.3097,
      longitude: -2.0025,
    },
    // {
    //   latitude: 43.3096,
    //   longitude: -2.0023,
    // },
    {
      latitude: 43.3094074,
      longitude: -2.0019351,
    },
    {
      latitude: 43.30967,
      longitude: -2.0023,
    },

  ];

  if (!user) return;

  // --- FUNCTIONS --- //
  async function requestPermission() {
    const fine = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
    return (fine === PermissionsAndroid.RESULTS.GRANTED);
  }

  // --- EFFECTS --- //
  useEffect(() => {

    let requestInSwampInterval: number | undefined;

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

    };

    // Si el rol del usuario que ejecuta la aplicación son mortimer o acolyte se les muestra los artefactos, solo a ellos.
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
      
      // Cada segundo se solicita al server que envie los acólitos que están en el swamp, así el Mortimer, Istvan y Villain saben donde están en tiempo real los acólitos y si entra o sale uno de estos 
      requestInSwampInterval = setInterval(() => { console.log("Sending to server request for swamp acolytes"); socket.emit(SocketClientToServerEvents.REQUEST_SWAMP_ACOLYTES); }, 1000);
      
      socket.on(SocketServerToClientEvents.GET_IN_SWAMP_ACOLYTES, (acolytes) => {
        console.log("GET ACOLYTES IN SWAMP: ");
        console.log(acolytes);
        setAcolytesInSwamp(acolytes);
      });

    }
    
    socket.on(SocketServerToClientEvents.GET_ACOLYTE_NEW_COORDS, (newCoords: {email: string, coords: GeolacationCoords}) => {
      const acolyteCoords = acolytesInSwampCoords.find( (elem) => {elem.email === newCoords.email} );
      console.log(`ACOLYTES COORDS ARRAY: ${acolytesInSwampCoords}`);
      if ( acolyteCoords ){
        const addedNewCords = [...acolytesInSwampCoords, newCoords];
        setAcolytesInSwampCoords(addedNewCords);
      } else {
        const acolyteCoordsModified = [...acolytesInSwampCoords];
        acolyteCoordsModified.map( (item) => { 
          if (item.email === newCoords.email){
            item = {...item, coords: newCoords.coords};
          }
        }); 
        setAcolytesInSwampCoords(acolyteCoordsModified);
      }
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

    // Filter for only activated artifacts
    const activatedArtifacts = artifacts.filter(a => a.state === "active" || a.state === "collected");
    const collectedArtifacts = artifacts.filter(a => a.state === 'collected');
    if (collectedArtifacts.length === 4) {
      console.log("all artifacts collected")
      setAreAllArtifactsCollected(true)
    }
    setActivatedArtifacts(activatedArtifacts);
  }, [artifacts]);

  useEffect(() => {
    if (!currentPosition) return;

    setAnimatedPosition({
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude,
    });
  }, [currentPosition]);

  useEffect(() => {
    const MIN_ACCURACY = 50; // valores con >50 metros los descarto

    const watchId = Geolocation.watchPosition(
      (info) => {
        if (info.coords.accuracy > MIN_ACCURACY) {
          console.log("Descartada por mala precisión:", info.coords.accuracy);
          return;
        }

        socket.emit(SocketClientToServerEvents.SEND_ACOLYTES_COORDS, {email: user.email, coords: info.coords}); // [ {EMAIL, COORDS}, {EMAIL, COORDS}, {EMAIL, COORDS}, ... ]

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

    console.log("watchPosition started");

    return () => {

      Geolocation.clearWatch(watchId);
      console.log("watchPosition cleared");

    };

  }, []);

  useEffect(() => {
    checkDistanceWithArtifacts()
  }, [currentPosition]);


  //Check distance with artifacts at first render
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
        fakeCoordenates[i].latitude,
        fakeCoordenates[i].longitude
      );

      updated[artifact.name] = distance <= 1;
      // console.log(`Distancia a ${artifact.name}: ${distance.toFixed(2)} m`);
      // if(distance <= 10) {
      //   socket.emit(SocketClientToServerEvents.COLLECT, artifact.name)
      // }
    });
    console.log(updated)
    setNearArtifacts(updated);
  }


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
    if (user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER) return (<InventoryContainer artifacts={activatedArtifacts} />);
    return (<></>);
  }

  return (
    <>
      <InventoryContext.Provider value={[isInventoryOpen, setIsInventoryOpen]}>
        <CollectionContext.Provider value={[areAllArtifactsCollected, setAreAllArtifactsCollected]}>
          <SwampContainer user={user}>
            {getInventory()}
            <View style={styles.container}>
              <MapView provider={"google"} style={styles.map} region={mapRegion} rotateEnabled={false} showsCompass={false} showsPointsOfInterests={false}>
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

                { 
                  ( user.rol === Roles.MORTIMER || user.rol === Roles.ISTVAN || user.rol === Roles.VILLAIN ) ? 
                    acolytesInSwamp.map( (acolyte, index) => {

                      return <Marker 
                        key={index}
                        coordinate={{ latitude: acolytesInSwampCoords[index].coords.latitude, longitude: acolytesInSwampCoords[index].coords.longitude }}
                        image={{ uri: `${user.avatar}` }}
                        title={acolyte.name}
                        />

                    }) 
                  : <></> 
                }
              </MapView>
              {activatedArtifacts.map((artifact, j) =>
                nearArtifacts[artifact.name] && artifact.state === 'active' ? (
                  <Button key={j} buttonText={`collect artifact`} onPress={() => { collectArtifact(artifact) }} />
                ) : null
              )}
              <Text style={{ zIndex: 1000 }}>Lat: {currentPosition?.coords.latitude} Lon: {currentPosition?.coords.longitude}</Text>

            </View>
          </SwampContainer>
        </CollectionContext.Provider>
      </InventoryContext.Provider>

    </>
  );

}

export default Swamp;