const Card = ({ name, description, image, profession, coins, rating }) => {
  return (
    <>
      <article className="flex w-96 flex-col gap-4 overflow-hidden rounded-xl border">
        {/* IMG SECTION */}
        <section className="h-48 w-full">
          <img
            src="images\web development.jpeg"
            alt="tacegory-image"
            className="h-full w-full object-cover"
          />
        </section>

        {/* CONTENT SECTION */}
        <article className="px-4 pb-4">
          <section className="flex flex-col justify-between gap-4">
            {/* HEADER SECTION */}
            <section className="flex items-center justify-center gap-3">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={image}
                alt="profile-pic"
              />
              <div className="flex flex-col">
                <h4 className="font-bold capitalize md:text-lg">{name}</h4>
                <p className="text-sm font-bold text-blue-500 md:text-base">
                  {profession.join(" | ")}
                </p>
              </div>
            </section>

            <p className="text-sm md:text-base">{description}</p>

            {/* RATING SECTION */}
            <section className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-1">
                <i class="fa-solid fa-star text-sm text-amber-500 md:text-base"></i>
                <p className="text-sm font-bold text-amber-500 md:text-base">
                  {rating}
                </p>
              </div>

              <h3 className="text-sm font-bold text-amber-500 md:text-base">
                {coins} Coins
              </h3>
            </section>
          </section>
        </article>
      </article>
    </>
  );
};

export default Card;
