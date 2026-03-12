import React from 'react';
import { createRoot } from 'react-dom/client';
import { Tldraw } from 'tldraw';
import css from 'tldraw/tldraw.css?inline';

// Inject tldraw CSS into document head at load time
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

interface TldrawSnapshot {
  store: Record<string, unknown>;
}

interface RenderOptions {
  readonly?: boolean;
  zoomToFit?: boolean;
  background?: boolean;
}

function TldrawDiagram({
  snapshot,
  options,
}: {
  snapshot: TldrawSnapshot;
  options: RenderOptions;
}) {
  return (
    <Tldraw
      snapshot={snapshot}
      hideUi
      onMount={(editor) => {
        if (options.readonly ?? true) {
          editor.updateInstanceState({ isReadonly: true });
        }
        if (options.zoomToFit ?? true) {
          editor.zoomToFit();
        }
      }}
    />
  );
}

function render(
  containerId: string,
  snapshot: TldrawSnapshot,
  options: RenderOptions = {},
) {
  const el = document.getElementById(containerId);
  if (!el) {
    console.error(`TldrawViewer: element #${containerId} not found`);
    return;
  }
  createRoot(el).render(
    <TldrawDiagram snapshot={snapshot} options={options} />,
  );
}

(window as any).TldrawViewer = { render };
