# obsfx-skills

A Claude Code plugin with composable skills for coding agents — structured workflows for learning, architecture, and planning.

## Installation

```bash
# Add the marketplace
claude plugin marketplace add obsfx/skills

# Install the plugin
claude plugin install obsfx-skills
```

Or in Claude Code interactive mode:

```
/plugin marketplace add obsfx/skills
/plugin install obsfx-skills
```

### Verify Installation

Start a new session and ask for something that should trigger a skill (for example, "help me plan this feature" or "teach me about Kubernetes"). The agent should automatically invoke the relevant skill.

## Components

| Component | Type | Purpose |
|-----------|------|---------|
| `assisted-learning` | skill | Teach new technologies to JS developers through comparisons and diagrams |
| `software-architect` | skill | Design, plan, and review software architecture |
| `/obsfx-skills:page` | command | Generate a static HTML reference page from a learning session |

## Skills

Skills are auto-activated by the agent when the conversation matches their description. You don't invoke them manually — they load as context when relevant.

### assisted-learning

Teaches new programming languages (Elixir, Swift, Go, Rust), tools (Kubernetes, Docker, Terraform), and architectural approaches (microservices, CQRS, distributed systems) to JavaScript developers. Every concept is mapped to a JS mental model with side-by-side comparisons.

- Researches via context7 and web search before teaching
- Uses trekker as a persistent learning database across sessions
- Recommends industry-standard approaches from a tech lead perspective

### software-architect

Structured design workflow with two modes:

- **Design** — new features, structural changes. Enforces multi-solution analysis, composable module design, and architecture-first planning.
- **Review** — analyze existing codebase for pain points and improvement opportunities.

Generates incremental plan files in `docs/<plan-name>/`.

## Commands

### `/obsfx-skills:page [topic-slug]`

Generates a clean, printable static HTML page that explains a concept from the current assisted-learning session. Writes to `docs/pages/<topic-slug>.html` in your project root.

- Uses mermaid for flowcharts, sequences, and state diagrams
- Uses inline SVG for rich spatial diagrams (architecture overviews, concept maps)
- Standalone HTML files — no external dependencies beyond mermaid CDN
- Minimal design: three colors, system fonts, no gradients — prints cleanly on paper

```
/obsfx-skills:page elixir-pattern-matching
/obsfx-skills:page kubernetes-pods
```

## License

MIT License - see LICENSE file for details
