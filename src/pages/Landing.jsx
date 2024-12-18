const Landing = () => {
  return (
    <>
      <article className="w-full border-[0.5rem] border-blue-700 p-1 text-center">
        <p>
          Peace Tech is a platform enabling diverse students to exchange
          services, earn in-app currency, and foster cross-cultural connections
          through rewarding collaborations.
        </p>
        <button type="button">Explore</button>
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
    </>
  );
};

export default Landing;
