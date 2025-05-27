import { usePageData } from "rspress/runtime";
import Theme from "rspress/theme";

function LastUpdated() {
  const {
    page: { frontmatter: { date } },
  } = usePageData();
  if (date) {
    const dateString = new Date(date as any).toISOString().slice(0, 10);
    return (
      <div className="xs:flex pb-5 px-2 justify-end items-center">
        <p>
          {"Last Updated: "}
          <span> {dateString} </span>
        </p>
      </div>
    );
  } else {
    return <></>;
  }
}

const Layout = () => (
  <Theme.Layout
    beforeDocFooter={<LastUpdated />}
    bottom={
      <div className="my-8 w-full flex flex-row justify-center">
        <div className="py-3 px-14 flex flex-col items-center bg-(--rp-c-bg-mute)">
          <p>EOF</p>
          <p className="py-1">
            <a href="https://creativecommons.org/licenses/by/4.0/">
              <img
                src="/static/img/by.svg"
                alt="CC BY 4.0"
                className="w-18 text-center"
              />
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
