import KaotikaPlayer from "./KaotikaPlayer";


export interface LoginProps {
    setUser: (user: KaotikaPlayer) => void;
    setModalMessage: (message: string) => void;
};