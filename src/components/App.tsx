import { useState } from "react";
import Home from "../components/screens/Home";
import Login from "./screens/Login";

function App() {

  const [user, setUser] = useState(null);
  // const [] = useState();

  return (
    <>
      {(!user) ?
        <>
          <Login />
        </>
        :
        <>
          <Home />
        </>
      }
    </>
  );
}

export default App;