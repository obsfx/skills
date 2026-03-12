---
description: "Generate a static HTML reference page for a concept from the current learning session"
argument-hint: "[topic-slug]"
allowed-tools: ["Read", "Write", "Glob", "Bash"]
---

# Generate Learning Page

Create a clean, printable static HTML page that explains and demonstrates a concept from the current assisted-learning conversation. Uses mermaid for flowcharts/sequences and inline SVG for rich visual diagrams. The output is a single standalone HTML file with no external dependencies beyond the mermaid CDN.

## Process

1. Identify the core topic and key concepts from the current conversation. If an argument is provided, use it as the topic slug. Otherwise, derive a slug from the topic name (lowercase, hyphens, no special characters).

2. Structure content into sections using only what was discussed in the conversation. Do not invent new explanations.

3. Create the `docs/pages/` directory in the **user's project root** (the current working directory) if it doesn't exist. Write the HTML file to `docs/pages/<topic-slug>.html` in the project root. NEVER write to the plugin installation directory.

4. Report the file path when done.

## Section Order

1. **Title + subtitle** — topic name and one-line description
2. **Overview** — 2-3 paragraph explanation of the core concept
3. **Diagrams** — at least one diagram (mermaid or SVG) showing architecture, flow, or relationships
4. **Key concepts** — table or definition list of important terms
5. **Side-by-side comparison** — JS approach vs target approach (use `.comparison` grid). Skip if not applicable.
6. **Callouts** — gotchas or insights (use `.callout` blocks)
7. **Summary** — quick-reference bullet list of takeaways

Adapt sections to fit the topic. Add multiple diagrams if needed. Diagrams can appear in any section, not just section 3.

## Choosing Diagram Type

| Use Mermaid | Use Inline SVG |
|-------------|----------------|
| Flowcharts, decision trees | Architecture overviews with spatial layout |
| Sequence diagrams | Layered diagrams (network stack, middleware pipeline) |
| State machines | Component relationship diagrams with custom positioning |
| Class/ER diagrams | Visual guides, concept maps |
| Simple linear flows | Anything needing precise control over layout and sizing |

Use both in the same page when appropriate.

## Mermaid Diagrams

Wrap in `<div class="mermaid">...</div>`. One diagram per concept.

## SVG Diagrams

Use inline `<svg>` elements for rich visual diagrams. SVG is zero-dependency, prints perfectly, and gives full control over layout.

### SVG Primitives

Use these building blocks:

```html
<!-- Box with label -->
<rect x="50" y="50" width="160" height="60" rx="4" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
<text x="130" y="85" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" fill="#1a1a1a">Component</text>

<!-- Rounded box with fill -->
<rect x="50" y="50" width="160" height="60" rx="4" fill="#f5f5f5" stroke="#1a1a1a" stroke-width="1.5"/>

<!-- Circle/ellipse -->
<ellipse cx="130" cy="80" rx="80" ry="35" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>

<!-- Diamond -->
<polygon points="130,30 210,80 130,130 50,80" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>

<!-- Arrow (line with marker) -->
<line x1="210" y1="80" x2="300" y2="80" stroke="#1a1a1a" stroke-width="1.5" marker-end="url(#arrow)"/>

<!-- Arrow label -->
<text x="255" y="72" text-anchor="middle" font-size="12" fill="#666">HTTP</text>
```

### Arrow Marker Definition

Include this `<defs>` block once per SVG:

```html
<defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
    <marker id="arrow-grey" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#666"/>
    </marker>
</defs>
```

### Example: Architecture Diagram

```html
<svg class="diagram" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
        </marker>
    </defs>

    <!-- Client -->
    <rect x="30" y="40" width="140" height="55" rx="4" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
    <text x="100" y="73" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#1a1a1a">Client</text>

    <!-- Server -->
    <rect x="250" y="40" width="140" height="55" rx="4" fill="#f5f5f5" stroke="#1a1a1a" stroke-width="1.5"/>
    <text x="320" y="73" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#1a1a1a">Server</text>

    <!-- Database -->
    <ellipse cx="320" cy="220" rx="70" ry="30" fill="#f5f5f5" stroke="#1a1a1a" stroke-width="1.5"/>
    <text x="320" y="225" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#1a1a1a">Database</text>

    <!-- Arrows -->
    <line x1="170" y1="67" x2="245" y2="67" stroke="#1a1a1a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="207" y="60" text-anchor="middle" font-size="12" fill="#666">HTTP</text>

    <line x1="320" y1="95" x2="320" y2="185" stroke="#1a1a1a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="335" y="145" font-size="12" fill="#666">Query</text>
</svg>
```

### SVG Style Rules

- Colors: only `#1a1a1a` (strokes, primary text), `#f5f5f5` (fills), `#666` (labels), `#e0e0e0` (secondary strokes)
- `stroke-width="1.5"` for all shapes
- `rx="4"` for rounded rectangles
- `fill="none"` for outline-only boxes, `fill="#f5f5f5"` for filled boxes
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Font size: `14` for labels inside shapes, `12` for arrow labels, `11` for secondary text
- Always set `viewBox` on the SVG element — never use fixed `width`/`height` so it scales responsively
- Keep diagrams simple and focused. One concept per diagram.

## Design Rules (non-negotiable)

- No gradients, no shadows, no decorative elements, no background images
- No rounded corners beyond 4px
- Three colors max: near-black (`#1a1a1a`), white (`#ffffff`), light gray (`#f5f5f5`). Secondary text: `#666`. Borders: `#e0e0e0`.
- System fonts only. No external font loading.
- Print-friendly. No elements that depend on color alone to convey meaning.

## HTML Template

Use this exact template. Modify content sections only.

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
        .diagram { width: 100%; height: auto; margin: 1.5rem 0; }
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
            pre, .mermaid, .comparison, .diagram { break-inside: avoid; }
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

    <!-- SVG diagram -->
    <svg class="diagram" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
            </marker>
        </defs>
        <!-- shapes and arrows here -->
    </svg>

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
- At least one diagram per page (mermaid or SVG)
- Use both diagram types in a single page when it serves the content
