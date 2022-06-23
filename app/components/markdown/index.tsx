import { Remark } from "react-remark";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

import interpolate from "./interpolate";

const replaceElements = ({
  components,
  openLinkInNewTab,
  rest,
}: {
  components: any;
  openLinkInNewTab: boolean;
  rest: any;
}) => {
  if (!components.p) {
    components.p = (props: any) => <p {...props} {...rest} />;
  }

  if (!components.a) {
    components.a = (props: any) => {
      const newProps = { ...props };
      const linkName = props.children[0];
      newProps["aria-label"] = linkName;

      if (openLinkInNewTab) {
        newProps.target = "_blank";
        newProps.rel = "noreferrer noopener";
        newProps["aria-label"] = `${linkName} (opens in a new window)`;
      }

      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a {...newProps} />;
    };
  }
};

export default function Markdown({
  content = "",
  components = {},
  openLinkInNewTab = false,
  replacements,
  ...rest
}: {
  content: string;
  components: any;
  openLinkInNewTab: boolean;
  replacements: { [x: string]: any };
  "data-testId": string;
}) {
  const formattedContent = interpolate(content, replacements);
  if (!formattedContent) return null;

  replaceElements({ components, openLinkInNewTab, rest });

  const renderedParagraphs = formattedContent
    .split(/<br>/)
    .map((paragraph: string, index: number) => {
      const rehypePlugins = paragraph.includes("abbr")
        ? [rehypeRaw, rehypeSanitize]
        : [];

      return (
        <Remark
          key={paragraph + index}
          remarkToRehypeOptions={{ allowDangerousHtml: true }}
          rehypeReactOptions={{ components }}
          rehypePlugins={rehypePlugins as any}
        >
          {paragraph}
        </Remark>
      );
    });

  return renderedParagraphs;
}
