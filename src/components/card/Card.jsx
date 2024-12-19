const Card = () => {
  return (
    <>
      <article className="mt-6 flex w-96 flex-col items-start justify-start gap-4 overflow-hidden rounded-2xl shadow-lg">
        <section>
          <img src="images\web development.jpeg" alt="tacegory-image" />
        </section>
        <article className="p-3">
          <section className="mb-3 flex items-center justify-between">
            <section className="flex items-center justify-center gap-3">
              <img
                className="w-20"
                src="images\tes-img.png"
                alt="profile-pic"
              />
              <div>
                <h4 className="text-lg font-bold text-blue-500">UserName</h4>
                <p>Front End Developer</p>
              </div>
            </section>
            <section className="flex items-center justify-center gap-1">
              <img src="images\star.svg" alt="rating" />
              <p className="text-lg font-bold">4.5</p>
            </section>
          </section>
          <p className="mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit Aperiam unde
            sapiente saepe
          </p>
          <h3 className="text-xl font-bold text-blue-500">5 Coins</h3>
        </article>
      </article>
    </>
  );
};

export default Card;
