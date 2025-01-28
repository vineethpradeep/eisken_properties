import HomeTourVideo from "../../components/homeTourVideo/HomeTourVideo";
import HowItWorks from "../../components/howItWorks/HowItWorks";
import OurService from "../../components/ourService/OurService";
import PropertiesGallery from "../../components/propertiesGallery/PropertiesGallery";
import Testimonials from "../../components/testimonials/Testimonials";
import WhyChooseUs from "../../components/whyChooseUs/WhyChooseUs";

const HomePage = () => {
  return (
    <>
      <HomeTourVideo />
      <OurService />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <PropertiesGallery />
    </>
  );
};

export default HomePage;
