import "./card.css";

const Card = () => {
  return (
    <>
      <article>
        <section className="profile-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6325/6325109.png"
            alt="profile-image"
          />
          <div>
            <h2>UserName</h2>
            <p>FrontEnd WebDeveloper</p>
          </div>
        </section>
        <section className="profile-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit Aperiam unde
            sapiente saepe
          </p>
          <div>
            <h3>5 Coins</h3>
            <button type="button">View More</button>
          </div>
        </section>
      </article>
    </>
  );
};

export default Card;
