import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "../assets/Banner/b1.jpg";
import img2 from "../assets/Banner/b2.jpg";
import img3 from "../assets/Banner/b3.png";
import img4 from "../assets/Banner/b5.avif";

const Banner = () => {
  return (
    <Carousel
    showArrows={true}

showStatus={true}

showIndicators={true}

infiniteLoop={true}

showThumbs={false}

useKeyboardArrows={true}

autoPlay={true}

stopOnHover={true}

swipeable={true}

dynamicHeight={true}

emulateTouch={true}
transitionTime={500}

    >
      <div >
        <img className="max-h-[100vh]" src={img1} />
      </div>
      <div >
        <img className="max-h-[100vh]" src={img2} />
      </div>
      <div >
        <img className="max-h-[100vh]" src={img3} />
      </div>
      <div >
        <img className="max-h-[100vh]" src={img4} />
      </div>
    </Carousel>
  );
};

export default Banner;
