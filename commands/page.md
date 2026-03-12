---
description: "Generate a static HTML reference page for a concept from the current learning session"
argument-hint: "[topic-slug]"
allowed-tools: ["Read", "Write", "Glob", "Bash"]
---

# Generate Learning Page

Create a clean, printable static HTML page that explains and demonstrates a concept from the current assisted-learning conversation. Uses mermaid for flowcharts/sequences and tldraw for rich visual diagrams.

## Process

1. Identify the core topic and key concepts from the current conversation. If an argument is provided, use it as the topic slug. Otherwise, derive a slug from the topic name (lowercase, hyphens, no special characters).

2. Structure content into sections using only what was discussed in the conversation. Do not invent new explanations.

3. Create the `docs/pages/` directory in the **user's project root** (the current working directory) if it doesn't exist. Write the HTML file to `docs/pages/<topic-slug>.html` in the project root. NEVER write to the plugin installation directory.

4. If the page uses tldraw diagrams, copy the viewer bundle from the plugin to the project:
   ```bash
   cp "$CLAUDE_PLUGIN_ROOT/scripts/tldraw-viewer.js" docs/pages/tldraw-viewer.js
   ```
   Skip this step if `docs/pages/tldraw-viewer.js` already exists.

5. Report the file path when done.

## Section Order

1. **Title + subtitle** — topic name and one-line description
2. **Overview** — 2-3 paragraph explanation of the core concept
3. **Diagrams** — at least one diagram (mermaid or tldraw) showing architecture, flow, or relationships
4. **Key concepts** — table or definition list of important terms
5. **Side-by-side comparison** — JS approach vs target approach (use `.comparison` grid). Skip if not applicable.
6. **Callouts** — gotchas or insights (use `.callout` blocks)
7. **Summary** — quick-reference bullet list of takeaways

Adapt sections to fit the topic. Add multiple diagrams if needed. Diagrams can appear in any section, not just section 3.

## Choosing Diagram Type

| Use Mermaid | Use tldraw |
|-------------|------------|
| Flowcharts, decision trees | Architecture overviews with spatial layout |
| Sequence diagrams | Concept maps with freeform connections |
| State machines | Layered diagrams (network stack, middleware pipeline) |
| Class/ER diagrams | Visual guides showing spatial relationships |
| Simple linear flows | Diagrams needing custom positioning and sizing |

Use both in the same page when appropriate.

## Mermaid Diagrams

Wrap in `<div class="mermaid">...</div>`. One diagram per concept.

## tldraw Diagrams

tldraw renders interactive readonly canvases from JSON snapshots via a pre-bundled viewer (`tldraw-viewer.js`). Use for diagrams where spatial layout, custom sizing, and freeform connections matter.

### Container

```html
<div class="tldraw-diagram" id="unique-diagram-name"></div>
```

### Initialization

The viewer exposes `TldrawViewer.render(containerId, snapshot)`. Call it after the DOM is ready:

```html
<script src="./tldraw-viewer.js"></script>
<script>
    TldrawViewer.render('architecture-overview', {
        store: {
            // shape definitions
        }
    });
</script>
```

### Snapshot Format

Each snapshot has a `store` object containing shape records.

**Shape types:**
- `geo` — rectangles, ellipses, diamonds. Set shape via `props.geo`.
- `arrow` — connections between shapes with optional labels.
- `text` — standalone text labels.
- `note` — note-style boxes with text.

**Common shape props:**
- `x`, `y` — canvas position
- `props.w`, `props.h` — dimensions (for geo shapes)
- `props.text` — label content
- `props.color` — `"black"`, `"grey"`, `"light-blue"` etc.
- `props.fill` — `"none"`, `"semi"`, `"solid"`
- `props.size` — `"s"`, `"m"`, `"l"`
- `props.font` — `"draw"`, `"sans"`, `"serif"`, `"mono"`

