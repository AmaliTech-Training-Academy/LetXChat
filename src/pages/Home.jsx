import React from "react";
import BodyContent from "../components/Landing-Page/BodyContent";
import HomeBanner from "../components/Landing-Page/HomeBanner";
import Navbar from "../components/Landing-Page/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <HomeBanner />
      <BodyContent />
    </div>
  );
}

export default Home;
