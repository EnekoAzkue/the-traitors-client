import KaotikaPlayer from "../KaotikaPlayer";

export interface LoginProps {
    setUser: (user: KaotikaPlayer | null) => void;
    setModalMessage: (message: string) => void;
    setIsLoading: (isLoading: boolean) => void;
};