import { Carousel } from "react-responsive-carousel";
import useProducts from "../Hooks/useProducts";
import CouponCard from "../Pages/Dashboard/CouponCard";
const Coupons = () => {
  const api = "/coupons";
  const key = "coupons";
  const [coupons] = useProducts({ api, key });
  console.log(coupons);

  return (
    <div className="my-16 md:flex">
      <h2 className="text-3xl my-10 text-center font-semibold mx-auto">
        All Coupons <br /> Grab the offers
      </h2>

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
        className="w-1/3 mx-auto"
      >
        {coupons.map((item) => (
          <CouponCard key={item._id} item={item}></CouponCard>
        ))}
      </Carousel>
    </div>
  );
};

export default Coupons;
