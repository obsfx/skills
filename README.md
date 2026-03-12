# Skills

A collection of composable skills for coding agents, focused on structured workflows that make agents more deliberate and effective.

## Installation

```bash
npx skills add https://github.com/obsfx/skills --skill software-architect
npx skills add https://github.com/obsfx/skills --skill assisted-learning
```

or

```bash
git clone https://github.com/obsfx/skills.git ~/.claude/skills/skills
```

### Verify Installation

Start a new session and ask for something that should trigger a skill (for example, "help me plan this feature" or "review the architecture"). The agent should automatically invoke the relevant skill.

## What's Inside

### Architecture & Planning

- **software-architect** — Structured design workflow with two modes: Design (new features, structural changes) and Review (analyze existing codebase for pain points). Enforces multi-solution analysis from a tech lead perspective, composable module design, and architecture-first planning. Generates incremental plan files in `docs/<plan-name>/`. Only proposes changes that genuinely matter.

### Learning & Knowledge

- **assisted-learning** — Assisted learning skill for JavaScript developers exploring new technologies. Teaches new programming languages (Elixir, Swift, Go, Rust), tools (Kubernetes, Docker, Terraform), and architectural approaches (microservices, CQRS, distributed systems) through side-by-side JS comparisons, ASCII diagrams, and real-world examples. Uses trekker as a persistent learning database across sessions. Always researches via context7 and web search before teaching. Recommends industry-standard approaches from a tech lead perspective.

## License

MIT License - see LICENSE file for details
