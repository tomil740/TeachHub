const Footer = () => {
  return (
    <>
      <footer className="mt-20 flex w-full items-center justify-between border-t px-5 max-sm:flex-col max-sm:justify-center max-sm:gap-1">
        <section className="flex items-center justify-center gap-2">
          <img src="/images/Logo.png" className="h-24 w-24" alt="" />
          <p className="max-sm:text-sm">© TeachHub International Ltd. 2024</p>
        </section>

        <section className="flex items-center justify-center gap-4">
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
