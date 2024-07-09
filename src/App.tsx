import "./App.css";
import { Header } from "./Components/Header/Header";
import json from "../public/TimeLineData.json";
import { TimeLine } from "./Components/TimeLine/TimeLine";
import { AllRelease } from "./Components/AllRelease/AllRelease";
import { useState } from "react";
function App() {
  const [releaseSelected, setreleaseSelected] = useState<number>(0);
  return (
    <>
      <Header />
      <div className="MainContainer">
        <TimeLine release={json.release[releaseSelected]} />
        <AllRelease
          setSelected={setreleaseSelected}
          selected={releaseSelected}
        />
      </div>
    </>
  );
}

export default App;
