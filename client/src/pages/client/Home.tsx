import React from "react";
import CarouselHeader from "../../components/CarouselHeader";
import Footer from "../../components/Footer";
import Help from "../../components/Help";
import ImageGrid from "../../components/ImageGrid";
import Join from "../../components/Join";
import NewsContainer from "../../components/NewsContainer";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import Services from "../../components/Services";
import TopFooter from "../../components/TopFooter";

const Home: React.FC = () => {
  return (
    <>
      <ResponsiveNavbar />

      <CarouselHeader />
      <Services />
      <ImageGrid />
      <NewsContainer />
      <Help />

      <Join />
      <TopFooter />
      <Footer />
    </>
  );
};

export default Home;
