import React from 'react'
import ResponsiveNavbar from '../../features/client/components/ResponsiveNavbar';
import CarouselHeader from '../../features/client/components/CarouselHeader';
import ImageGrid from '../../features/client/components/ImageGrid';
import NewsContainer from '../../features/client/components/NewsContainer';
import Services from '../../features/client/components/Services';
import Help from '../../features/client/components/Help';
import Join from '../../features/client/components/Join';
import TopFooter from '../../features/client/components/TopFooter';



const Home:React.FC = ()=>{
 


    return (
        <>
     
        <ResponsiveNavbar/>
 
      <CarouselHeader/>
        <Services/>
        <ImageGrid/>
        <NewsContainer/>
        <Help/>

        <Join/>
        <TopFooter/>
        
        </>
    )
}

export default Home;