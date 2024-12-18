const Landing = () => {
  return (
    <main className="container mx-auto">
      <article className="group relative mt-[50px] flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border-blue-700 px-8 py-8 shadow-md">
        <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-blue-400 opacity-50 blur-[50px] transition-all duration-300"></div>
        <p className="w-3/5 text-center text-2xl">
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

      <article>
        <section>
          <img src="images\collaboration-icon.png" alt="collab-icon" />
          <h3>Collaboration</h3>
        </section>
        <section>
          <img src="images\cultural-icon.png" alt="cultural-icon" />
          <h3>Cross-Cultural</h3>
        </section>
        <section>
          <p>
            Join Barter Exchange services, earn rewards, and connect cultures!
          </p>
          <button type="button">Explore</button>
        </section>
      </article>
    </main>
  );
};

export default Landing;
