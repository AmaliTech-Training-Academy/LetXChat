import React from "react";
import BodyContent from "../components/Landing-Page/BodyContent";
import HomeBanner from "../components/Landing-Page/HomeBanner";
import Navbar from "../components/Landing-Page/Navbar";
import Newsletter from "../components/Landing-Page/Newsletter";

function Home() {
  return (
    <div>
      <Navbar />
      <HomeBanner />
      <BodyContent />
      <Newsletter />
    </div>
  );
}

export default Home;
