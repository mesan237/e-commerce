import { ProductCarousel } from "./ProductCaroussel";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex gap-0.5">
      {/* <div className="relative bg-gradient-to-tl from-[#a4b7be] from-50% via-transparent via-60% to-[#d4e1e3] to-85%  bg-bottom bg-no-repeat bg-fixed h-[calc(100vh_-_9rem)] -ml-8 rounded-md mb-0 mr-0 p-8 flex-1"> */}
      <div className="relative bg-blend-color-burn bg-cover bg-black/25 bg-hero-ardu bg-top bg-no-repeat bg-fixed h-[calc(100vh_-_9rem)] -m-8 rounded-md mb-0 p-8 flex-1">
        <div className="w-full h-full flex justify-center">
          <div>
            <div className="h1 items-center mb-6">
              Explore our <br />
              wide range of <br />
              IoT components
            </div>
            <Button className="rounded-full px-8 bg-orange-600/90">
              Shop now
            </Button>
          </div>
          <div className="self-end justify-self-end">
            {/* <ProductCarousel className=" " /> */}
          </div>
        </div>
        {/* <div className="absolute top-0 right-0 bg-hero-rasp bg-center bg-no-repeat bg-[length:60rem_500px] h-full w-3/5"></div> */}
      </div>
      {/* <div className="items-self -mr-8">
        </div> */}
    </div>
  );
};

export default Hero;
