import React, { useRef, useState } from 'react';
import '../../styles/NewsContainer.css'; // Import the CSS file
import image1 from '../../assets/images/IMG_72672 -2.jpg'
import image2 from '../../assets/images/Austin - Habitat Fall Wall Raising 2024 (All Group Photo).jpg'
import image3 from '../../assets/images/IMG_7526 - cropped.jpg'
import image4 from '../../assets/images/IMG_7550 -2.jpg'
import image5 from '../../assets/images/Austin - Habitat Fall Wall Raising 2024 (All Group Photo).jpg'

import { Col, Row } from 'react-bootstrap';
import Indicator from './Indicator';


const NewsContainer: React.FC = () => {
  const newsRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);




  

  const handleScroll = () => {
    if (newsRef.current) {
      const scrollLeft = newsRef.current.scrollLeft;
      const itemWidth = newsRef.current.scrollWidth / newsItems.length;
      const currentIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(currentIndex);
    }
  };
  const newsItems = [
    { title: 'Amanda Yates Tapped as AVC Payment and Product Management at Great Texas Credit Union', 
      text:`Amanda Yates is the latest addition to the payment team,
      joining the team at Great Texas Credit Union`,
      image:image1 },
    { title: 'Habitat for humanity works with Local Credit Unions to Build fifth house that Credit Unions Built',
      text:`An executive assistant with Austin Independent School District will soon be the owner of the House that Credit Unions Built,
       a collaborative building project with Habitat for Humanity.`,
      image: image2  },

    { title: 'Christiana Gonazales Promoted to Branch Manager of Credit Union', image: image3,
      text:`Gonzales began her career with Greater Texas in 2010 as a member contact service representative working out of the credit union’s Austin Airport location.`
     },
    { title: 'Tyler Rogers promoted to oversee Greater Texas San Antonio Branch', 
      text:`Rogers, who joined Greater Texas in 2016, was promoted from Head Teller at the branch to its manager,
       taking on the tasks of branch operations, member relations, and personnel management.`,
      image: image4  },
    { title: 'Greater Texas Employees support Kids whose sibilings are Battling Cancer',
      text:`Through its Greater Good initiative, a dozen credit union employees volunteered to help ensure campers received a positive sendoff to Camp Grey Dove, 
      which is offered for free through Any Baby Can.`,
      image: image5  },
  
    // Add more items as needed
  ];

  // Helper function to calculate the dynamic date based on index
  const getDynamicDate = (index: number) => {
    const today = new Date();
    today.setDate(today.getDate() - (index + 1) * 7); // Subtract (index + 1) weeks
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  return (
    <div className='mb-5'>
    <div className='px-3'>
  <h3 className='blue-text mt-5 mb-2 w-100'>What's happening?</h3>
  </div>
    <Row ref={newsRef} onScroll={handleScroll} className="news-container mb-4">
  
      {newsItems.map((news, index) => (
        <Col xs={12} md={6} lg={4} key={index} className="news-item">
            
          <img src={news.image} alt={news.title} className="news-image" />
          <p className="text-start">{getDynamicDate(index)}</p> 
      
          <h3 className="text-start">{news.title}</h3>
          <p className="text-start mb-2">{news.text}</p>
          <p className="text-start link">READ FULL ARTICLE</p>
          

        </Col>
      ))}
    </Row>
    <Indicator itemCount={newsItems.length} activeIndex={activeIndex} />
    </div>
  );
};

export default NewsContainer;

