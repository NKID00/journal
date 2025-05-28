import { createContext, useContext, useEffect, useRef } from "react";
import katex from "katex";
import styles from "../styles/cv.module.scss";

export const frontmatter = {
  pageType: "doc",
  sidebar: false,
  outline: false,
  date: "2025-05-27",
};

const bgContext = createContext(
  null as {
    refContainer: React.RefObject<HTMLDivElement | null>;
    refBg: React.RefObject<HTMLDivElement | null>;
  } | null
);

function isMobile(): boolean {
  return window.matchMedia("(max-width: 60rem)").matches;
}

function KaTeX({ tex }: { tex: string }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current);
    }
  }, [ref]);
  return <span ref={ref} />;
}

const linkIcon = (
  // https://fonts.google.com/icons?selected=Material+Icons+Outlined:language:
  <svg
    role="img"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="w-[0.8rem] h-[0.8rem] text-violet-700 dark:text-cyan-300"
  >
    <title>Website</title>
    <path d="M -2,-2 H 22 V 22 H -2 Z" fill="none" />
    <path d="M 9.99,0 C 4.47,0 0,4.48 0,10 0,15.52 4.47,20 9.99,20 15.52,20 20,15.52 20,10 20,4.48 15.52,0 9.99,0 Z m 6.93,6 H 13.97 C 13.65,4.75 13.19,3.55 12.59,2.44 14.43,3.07 15.96,4.35 16.92,6 Z M 10,2.04 c 0.83,1.2 1.48,2.53 1.91,3.96 H 8.09 C 8.52,4.57 9.17,3.24 10,2.04 Z M 2.26,12 C 2.1,11.36 2,10.69 2,10 2,9.31 2.1,8.64 2.26,8 H 5.64 C 5.56,8.66 5.5,9.32 5.5,10 c 0,0.68 0.06,1.34 0.14,2 z m 0.82,2 h 2.95 c 0.32,1.25 0.78,2.45 1.38,3.56 C 5.57,16.93 4.04,15.66 3.08,14 Z M 6.03,6 H 3.08 C 4.04,4.34 5.57,3.07 7.41,2.44 6.81,3.55 6.35,4.75 6.03,6 Z M 10,17.96 C 9.17,16.76 8.52,15.43 8.09,14 h 3.82 C 11.48,15.43 10.83,16.76 10,17.96 Z M 12.34,12 H 7.66 C 7.57,11.34 7.5,10.68 7.5,10 7.5,9.32 7.57,8.65 7.66,8 h 4.68 c 0.09,0.65 0.16,1.32 0.16,2 0,0.68 -0.07,1.34 -0.16,2 z m 0.25,5.56 c 0.6,-1.11 1.06,-2.31 1.38,-3.56 h 2.95 c -0.96,1.65 -2.49,2.93 -4.33,3.56 z M 14.36,12 c 0.08,-0.66 0.14,-1.32 0.14,-2 0,-0.68 -0.06,-1.34 -0.14,-2 h 3.38 C 17.9,8.64 18,9.31 18,10 c 0,0.69 -0.1,1.36 -0.26,2 z" />
  </svg>
);

