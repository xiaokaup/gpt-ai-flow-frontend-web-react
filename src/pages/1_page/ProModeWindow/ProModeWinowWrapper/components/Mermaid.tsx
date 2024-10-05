import { useEffect } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'loose',
  // theme: 'forest',
});

interface IMermaid_input {
  chart: string;
}
export const MermaidComponent = (props: IMermaid_input) => {
  const { chart } = props;

  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid">{chart}</div>;
};
