interface Artifact {
    name: string,
    coordenates: Coordenates,
    image: string,
    icon: number,
    state: string,
}

interface Coordenates {
    latitude: number,
    longitude: number
}

export default Artifact