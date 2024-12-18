const Landing = () => {
  return (
    <main className="container mx-auto">
      <article className="group relative mt-[50px] flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border-blue-700 px-8 py-8 shadow-md">
        <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-blue-400 opacity-50 blur-[50px] transition-all duration-300"></div>
        <p className="w-3/5 text-center text-2xl max-lg:text-[16px] max-md:w-full max-md:text-[14px]">
          Peace Tech is a platform enabling diverse students to exchange
          services, earn in-app currency, and foster cross-cultural connections
          through rewarding collaborations.
        </p>
        <button
          className="mt-4 rounded-xl bg-blue-500 px-6 py-1 text-2xl font-bold text-white"
          type="button"
        >
          Explore
        </button>
      </article>

      <article className="mt-[50px] flex w-full gap-5 max-md:flex-wrap">
        <section className="group relative flex h-64 w-64 flex-col items-center justify-center overflow-hidden rounded-xl text-center shadow-lg max-sm:w-40">
          <img
            className="w-44 max-sm:w-20"
            src="images\collaboration-icon.png"
            alt="collab-icon"
          />
          <h3 className="text-xl text-blue-500">Collaboration</h3>
          <div className="absolute -left-10 -top-20 -z-10 h-52 w-52 rounded-full bg-blue-400 opacity-50 blur-[50px] transition-all duration-300 max-sm:-left-36"></div>
        </section>
        <section className="group relative flex h-64 w-64 flex-col items-center justify-center overflow-hidden rounded-xl text-center shadow-lg max-sm:w-40">
          <div className="absolute -left-10 -top-20 -z-10 h-52 w-52 rounded-full bg-blue-400 opacity-50 blur-[50px] transition-all duration-300 max-sm:-left-36"></div>
          <img
            className="max-sm:w-20"
            src="images\cultural-icon.png"
            alt="cultural-icon"
          />
          <h3 className="text-xl text-blue-500">Cross-Cultural</h3>
        </section>
        <section className="group relative flex h-64 w-64 flex-grow flex-col items-start justify-end overflow-hidden rounded-xl bg-blue-700 text-left shadow-md">
          <p className="ml-5 w-4/6 text-2xl font-bold text-white max-lg:w-full max-lg:text-[16px] max-md:w-4/5">
            Join Barter Exchange <span className="text-blue-300">services</span>
            , <span className="text-blue-300"> earn rewards</span>, and connect
            cultures!
          </p>
          <button
            className="mx-5 mb-5 mt-4 rounded-xl border-2 border-white bg-transparent px-6 py-1 text-2xl font-bold leading-normal text-white transition-all hover:bg-white hover:text-blue-500"
            type="button"
          >
            Explore
          </button>
        </section>
      </article>

      {/* about us */}
      <h1 className="mb-4 mt-24 text-5xl font-bold text-blue-500 max-sm:text-center">
        Who Are We
      </h1>
      <article className="mb-24 mt-10 h-96 overflow-hidden rounded-xl border-2 border-slate-100 p-5 shadow-xl max-md:h-auto">
        <section className="flex items-center justify-between gap-8 rounded-xl max-md:flex-col">
          <section className="flex flex-col items-start justify-center gap-4 text-center max-md:items-center">
            <h3 className="text-4xl font-bold text-blue-400">About Us</h3>
            <p className="w-96 text-left max-md:text-center max-sm:w-4/5">
              Peace Tech bridges cultural gaps by connecting students through
              service exchanges. Our platform encourages skill-sharing and
              rewards cross-cultural collaborations. Together, we’re building a
              community of diversity, learning, and mutual understanding.
            </p>
            <button
              className="mt-4 rounded-xl bg-blue-500 px-6 py-1 text-2xl font-bold text-white"
              type="button"
            >
              Explore
            </button>
          </section>
          {/* break */}
          <section>
            <img src="images\about-img.png" alt="about-us" />
          </section>
        </section>
      </article>
    </main>
  );
};

export default Landing;
