# Language Learning — JS Developer Bridge

## Table of Contents
- [Teaching Flow](#teaching-flow)
- [Comparison Template](#comparison-template)
- [Concept Mapping Categories](#concept-mapping-categories)
- [Side-by-Side Patterns](#side-by-side-patterns)
- [Recommended vs Alternative](#recommended-vs-alternative)

---

## Teaching Flow

```
Identify target language
          |
          v
Map JS equivalent concepts
          |
          v
Find closest mental model
          |
          v
  Concept has JS equivalent?
  /                       \
 Yes                       No
 |                         |
 v                         v
Side-by-side           Explain from
comparison             first principles
 |                         |
 └───────────┬─────────────┘
             v
  Show idiomatic target code
             |
             v
Highlight gotchas and pitfalls
             |
             v
  Provide real-world use case
             |
             v
   Store learning in trekker
```

## Comparison Template

Use this structure for every concept comparison:

```markdown
## [Concept Name]

**JS Mental Model:** [What the JS dev already knows]
**[Target] Equivalent:** [The new concept]
**Key Difference:** [The critical shift in thinking]

### JavaScript
\`\`\`javascript
// JS approach
\`\`\`

### [Target Language]
\`\`\`[lang]
// Target approach
\`\`\`

### Why It's Different
[1-2 sentences on the paradigm shift]

### Gotcha
[Common mistake JS devs make with this concept]

### Industry Standard
[Which approach/pattern is recommended in production and why]
```

## Concept Mapping Categories

When teaching a new language, cover these categories in order:

| Priority | Category | JS Concept | Example Mapping |
|----------|----------|-----------|-----------------|
| 1 | Variables & Types | let/const, dynamic typing | Type system, mutability rules |
| 2 | Functions | arrow functions, closures | Function syntax, pattern matching |
| 3 | Data Structures | arrays, objects, Map/Set | Language-specific collections |
| 4 | Control Flow | if/else, switch, for/while | Pattern matching, guards, recursion |
| 5 | Async | Promise, async/await | Language-specific concurrency model |
| 6 | Modules | import/export, npm | Module system, package manager |
| 7 | Error Handling | try/catch, Error | Language-specific error patterns |
| 8 | OOP/FP Paradigm | class, prototype, .map/.filter | Language paradigm approach |
| 9 | Tooling | node, npm/pnpm, eslint | Build tools, REPL, linter |
| 10 | Ecosystem | Express, React, etc. | Popular frameworks/libraries |

## Side-by-Side Patterns

### Pattern: Variable Declaration
Show mutability rules side by side. JS devs assume everything is mutable by default.

### Pattern: Null Handling
JS has null/undefined. Map to Option/Maybe/nil patterns. This is usually the biggest paradigm shift.

### Pattern: Iteration
JS devs think in .map/.filter/.reduce. Show equivalent functional patterns AND the idiomatic way in the target language.

### Pattern: Async/Concurrency
JS has single-threaded event loop. This is where most languages diverge significantly. Explain the concurrency model from scratch using the event loop as a reference point.

### Pattern: Package Management
npm/pnpm is the JS dev's comfort zone. Map to the target ecosystem's package manager, registry, and dependency resolution.

## Recommended vs Alternative

When a language offers multiple ways to solve a problem:

```markdown
### [Problem]

| Approach | Recommended? | Why |
|----------|-------------|-----|
| Approach A | Yes | [Industry standard, performance, community convention] |
| Approach B | Situational | [When to use it and when not to] |
| Approach C | No | [Why it's discouraged — legacy, performance, readability] |

**Tech Lead Take:** [Which one passes code review and why]
```

Always provide the recommended approach first, then alternatives with clear reasoning.
