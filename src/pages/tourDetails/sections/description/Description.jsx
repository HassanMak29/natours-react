import "./Description.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { nextTourDate } from "../../../../util/functions";

const Description = ({ tour }) => {
  const { date } = nextTourDate(tour);
  const paragraphs = tour.description.split("\n");

  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary mb-lg">Quick facts</h2>
            <div className="overview-box__details">
              <AiOutlineCalendar className="overview-box__icon" />
              <span className="overview-box__label">Next date</span>
              <span className="overview-box__text">{date}</span>
            </div>
            <div className="overview-box__details">
              <BiTrendingUp className="overview-box__icon" />
              <span className="overview-box__label">Difficulty</span>
              <span className="overview-box__text">{tour.difficulty}</span>
            </div>
            <div className="overview-box__details">
              <AiOutlineUser className="overview-box__icon" />
              <span className="overview-box__label">Participants</span>
              <span className="overview-box__text">
                {tour.maxGroupSize} people
              </span>
            </div>
            <div className="overview-box__details">
              <AiOutlineStar className="overview-box__icon" />
              <span className="overview-box__label">Rating</span>
              <span className="overview-box__text">
                {tour.ratingsAverage} / 5
              </span>
            </div>
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary mb-lg">Your tour guides</h2>
            {tour.guides.map((guide, i) => (
              <div key={i} className="overview-box__details">
                <img
                  className="overview-box__img"
                  src={`${process.env.REACT_APP_BACKEND}/img/users/${guide.photo}`}
                  alt={guide.name}
                />
                <span className="overview-box__label">
                  {guide.role === "lead-guide" ? "Lead guide" : "Tour guide"}
                </span>
                <span className="overview-box__text">{guide.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary mb-lg">About {tour.name} tour</h2>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 10)} className="description__text">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Description;
