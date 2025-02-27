import styles from "../styles/home.module.scss";

export const frontmatter = {
  pageType: "doc",
  footer: false,
  sidebar: false,
  outline: false,
};

export function FakeCounter() {
  const str = "０１２３４５６７８９";
  const counter =
    "００２９８" +
    str.charAt(5 + Math.floor(Math.random() * 5)) +
    str.charAt(Math.floor(Math.random() * 10));
  return (
    <>
      <p className="text-center">
        あなたは{" "}
        <span className="bg-black text-white font-bold">{counter}</span>{" "}
        人目の訪問者です。
      </p>
      <p className="text-sm text-center mb-10">
        <a
          href="https://web.archive.org/web/20240531002955/https://www.haruhi.tv/"
          target="_blank"
        >
          (It's a parody, real counter is at the bottom.)
        </a>
      </p>
    </>
  );
}

export function Counter() {
  return (
    <div className="mt-10 flex flex-row justify-center">
      <a
        className="w-fit flex flex-row justify-center"
        href="https://github.com/journey-ad/Moe-counter"
        target="_blank"
      >
        <img
          className="w-[70%]"
          src="https://count.getloli.com/get/@nkid00.name?theme=moebooru"
          alt="Moe-counter"
        />
      </a>
    </div>
  );
}

export default function () {
  return (
    <div className={styles.home}>
      <FakeCounter />
      <h1 className="font-bold text-3xl mb-10">
        <img
          src="/avatar_light.webp"
          className="w-20 mr-10 inline"
          alt="Avatar"
        />
        <pre className="inline">NKID00</pre>
      </h1>
      <h2>Hi, this is NKID00.</h2>
      <p>
        <a href="mailto:this@nkid00.name" target="_blank">
          Email: this at nkid00.name
        </a>
      </p>
      <p>
        <a
          href="https://keys.openpgp.org/vks/v1/by-fingerprint/C6A50DCBB4ADED6EF00332D28D700033FEDCCA3D"
          target="_blank"
        >
          OpenPGP: 8D700033FEDCCA3D
        </a>
      </p>
      <Counter />
    </div>
  );
}
