import React from "react";
import bgImage from "../assets/SunCloud.png";
import SearchBar from "./SearchBar";
import { ParticlesBackground } from "./ParticlesBackground"; // updated import

function Main() {
  return (
    <div className="main-container">
      <div className="background">
        <ParticlesBackground />
        <SearchBar />
        <img className="bgImage" src={bgImage} alt="background" />
      </div>
    </div>
  );
}

export default Main;
