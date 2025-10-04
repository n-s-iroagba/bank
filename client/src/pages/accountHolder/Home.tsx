import React from "react";
import CarouselHeader from "../../components/accountHolder/CarouselHeader";
import Footer from "../../components/ui/Footer";
import Help from "../../components/ui/Help";
import ImageGrid from "../../components/ui/ImageGrid";
import Join from "../../components/ui/Join";
import NewsContainer from "../../components/ui/NewsContainer";
import ResponsiveNavbar from "../../components/ui/ResponsiveNavbar";
import Services from "../../components/ui/Services";
import TopFooter from "../../components/ui/TopFooter";

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
