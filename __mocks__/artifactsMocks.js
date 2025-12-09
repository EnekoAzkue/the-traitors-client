export const twoActiveTwoCollected = [
    { name: 'a1', state: 'inactive' },
    { name: 'a2', state: 'active' },
    { name: 'a3', state: 'active' },
    { name: 'a4', state: 'collected' },
    { name: 'a5', state: 'collected' },
]

export const fourCollected = [
    { name: 'a1', state: 'inactive' },
    { name: 'a2', state: 'collected' },
    { name: 'a3', state: 'collected' },
    { name: 'a4', state: 'collected' },
    { name: 'a5', state: 'collected' },
]

export const artifactCoords = [
    {latitude: 10, longitude: 10},
    {latitude: 10.00005, longitude: 10},
    {latitude: 9.999995009, longitude: 10.000011},
    {latitude: 10, longitude: 10.000011},
]

export const userCoords = {latitude: 10, longitude: 10.000003, altitude: null, accuracy: 5, altitudeAccuracy: null, heading: null, speed: null};

export function setActiveArtifacts(artifacts) {
    const activatedArtifacts = artifacts.filter(a => a.state === "active" || a.state === "collected");
    return activatedArtifacts
  }

export function setCollectedArtifacts(artifacts) {
    const collectedArtifacts = artifacts.filter(a => a.state === 'collected');
    if (collectedArtifacts.length === 4) {
      return true
    } else return false
  }

  export function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
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