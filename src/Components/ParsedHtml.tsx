import parse, { domToReact } from 'html-react-parser';
import type { HTMLAttributes, ReactElement } from 'react';
import { Fragment } from 'react';

interface ParsedHtmlProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  htmlContent: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Utility component to safely parse HTML content from API responses.
 * Removes invalid block elements (div, p) while preserving inline formatting (strong, em, etc.)
 */
export const ParsedHtml = ({ 
  htmlContent, 
  as: Component = 'span',
  className = '',
  ...props
}: ParsedHtmlProps) => {
  if (!htmlContent) return null;

  const options = {
    replace: (domNode: any): ReactElement | undefined => {
      // If the node is a block element (p, div), unwrap its children
      if (domNode && domNode.type === 'tag' && (domNode.name === 'p' || domNode.name === 'div')) {
        const children = domToReact(domNode.children || [], options);
        // If there's only one child, return it directly; otherwise wrap in Fragment
        if (Array.isArray(children) && children.length === 1) {
          return children[0] as ReactElement;
        }
        return <Fragment>{children}</Fragment>;
      }
      // Replace strong tags with semibold span
      if (domNode && domNode.type === 'tag' && domNode.name === 'strong') {
        const children = domToReact(domNode.children || [], options);
        return (
          <span className="font-semibold">
            {children}
          </span>
        );
      }
      // Keep other elements as-is (em, span, etc. are valid inline elements)
      return undefined;
    },
  };

  const parsedContent = parse(htmlContent, options);

  return <Component className={className} {...props}>{parsedContent}</Component>;
};

export default ParsedHtml;

