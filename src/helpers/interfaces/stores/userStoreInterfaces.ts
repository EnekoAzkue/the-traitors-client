import KaotikaPlayer from "../KaotikaPlayer";

// const [user, setUser] = useState<KaotikaPlayer | null>(null);
// export const UserContext = createContext<[KaotikaPlayer, (newUser: KaotikaPlayer | null) => void] | null>(null);


export interface UserStore {
  user: KaotikaPlayer | null,
  setUser: (newUser: KaotikaPlayer | null) => void
};