const githubIcon = (
  // https://simpleicons.org/?modal=icon&q=github
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="w-[0.8rem] h-[0.8rem] text-violet-700 dark:text-cyan-300"
  >
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

function Section({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-stretch justify-start z-10 mb-8 text-base">
      <span
        className="self-center font-sans font-bold text-xl px-2 text-center"
        style={{ fontVariantCaps: "small-caps" }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}

function Item({
  title,
  bold,
  large,
  link,
  year,
  children,
}: {
  title?: string;
  bold?: boolean;
  large?: boolean;
  link?: {
    link?: string;
    github?: string;
  };
  year?: string;
  children?: React.ReactNode;
}) {
  const ctx = useContext(bgContext);
  return (
    <div
      className="relative z-10 md:text-lg py-4 md:py-2 md:px-4"
      onMouseEnter={(e) => {
        if (isMobile()) {
          return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const style = ctx?.refBg?.current?.style;
        if (style) {
          const rectContainer =
            ctx?.refContainer?.current?.getBoundingClientRect();
          style.backgroundColor = "var(--rp-c-bg-mute)";
          style.filter = "";
          style.left = `${
            rect.left - (rectContainer ? rectContainer.left : 0)
          }px`;
          style.top = `${rect.top - (rectContainer ? rectContainer.top : 0)}px`;
          style.width = `${rect.width}px`;
          style.height = `${rect.height}px`;
        }
      }}
      onMouseLeave={(e) => {
        if (isMobile()) {
          return;
        }
        const style = ctx?.refBg?.current?.style;
        if (style) {
          style.backgroundColor = "transparent";
          style.filter = "blur(var(--blur-3xl))";
        }
      }}
    >
      {title || year ? (
        <div
          className={
            (large ? "text-lg " : "") +
            "w-full flex flex-wrap items-center justify-between"
          }
        >
          <span className={bold ? "font-bold min-w-fit" : "min-w-fit"}>
            {title}
          </span>
          <div className="flex-1 flex items-center justify-end gap-3">
            {link?.link ? (
              <a href={link.link} target="_blank">
                {linkIcon}
              </a>
            ) : null}
            {link?.github ? (
              <a href={link.github} target="_blank">
                {githubIcon}
              </a>
            ) : null}
            <span className="whitespace-nowrap text-right">{year}</span>
          </div>
        </div>
      ) : null}
      {children ? (
        <div className={title || year ? "mt-2 mx-2" : "mx-2"}>{children}</div>
      ) : null}
    </div>
  );
}

export default function () {
  const refContainer = useRef(null);
  const refBg = useRef(null);
  return (
    <bgContext.Provider value={{ refContainer, refBg }}>
      <div
        className={`font-serif relative mb-[8rem] ${styles.cv}`}
        ref={refContainer}
      >
        <div
          className="absolute z-0 bg-transparent transition-all duration-50 rounded-xl"
          ref={refBg}
        />
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-6 md:gap-0 my-4 md:m-8 pb-4">
          <span className="text-4xl font-bold whitespace-nowrap">Jiaqi Wu</span>
          <div className="flex flex-col items-start md:items-center">
            <span className="font-mono">jiaqiwuuuu@gmail.com</span>
            <span className="whitespace-nowrap">
              “<span className="font-mono">NKID00</span>” &ensp;
              <a href="https://nk0.me/" target="_blank" className="font-mono">
                https://nk0.me/
              </a>
            </span>
          </div>
        </div>
        <Section title="Education">
          <Item
            title="Nanjing University of Posts and Telecommunications (NJUPT)"
            year="2022 - 2026 (expected)"
          >
            <p className="flex gap-6">
              <span>BS in Software Engineering</span>
              <span>GPA 4.07/5</span>
            </p>
          </Item>
        </Section>
        <Section title="Skills">
          <Item title="Programming Languages" bold>
            <p>Rust, Python, OCaml, Rocq</p>
          </Item>
          <Item title="Natural Languages" bold>
            <p>English (TOEFL iBT 99), Mandarin Chinese (Native)</p>
          </Item>
          <Item title="Tools" bold>
            <p>
              <KaTeX tex={"\\scriptsize\\LaTeX"} />, Git, GitHub Actions, GitLab
              Pipelines, Kubernetes, Gentoo Linux, Helix
            </p>
          </Item>
        </Section>
        <Section title="Projects">
          <Item
            title="Tiered JIT Interpreter and Optimizing Compiler for BrainF"
            bold
            large
            link={{ github: "https://github.com/NKID00/sbfnj" }}
            year="2025.5"
          >
            <ul>
              <li>
                JIT interpreter targets x86_64 and WebAssembly (runs in
                browser).
              </li>
              <li>Compiler targets LLVM IR.</li>
            </ul>
          </Item>
          <Item
            title="CDCL SAT Solver"
            bold
            large
            link={{
              link: "https://nk0.me/g/minesweep-automated/",
              github: "https://github.com/NKID00/minesweep-automated",
            }}
            year="2024.10 - 2025.5"
          >
            <ul>
              <li>
                Implemented Tseitin Encoding, Unit Propagation, Conflict
                Analysis, Unique Implication Point and Watched Literals.
              </li>
              <li>
                Developed an algorithm for the Minesweeper via CSP Solving with
                this SAT Solver.
              </li>
              <li>
                Written in Rust, compiles to WebAssembly and runs in browser.
              </li>
            </ul>
          </Item>
          <Item
            title="Optimizing Compiler for a Subset of MoonBit"
            bold
            large
            year="2024.9 - 2024.11"
          >
            <ul>
              <li>
                Capable of type inference via unification, first class functions
                and tuples, CPS transformation, flow analysis, SSA-based
                optimizations, register allocation via SSA linear scan and graph
                coloring.
              </li>
              <li>Targets RISC-V, JavaScript and WebAssembly.</li>
            </ul>
          </Item>
          <Item
            title="Monoio-based io_uring Support for Apache OpenDAL"
            bold
            large
            year="2024.6 - 2024.9"
          >
            <ul>
              <li>OSPP 2024 Project.</li>
              <li>Boosted local filesystem IO throughput up to 4x.</li>
              <li>
                Discovered and fixed a race condition bug in the async runtime
                bytedance/monoio that may lead to memory access violation.
              </li>
            </ul>
          </Item>
          <Item title="NJUPT App" bold large year="2023 - 2024">
            <ul>
              <li>
                Implemented active monitoring and automated scaling of
                microservice instances, reduced incident rate from 5/month to
                less than 1/month.
              </li>
              <li>Serving over 20k daily users.</li>
            </ul>
          </Item>
          <Item
            title="Open Source Software Mirror of NJUPT"
            bold
            large
            year="2023 - 2024"
          >
            <ul>
              <li>
                Expanded capacity to 34 TB, implemented automated deduplication
                and traffic monitoring, serving on-campus users.
              </li>
            </ul>
          </Item>
        </Section>
        <Section title="Awards">
          <Item title="President of Qingyou Studio" year="2024.6 - 2025.6">
            <p>
              Qingyou Studio (“<span className="text-sm">青柚工作室</span>”) is
              the student association directed by IT Center of NJUPT.
            </p>
          </Item>
          <Item
            title="MoonBit MGPIC Compiler Implementation Competition Bronze Prize"
            year="2024"
          />
          <Item title="NJUPT Scholarship" year="2024" />
          <Item title="NCTF Silver Prize" year="2022" />
        </Section>
        <Section title="Talks">
          <Item>
            <div>
              Short talks on meetings of Student Association of Science and
              Technology, Linux User Group and Qingyou Studio.
              <ul className="pl-8">
                <li>Dependent type theory</li>
                <li>Formal reasoning</li>
                <li>Rust programming</li>
              </ul>
            </div>
          </Item>
          <Item>
            <div>
              Public lectures on events hosted by Student Association of Science
              and Technology.
              <ul className="pl-8">
                <li>
                  C programming life-saver (“C{" "}
                  <span className="text-sm">语言急救车</span>”)
                </li>
                <li>Git introduction</li>
              </ul>
            </div>
          </Item>
        </Section>
      </div>
    </bgContext.Provider>
  );
}
