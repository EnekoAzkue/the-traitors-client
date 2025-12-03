import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { CollectionContext, InventoryContext } from "../../helpers/contexts/contexts";
import { PermissionsAndroid } from "react-native";
import SwampContainer from "./SwampContainer";
import InventoryContainer from "./roles/acolyte/InventoryContainer";
import { Roles, SocketClientToServerEvents, SocketServerToClientEvents, swampArtifactCoordinates, swampArtifactIcons } from "../../helpers/constants/constants";
import Button from "../Button";
import { socket } from "../../helpers/socket/socket";
import Artifact from "../../helpers/interfaces/Artifact";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";
import { useUserStore } from "../../helpers/stores/useUserStore";

async function requestPermission() {
  const fine = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  return (
    fine === PermissionsAndroid.RESULTS.GRANTED);
}

function Swamp() {

  const collectionContext = useContext(CollectionContext)
  
  if (!collectionContext) return

  const setAreAllArtifactsCollected = collectionContext[1]

  // --- STATES, STORES && CONSTANTS --- //
  const [currentPosition, setCurrentPosition] = useState<GeolocationResponse | null>(null);
  const [acolytesInSwamp, setAcolytesInSwamp] = useState<KaotikaPlayer[]>([]); 
  const [animatedPosition, setAnimatedPosition] = useState({ latitude: 0, longitude: 0 });
  const [nearArtifacts, setNearArtifacts] = useState<{ [name: string]: boolean }>({});
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [activatedArtifacts, setActivatedArtifacts] = useState<Artifact[]>([]);
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);
  const user = useUserStore( state => state.user );
  const { width, height } = useWindowDimensions(); 
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

  // --- EFFECTS --- // 
  useEffect(() => {
    
    let requestInSwampInterval : number | undefined;

    async function getMyLocationAsAcolyte(user: KaotikaPlayer) {

      // Solo si se es Acolito se debe recibir la ubicación actual
      if (user.rol !== Roles.ACOLYTE) return;

      const granted = await requestPermission();
      if (!granted) {
        // console.log("Permiso NO otorgado");
        return;
      }

      Geolocation.getCurrentPosition(
        info => {
          setCurrentPosition(info)

          // console.log("POSICIÓN:", info.coords.latitude, "", info.coords.longitude);
        },
      );

    }

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

    if ( user.rol === Roles.MORTIMER || user.rol === Roles.ISTVAN || user.rol === Roles.VILLAIN) {

      // Cada segundo se solicita al server que envie los acólitos que están en el swamp, así el Mortimer, Istvan y Villain saben donde están en tiempo real los acólitos y si entra o sale uno de estos 
      requestInSwampInterval = setInterval ( () => {socket.emit(SocketClientToServerEvents.REQUEST_SWAMP_ACOLYTES)}, 1000); 

      socket.on( SocketServerToClientEvents.GET_IN_SWAMP_ACOLYTES , (acolytes) => {
        setAcolytesInSwamp(acolytes);
      });

    }

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
    const collectedArtifacts = artifacts.filter(a => a.state === 'collected')
    if (collectedArtifacts.length === 4) {
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


    // console.log("watchPosition started");

    return () => {

      Geolocation.clearWatch(watchId);
      // console.log("watchPosition cleared");
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
    // console.log(updated)
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

  return (
    <>
      <InventoryContext.Provider value={[isInventoryOpen, setIsInventoryOpen]}>

        <SwampContainer user={user}>
          {(user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER) ? <InventoryContainer artifacts={activatedArtifacts} /> : <></>}
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
            {activatedArtifacts.map((artifact, j) =>
              nearArtifacts[artifact.name] && artifact.state === 'active' ? (
                <Button key={j} buttonText={`collect artifact`} onPress={() => { collectArtifact(artifact) }} />
              ) : null
            )}
            <Text style={{ zIndex: 1000 }}>Lat: {currentPosition?.coords.latitude} Lon: {currentPosition?.coords.longitude}</Text>

          </View>
        </SwampContainer>

      </InventoryContext.Provider>

    </>
  );

}

export default Swamp;