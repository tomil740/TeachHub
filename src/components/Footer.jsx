const Footer = () => {
  return (
    <>
      <footer className="mt-11 flex h-24 w-full items-center justify-between bg-blue-100 px-5 max-sm:flex-col max-sm:justify-center max-sm:gap-1">
        <section className="flex items-center justify-center gap-2">
          <h1 className="text-4xl text-blue-500 max-sm:text-xl">Barter</h1>
          <p className="max-sm:text-sm">© Baret International Ltd. 2024</p>
        </section>
        <section className="flex items-center justify-center gap-1">
          <section className="flex items-center justify-center gap-2">
            <img src="images\instagram.svg" alt="" />
            <img src="images\facebook.svg" alt="" />
            <img src="images\x.svg" alt="" />
          </section>
          <section className="flex items-center justify-center gap-2">
            <img src="images\lang.svg" alt="" />
            <p>ENG</p>
          </section>
        </section>
      </footer>
    </>
  );
};

export default Footer;
