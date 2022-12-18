import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Slider() {
  return (
    <section>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src="/images/slider-1.jpeg" alt="1" />
        </div>
        <div>
          <img loading="lazy" src="/images/slider-2.jpeg" alt="2" />
        </div>
        <div>
          <img loading="lazy" src="/images/slider-3.jpeg" alt="3" />
        </div>
        <div>
          <img loading="lazy" src="/images/slider-4.jpeg" alt="4" />
        </div>
      </Carousel>
    </section>
  );
}
