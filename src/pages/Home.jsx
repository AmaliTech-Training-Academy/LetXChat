import React from "react";
import BodyContent from "../components/Landing-Page/BodyContent";
import Footer from "../components/Landing-Page/Footer";
import HomeBanner from "../components/Landing-Page/HomeBanner";
import Navbar from "../components/Landing-Page/Navbar";
import Newsletter from "../components/Landing-Page/Newsletter";

function Home() {
  return (
      <div>
        <HomeBanner />
        <BodyContent />
        <Newsletter />
        <Footer />
      </div>
  );
}

export default Home;
