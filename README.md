# Skills

A collection of composable skills for coding agents, focused on structured workflows that make agents more deliberate and effective.

## Installation

```bash
npx skills add https://github.com/obsfx/skills --skill software-architect
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

## Plan File Structure

The software-architect skill generates incremental, architecture-first plan documents:

```
docs/<plan-name>/
  00-overview.md               # Goal, decisions, technology choices with pitfalls
  01-module-architecture.md    # Module map, interfaces, directory structure
  02-data-and-state.md         # Data model, state ownership, data flow
  03-integration-points.md     # External deps, platform constraints, wiring
  04-edge-cases-and-resilience.md  # Failure scenarios, resource management
  05-implementation-sequence.md    # Phased build order, incremental milestones
```

## Philosophy

- **Architecture before code** — Design the structure, then implement
- **Evidence over opinion** — Research current state of tools and APIs, don't rely on trained knowledge alone
- **Worth-it gate** — Only propose changes that are genuinely causing problems
- **Composable design** — Separation of concerns, DRY, modules connected through interfaces
- **Simplicity != laziness** — The simplest robust solution wins, but ignoring error handling is not simple

## License

MIT License - see LICENSE file for details
