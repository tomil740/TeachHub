const Card = ({
  name,
  description,
  profileImage,
  typeOfService,
  coins,
  rating,
  priceOfService,
  backgroundImage,
}) => {
  const truncatedTypeOfService =
    typeOfService.join(" | ").split(" ").slice(0, 3).join(" ") +
    (typeOfService.join(" | ").split(" ").length > 3 ? "..." : "");
  return (
    <>
      <article className="flex w-96 flex-col gap-4 overflow-hidden rounded-xl border">
        {/* IMG SECTION */}
        <section className="h-48 w-full">
          <img
            src="/images/defultServ.jpg"
            alt={truncatedTypeOfService}
            className="h-full w-full object-cover"
          />
        </section>

        {/* CONTENT SECTION */}
        <article className="px-4 pb-4">
          <section className="flex flex-col justify-between gap-4">
            {/* HEADER SECTION */}
            <section className="flex w-28 items-start justify-start gap-3">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={profileImage}
                alt={name}
              />
              <div className="flex flex-col">
                <h4 className="font-bold capitalize md:text-lg">{name}</h4>
                <p className="truncate-title overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-blue-500">
                  {truncatedTypeOfService}
                </p>
              </div>
            </section>

            <p className="line-clamp-2 text-sm md:text-base">{description}</p>

            {/* RATING SECTION */}
            <section className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-1">
                <i className="fa-solid fa-star text-sm text-amber-500 md:text-base"></i>
                <p className="text-sm font-bold text-amber-500 md:text-base">
                  {rating}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <i className="fa-brands fa-bitcoin transform text-3xl text-amber-500"></i>
                <h3 className="text-sm font-bold text-amber-500 md:text-base">
                  {priceOfService}
                </h3>
              </div>
            </section>
          </section>
        </article>
      </article>
    </>
  );
};

export default Card;
