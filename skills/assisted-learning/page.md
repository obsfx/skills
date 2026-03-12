---
name: page
description: >
  Use when the user wants to generate a static HTML reference page for a concept
  learned during an assisted-learning session. Triggers on: "create a page",
  "generate a page", "make a reference page", "save this as HTML", "I want a
  printable page", or when the user asks to document or save a concept as a
  standalone visual reference. Requires an active or recent learning conversation
  to extract content from.
---

# Page Generator

Generate clean, printable static HTML pages that explain and demonstrate concepts from assisted-learning sessions. Pages use mermaid diagrams for visual explanations and are designed for both screen reading and printing.

**Output location:** `docs/pages/<topic-slug>.html`

---

## Workflow

```
User requests a page
        |
        v
  Identify core concepts
  from current conversation
        |
        v
  Structure into sections:
  Overview > Diagrams > Details > Comparisons
        |
        v
  Write HTML using template below
        |
        v
  Save to docs/pages/<topic-slug>.html
```

## Page Structure

Every page follows this section order:

1. **Title + subtitle** — topic name and one-line description
2. **Overview** — 2-3 paragraph explanation of the core concept
3. **Mermaid diagram** — at least one diagram showing architecture, flow, or relationships
4. **Key concepts** — breakdown of important terms or components, use tables or definition lists
5. **Side-by-side comparison** — JS approach vs target approach (use `.comparison` grid)
6. **Callouts** — important gotchas or insights (use `.callout` blocks)
7. **Summary** — quick-reference bullet list of the most important takeaways

Adapt sections to the topic. Skip comparison if not applicable (e.g., pure architecture topic). Add multiple diagrams if the concept requires it.

## Mermaid Diagrams

Use mermaid for all visual explanations. Common diagram types:

| Concept Type | Mermaid Diagram | Use For |
|-------------|----------------|---------|
| Architecture | `graph TD` | System structure, component relationships |
| Data flow | `graph LR` | Request/response, pipelines, event flow |
| Sequence | `sequenceDiagram` | Interactions between components over time |
| State | `stateDiagram-v2` | Lifecycle, state machines |
| Decision | `graph TD` with diamonds | When to use X vs Y |
| Class | `classDiagram` | Object relationships, interfaces |

Wrap every diagram in:

```html
<div class="mermaid">
graph TD
    A[Start] --> B[Process]
    B --> C[End]
</div>
```

Keep diagrams focused. One diagram per concept, not one giant diagram for everything.

## Design Rules

These are non-negotiable:

- **No gradients.** Flat colors only.
- **No shadows.** Clean edges.
- **No decorative elements.** No icons, badges, or ornamental dividers.
- **No rounded corners beyond 4px.** Subtle, not bubbly.
- **No background images or patterns.**
- **Three colors maximum:** near-black (`#1a1a1a`), white (`#ffffff`), light gray (`#f5f5f5`). Use `#666` for secondary text, `#e0e0e0` for borders.
- **System fonts only.** `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif` for body. `"SF Mono", "Fira Code", "Cascadia Code", monospace` for code.
- **Print-friendly.** Everything must render correctly when printed. No elements that depend on color to convey meaning.

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
            pre, .mermaid, .comparison { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <h1>TOPIC TITLE</h1>
    <p class="subtitle">One-line description of the concept</p>

    <h2>Overview</h2>
    <p>...</p>

    <div class="mermaid">
    graph TD
        A[Component] --> B[Component]
    </div>

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

Convert topic to a URL-friendly slug:

- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Examples: `elixir-pattern-matching.html`, `kubernetes-pods.html`, `event-sourcing.html`

## Content Guidelines

- Extract content from the current conversation, do not invent new explanations
- Keep the JS developer perspective — include comparisons where relevant
- Write for someone reading this page without the conversation context
- Every section should stand on its own
- Prefer concrete examples over abstract descriptions
- Include at least one mermaid diagram — this is the primary advantage over plain text notes
