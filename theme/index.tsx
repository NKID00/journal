import Theme from "rspress/theme";

const Layout = () => (
  <Theme.Layout
    bottom={
      <div className="my-8 w-full flex flex-row justify-center">
        <div className="py-3 px-14 flex flex-col items-center bg-[var(--rp-c-bg-mute)]">
          <p>EOF</p>
          <p className="py-1">
            <a href="https://creativecommons.org/licenses/by/4.0/">
              <img src="/static/img/by.svg" alt="CC BY 4.0" className="w-18 text-center" />
            </a>
          </p>
          <p>::nkid00::</p>
        </div>
      </div>
    }
  />
);

export default {
  ...Theme,
  Layout,
};

export * from "rspress/theme";