**Arrow bindings:**
- Bound to shape: `{ type: "binding", boundShapeId: "shape:targetId", normalizedAnchor: { x: 0.5, y: 0.5 }, isExact: false }`
- Free point: `{ type: "point", x: 100, y: 200 }`

### Example snapshot

```javascript
TldrawViewer.render('data-flow', {
    store: {
        'shape:client': {
            typeName: 'shape', id: 'shape:client', type: 'geo',
            x: 50, y: 80,
            props: { geo: 'rectangle', w: 160, h: 70, text: 'Client', color: 'black', fill: 'none', size: 'm', font: 'sans' }
        },
        'shape:server': {
            typeName: 'shape', id: 'shape:server', type: 'geo',
            x: 350, y: 80,
            props: { geo: 'rectangle', w: 160, h: 70, text: 'Server', color: 'black', fill: 'semi', size: 'm', font: 'sans' }
        },
        'shape:db': {
            typeName: 'shape', id: 'shape:db', type: 'geo',
            x: 350, y: 250,
            props: { geo: 'ellipse', w: 160, h: 70, text: 'Database', color: 'grey', fill: 'semi', size: 'm', font: 'sans' }
        },
        'shape:arrow1': {
            typeName: 'shape', id: 'shape:arrow1', type: 'arrow',
            x: 0, y: 0,
            props: {
                start: { type: 'binding', boundShapeId: 'shape:client', normalizedAnchor: { x: 0.5, y: 0.5 }, isExact: false },
                end: { type: 'binding', boundShapeId: 'shape:server', normalizedAnchor: { x: 0.5, y: 0.5 }, isExact: false },
                text: 'HTTP', color: 'black', size: 'm', arrowheadEnd: 'arrow', arrowheadStart: 'none'
            }
        },
        'shape:arrow2': {
            typeName: 'shape', id: 'shape:arrow2', type: 'arrow',
            x: 0, y: 0,
            props: {
                start: { type: 'binding', boundShapeId: 'shape:server', normalizedAnchor: { x: 0.5, y: 0.5 }, isExact: false },
                end: { type: 'binding', boundShapeId: 'shape:db', normalizedAnchor: { x: 0.5, y: 0.5 }, isExact: false },
                text: 'Query', color: 'grey', size: 'm', arrowheadEnd: 'arrow', arrowheadStart: 'none'
            }
        }
    }
});
```

### tldraw style constraints

Keep tldraw diagrams consistent with the page's minimal aesthetic:
- Colors: only `"black"` and `"grey"`
- Fill: `"none"` or `"semi"` — avoid bright solid fills
- Text size: `"s"` or `"m"`
- Font: `"sans"` for clean look, `"draw"` for hand-drawn feel
- Shapes: prefer `"rectangle"`, `"ellipse"`, `"diamond"` — avoid decorative shapes

## Design Rules (non-negotiable)

- No gradients, no shadows, no decorative elements, no background images
- No rounded corners beyond 4px (tldraw canvas internals are exempt)
- Three colors max for page chrome: near-black (`#1a1a1a`), white (`#ffffff`), light gray (`#f5f5f5`). Secondary text: `#666`. Borders: `#e0e0e0`.
- System fonts only for page content. tldraw uses its own internal fonts within canvases.
- Print-friendly. No elements that depend on color alone to convey meaning.

## HTML Template

