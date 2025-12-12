import parse, { domToReact } from 'html-react-parser';
import type { HTMLAttributes, ReactElement } from 'react';
import { Fragment } from 'react';

interface ParsedHtmlProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  htmlContent: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}


export const ParsedHtml = ({ 
  htmlContent, 
  as: Component = 'span',
  className = '',
  ...props
}: ParsedHtmlProps) => {
  if (!htmlContent) return null;

  // Process the HTML content to convert \n to <br/> tags
  const processHtmlContent = (content: string): string => {
    // If it's already HTML (contains tags), convert \n to <br/> within the HTML
    if (content.includes('<') && content.includes('>')) {
      return content.replace(/\n/g, '<br/>');
    }
    
    // If it's plain text, wrap in <p> and convert \n to <br/>
    return `<p>${content.replace(/\n/g, '<br/>')}</p>`;
  };

  const processedContent = processHtmlContent(htmlContent);

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

  const parsedContent = parse(processedContent, options);

  return <Component className={className} {...props}>{parsedContent}</Component>;
};

export default ParsedHtml;

