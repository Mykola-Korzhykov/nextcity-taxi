import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="styles.wrapper">
      <h2 className="styles.title">intercity</h2>
      <p className="styles.description">СЕРВИС ТАКСИ РФ</p>
    </Link>
  );
};

export { Logo };
