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
  bold,
  title,
  year,
  children,
}: {
  bold?: boolean;
  title?: string;
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
        <p className="w-full flex flex-wrap items-center justify-between">
          <span className={bold ? "font-bold min-w-fit" : "min-w-fit"}>
            {title}
          </span>
          <span className="flex-1 whitespace-nowrap text-right"> {year} </span>
        </p>
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
      <div className={`relative mb-[8rem] ${styles.cv}`} ref={refContainer}>
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
            year="2025.5"
          >
            <p>
              JIT interpreter targets x86_64 and WebAssembly (runs in browser).
              Compiler targets LLVM IR.
            </p>
          </Item>
          <Item title="CDCL SAT Solver" bold year="2024.10">
            <p>
              Implemented Tseitin Encoding, Unit Propagation, Conflict Analysis,
              Unique Implication Point and Watched Literals.
            </p>
            <p>
              Developed an algorithm for the Minesweeper game via CSP Solving
              based on this SAT Solver.
            </p>
            <p>Written in Rust, compiles to WebAssembly and runs in browser.</p>
          </Item>
          <Item
            title="Optimizing Compiler for a Subset of MoonBit"
            bold
            year="2024.9 - 2024.11"
          >
            <p>
              Capable of type inference via unification, first class functions
              and tuples, CPS transformation, flow analysis, SSA-based
              optimizations, register allocation via SSA linear scan and graph
              coloring.
            </p>
            <p>Targets RISC-V, JavaScript and WebAssembly.</p>
          </Item>
          <Item
            title="Monoio-based io_uring Support for Apache OpenDAL"
            bold
            year="2024.6 - 2024.9"
          >
            <p>OSPP 2024 Project.</p>
            <p>Boosted local filesystem IO throughput up to 4x.</p>
            <p>
              Discovered and fixed a race condition bug in the async runtime
              bytedance/monoio that may lead to memory access violation.
            </p>
          </Item>
          <Item title="NJUPT Campus Wechat App" bold year="2023 - 2024">
            <p>
              Serving over 20k daily users. Implemented active monitoring and
              automated scaling of microservice instances, reducing incident
              rate from 5/month to less than 1/month.
            </p>
          </Item>
          <Item
            title="Open Source Software Mirror of NJUPT"
            bold
            year="2023 - 2024"
          >
            <p>
              Administrated software mirror with 34 TB capacity serving
              on-campus users.
            </p>
          </Item>
        </Section>
        <Section title="Awards">
          <Item title="President of Qingyou Studio" year="2024.6 - 2025.6">
            <p>
              Qingyou Studio (“<span className="text-sm">青柚工作室</span>”) is
              a student association directed by the IT Center.
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
            <p>
              I presented several short talks concerning dependent type theory,
              formal reasoning, subtyping and Rust programming on meetings of
              Student Association of Science and Technology, Linux User Group
              and Qingyou Studio.
            </p>
          </Item>
          <Item>
            <p>
              I gave lectures themed C programming life-saver (“C{" "}
              <span className="text-sm">语言急救车</span>”) and Git introduction
              publicly on events hosted by Student Association of Science and
              Technology.
            </p>
          </Item>
        </Section>
      </div>
    </bgContext.Provider>
  );
}
