import MarkdownToJSX from "markdown-to-jsx";
import React from "react";

const P: React.FC = ({ children, ...props }) => <p {...props}>{children}</p>;

export default function Markdown({
  children,
  wrapperClassname,
  elementClassnames,
}: {
  children: string;
  wrapperClassname?: string;
  elementClassnames?: {
    p: string;
  };
}) {
  if (wrapperClassname) {
    console.log(wrapperClassname);
    return (
      <div className={wrapperClassname}>
        <MarkdownToJSX
          options={{
            wrapper: React.Fragment,
            overrides: {
              p: {
                component: P,
                props: {
                  className: elementClassnames?.p,
                },
              },
            },
          }}
        >
          {children}
        </MarkdownToJSX>
      </div>
    );
  }
  return (
    <>
      <MarkdownToJSX
        options={{
          // wrapper: null,
          overrides: {
            p: {
              component: P,
              props: {
                className: elementClassnames?.p,
              },
            },
          },
        }}
      >
        {children}
      </MarkdownToJSX>
    </>
  );
}

const Paragraph: React.FC<{
  content: string;
  className: string;
  wrapperClassname?: string;
}> = ({ content, wrapperClassname, className }) => {
  return (
    <Markdown
      wrapperClassname={wrapperClassname}
      elementClassnames={{ p: className }}
    >
      {content}
    </Markdown>
  );
};
Markdown.Paragraph = Paragraph;
