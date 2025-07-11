import "../styles/Testimonials.css";
import TestimonialGrid from "../components/TestimonialGrid";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Testimonials = () => {
  const { testimonials, isloading } = useSelector((state) => state.testimonial);

  // console.log(testimonials);
  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="testimonials">
      <div className="testimonial-title">
        <h3>Our Testimonials</h3>
      </div>
      <div className="testimonial-grid-con">
        {testimonials &&
          testimonials.map((testimonial) => (
            <TestimonialGrid key={testimonial.id} testimonial={testimonial} />
          ))}
      </div>
    </div>
  );
};

export default Testimonials;
