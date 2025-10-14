import { useEffect, useState } from "react";
import { Text } from "react-native/";
import Login from "./screens/Login";
import Main from "./Main";
import Splash from "./screens/Splash";

function App() {

  const [user, setUser] = useState<any>(null);


  useEffect((() => {
    console.log("Hello")
  }), []);

  return (
    <>
      {
        !user ?
        <>
          <Login/>
        </>
        :
        <>
          <Main/>
        </>

      }
    </>
  );
}

export default App;