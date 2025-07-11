const TestimonialGrid = ({ testimonial }) => {
  return (
    <div className="testimonial-grid-item">
      <div className="top-grid">
        
        <div className="names">
          <div className="fullname">
            <h5>{testimonial.fullname}</h5>
          </div>
          <div className="username">
            <p>{testimonial.username}</p>
          </div>
        </div>
        <div className="follow-btn">
          <p>Follow</p>
        </div>
      </div>
      <div className="mid-grid">
        <div className="title">
          <h3>"{testimonial.title}"</h3>
        </div>
      </div>
      <div className="bottom-grid">
        <p>{testimonial.content}</p>
      </div>
      <div className="hashtags">
        {testimonial.hashtags.map((tag, index) => (
          <span key={index}>#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialGrid;
