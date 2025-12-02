import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import AcolyteTowerContainer from "./roles/acolyte/AcolyteTowerContainer";
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { CollectionContext, InventoryContext, UserContext } from "../../helpers/contexts/contexts";
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

  ]


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
    if (user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER) {
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
      if (user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER) {
        socket.off(SocketServerToClientEvents.SENDING_ARTIFACTS);
        socket.off(SocketServerToClientEvents.COLLECTED);
      }
    };

  }, []);

  useEffect(() => {
    // Filter for only activated artifacts
    const activatedArtifacts = artifacts.filter(a => a.state === "active" || a.state === "collected");
    const collectedArtifacts = artifacts.filter(a => a.state === 'collected')
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

  return (
    <>
      <InventoryContext.Provider value={[isInventoryOpen, setIsInventoryOpen]}>
        <CollectionContext.Provider value={[areAllArtifactsCollected, setAreAllArtifactsCollected]}>

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
        </CollectionContext.Provider>

      </InventoryContext.Provider>

    </>
  );

}

export default Swamp;