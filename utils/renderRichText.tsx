import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const Bold: React.FC = ({ children }) => <p className="bold">{children}</p>;

const Text: React.FC = ({ children }) => (
  <p className="align-center">{children}</p>
);

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <Text>{children}</Text>,
  },
  renderText: (text: string) => text.replace("!", "?"),
};

const renderRichText = (document: Document) => {
  return documentToReactComponents(document, options as any);
};

export default renderRichText;