Use this exact template. Modify content sections only. **If a page does not use tldraw, remove the tldraw script tag and tldraw initialization block.**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TOPIC — Assisted Learning</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
        }
        h1 { font-size: 2rem; font-weight: 700; margin-bottom: 0.25rem; letter-spacing: -0.02em; }
        h2 { font-size: 1.25rem; font-weight: 600; margin-top: 2.5rem; margin-bottom: 0.75rem; border-bottom: 2px solid #1a1a1a; padding-bottom: 0.25rem; }
        h3 { font-size: 1rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        p { margin-bottom: 1rem; }
        .subtitle { color: #666; font-size: 1rem; margin-bottom: 2rem; }
        code {
            font-family: "SF Mono", "Fira Code", "Cascadia Code", monospace;
            font-size: 0.875em;
            background: #f5f5f5;
            padding: 0.15em 0.35em;
            border-radius: 3px;
        }
        pre {
            background: #f5f5f5;
            padding: 1rem;
            border-radius: 4px;
            overflow-x: auto;
            margin-bottom: 1rem;
            border-left: 3px solid #1a1a1a;
        }
        pre code { background: none; padding: 0; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
        th, td { text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid #e0e0e0; }
        th { font-weight: 600; border-bottom: 2px solid #1a1a1a; }
        .comparison {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }
        .comparison > div {
            padding: 1rem;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
        }
        .comparison > div h4 {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #666;
            margin-bottom: 0.5rem;
        }
        .callout {
            border-left: 3px solid #1a1a1a;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            background: #fafafa;
        }
        .callout strong { display: block; margin-bottom: 0.25rem; }
        .mermaid { margin: 1.5rem 0; text-align: center; }
        .tldraw-diagram { width: 100%; height: 400px; margin: 1.5rem 0; border: 1px solid #e0e0e0; border-radius: 4px; position: relative; }
        ul, ol { margin-bottom: 1rem; padding-left: 1.5rem; }
        li { margin-bottom: 0.25rem; }
        footer {
            margin-top: 3rem;
            padding-top: 1rem;
            border-top: 1px solid #e0e0e0;
            color: #666;
            font-size: 0.85rem;
        }
        @media print {
            body { max-width: none; padding: 1rem; }
            h2 { break-after: avoid; }
            pre, .mermaid, .comparison, .tldraw-diagram { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <h1>TOPIC TITLE</h1>
    <p class="subtitle">One-line description of the concept</p>

    <h2>Overview</h2>
    <p>...</p>

    <!-- mermaid diagram -->
    <div class="mermaid">
    graph TD
        A[Component] --> B[Component]
    </div>

    <!-- tldraw diagram -->
    <div class="tldraw-diagram" id="architecture-overview"></div>

    <h2>Key Concepts</h2>
    <table>
        <thead><tr><th>Concept</th><th>Description</th></tr></thead>
        <tbody>
            <tr><td>...</td><td>...</td></tr>
        </tbody>
    </table>

    <h2>Comparison</h2>
    <div class="comparison">
        <div>
            <h4>JavaScript Approach</h4>
            <pre><code>// JS code here</code></pre>
        </div>
        <div>
            <h4>Target Approach</h4>
            <pre><code>// Target code here</code></pre>
        </div>
    </div>

    <div class="callout">
        <strong>Important</strong>
        Key insight or gotcha goes here.
    </div>

    <h2>Summary</h2>
    <ul>
        <li>Takeaway 1</li>
        <li>Takeaway 2</li>
    </ul>

    <footer>
        Generated from assisted-learning session — DATE
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
    <script>mermaid.initialize({ startOnLoad: true, theme: 'neutral' });</script>

    <!-- tldraw init: REMOVE this block if page has no tldraw diagrams -->
    <script src="./tldraw-viewer.js"></script>
    <script>
        TldrawViewer.render('architecture-overview', {
            store: {
                // shape definitions here
            }
        });
    </script>
    <!-- /tldraw init -->
</body>
</html>
```

## File Naming

Convert topic to a URL-friendly slug: lowercase, hyphens, no special characters.

Examples: `elixir-pattern-matching.html`, `kubernetes-pods.html`, `event-sourcing.html`

## Content Rules

- Extract from current conversation only — do not invent new explanations
- Keep JS developer perspective — include comparisons where relevant
- Write for someone reading without conversation context
- Every section should stand on its own
- At least one diagram per page (mermaid or tldraw)
- Use both diagram types in a single page when it serves the content
