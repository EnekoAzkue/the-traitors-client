interface Artifact {
    name: string,
    coordenates: Coordenates,
    image: any,
    icon: any,
    state: string,
}

interface Coordenates {
    latitude: number,
    longitude: number
}

export default Artifact