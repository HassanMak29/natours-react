import "./Pictures.css";

const Pictures = ({ tour }) => {
  return (
    <section className="section-pictures">
      {tour.images.map((img, i) => (
        <div key={i} className="picture-box">
          <img
            src={`${process.env.REACT_APP_BACKEND}/img/tours/${img}`}
            alt={`${tour.name} ${i + 1}`}
            className={`picture-box__img picture-box__img--${i + 1}`}
          />
        </div>
      ))}
    </section>
  );
};

export default Pictures;
