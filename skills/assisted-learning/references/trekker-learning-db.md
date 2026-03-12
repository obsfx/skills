# Using Trekker as a Learning Database

## Table of Contents
- [Concept](#concept)
- [Structure](#structure)
- [Workflows](#workflows)
- [Search Patterns](#search-patterns)

---

## Concept

Trekker doubles as a persistent learning database across sessions. Structure:

- **Epics** = Learning topics (e.g., "Learning Elixir", "Kubernetes Fundamentals")
- **Tasks** = Individual concepts within a topic
- **Subtasks** = Sub-concepts or exercises
- **Comments** = Learning notes, insights, gotchas, reference links
- **Tags** = Cross-topic categorization (e.g., "concurrency", "async", "deployment")

```
Epic: Learning Elixir
 ├── Task: Pattern Matching
 │    ├── Subtask: Guard clauses
 │    └── Comment: JS equivalent is switch + destructuring
 ├── Task: GenServer
 │    └── Comment: Like a stateful EventEmitter
 └── Task: OTP Supervision
      ├── Comment: No JS equivalent - new concept
      └── Subtask: Supervision strategies
```

## Structure

### Epic Creation (per learning topic)
```
trekker epic create -t "Learning [Topic]" -d "JS developer learning [topic]. Key areas: [list]"
```

### Task Creation (per concept)
```
trekker task create -t "[Concept]" -d "JS equiv: [X]. Key diff: [Y]. Status: [learning/understood/mastered]" -e EPIC-N --tags "category1,category2"
```

### Learning Notes as Comments
```
trekker comment add TREK-N -a "learner" -c "Insight: [what I learned]. Gotcha: [common mistake]. Resource: [link]"
```

### Progress Tracking via Status
| Status | Meaning |
|--------|---------|
| `todo` | Not started learning |
| `in_progress` | Currently studying |
| `completed` | Understood and can apply |

## Workflows

### Starting a New Topic
1. Create epic for the topic
2. Research core concepts via context7 and web search
3. Create tasks for each concept (ordered by learning priority)
4. Add dependencies (concept B requires understanding concept A)
5. Start with first unblocked task

### Recording a Learning Session
1. Set task to `in_progress`
2. Add comments with insights as you learn
3. Include JS comparisons in comments
4. When concept is understood, add summary comment
5. Set task to `completed`

### Cross-Session Continuity
Before session ends:
```
trekker comment add TREK-N -a "learner" -c "Checkpoint: understood [X]. Next: explore [Y]. Questions: [Z]"
```

Next session start:
```
trekker task list --status in_progress
trekker comment list TREK-N
```

## Search Patterns

Find related concepts across topics:
```
trekker search "concurrency" --type task
trekker search "async" --type comment
trekker search "pattern matching" --type task,comment
```

Find all learnings for a specific topic:
```
trekker task list --epic EPIC-N
```
