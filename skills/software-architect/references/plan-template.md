# Plan File Templates

Architecture-first plans. Define *what* and *why* — the implementing agent figures out *how* at the code level.

## 00-overview.md

```markdown
# [Feature Name]

## Goal
[1-2 sentences: what this achieves and why it matters]

## Architecture Decision
- **Chosen approach:** Option [X] — [name]
- **Reason:** [key tradeoff that decided it]
- **Rejected alternatives:** [name — why rejected, in one line each]

## Technology Decisions

| Decision | Choice | Why | Pitfalls |
|----------|--------|-----|----------|
| [e.g., Audio capture] | [e.g., CoreAudio API] | [system-level access, low latency] | [requires entitlements, macOS only] |
| [e.g., STT engine] | [e.g., Whisper via ONNX Runtime] | [offline, no API costs] | [model size ~75MB, CPU-bound without Metal] |
| [e.g., State management] | [e.g., Zustand] | [minimal boilerplate, good TS support] | [no devtools for complex state trees] |

For each technology decision, document:
- **Why this over alternatives** (specific technical reasons)
- **Compatibility** with existing project stack (versions, runtime, platform)
- **Pitfalls** discovered during research (known issues, limitations, gotchas)
- **Fallback** if this choice fails (what's plan B?)

## Done When
- [ ] [Concrete outcome — what exists, what works, what is delivered]

## Risk Register
| Risk | Impact | Mitigation |
|------|--------|------------|
| [risk] | [high/med/low] | [action] |
```

## 01-module-architecture.md

```markdown
# Module Architecture

**Depends on:** 00-overview.md

## Module Map

Define every module/class with its single responsibility:

| Module | Responsibility | Depends on | Exposes |
|--------|---------------|------------|---------|
| [e.g., AudioCapture] | Capture system audio stream | CoreAudio | AudioStream interface |
| [e.g., Transcriber] | Convert audio chunks to text | ONNX Runtime, Whisper model | TranscriptEvent |
| [e.g., SessionManager] | Manage recording lifecycle | AudioCapture, Transcriber | start/stop/pause |

## Module Flow

[Describe or use mermaid diagram showing data/control flow between modules]

## Interface Contracts

Define the boundaries between modules — inputs, outputs, events:

### [ModuleA] -> [ModuleB]
- **Input:** [what ModuleA passes — type/shape description, not code]
- **Output:** [what ModuleB returns]
- **Error contract:** [what happens on failure — retry, fallback, propagate]

## Directory Structure

Proposed file organization:
[tree structure showing where modules live relative to project root]

## Design Principles Applied
- **Separation of concerns:** [which responsibilities are isolated where]
- **DRY:** [shared abstractions and where they live]
- **Composability:** [how modules can be recombined or replaced independently]
```

## 02-data-and-state.md

```markdown
# Data Flow and State Management

**Depends on:** 01-module-architecture.md

## Data Model

Key entities and their relationships (not ORM schemas — conceptual model):

| Entity | Attributes (high-level) | Owned by | Lifecycle |
|--------|------------------------|----------|-----------|
| [e.g., Session] | id, startTime, status | SessionManager | created -> active -> completed |

## State Architecture

- **Where state lives:** [in-memory, persisted, hybrid]
- **State boundaries:** [which module owns which state — no shared mutable state]
- **Sync strategy:** [if multi-component, how state stays consistent]

## Data Flow

[Describe the path data takes through the system — from input to output]
[Use mermaid sequence or flowchart diagram]
```

## 03-integration-points.md

```markdown
# Integration Points

**Depends on:** 01-module-architecture.md, 02-data-and-state.md

## External Dependencies

For each external API, SDK, or system service:

### [Dependency Name]
- **What:** [what it provides]
- **API surface used:** [which specific APIs/endpoints — not code, but names and purpose]
- **Platform constraints:** [OS version, permissions, entitlements, runtime requirements]
- **Failure mode:** [what happens when unavailable — graceful degradation? hard fail?]
- **Compatibility notes:** [version pinning, known conflicts with other deps]

## Internal Integration

How modules wire together at runtime:
- **Initialization order:** [which modules must start first]
- **Event flow:** [pub/sub, callbacks, or direct calls — describe the pattern]
- **Cleanup/teardown:** [resource release order]
```

## 04-edge-cases-and-resilience.md

```markdown
# Edge Cases and Resilience

**Depends on:** 03-integration-points.md

## Failure Scenarios

| Scenario | Expected behavior | Recovery |
|----------|------------------|----------|
| [e.g., Audio device disconnected mid-capture] | [pause capture, notify user] | [auto-reconnect on device available] |
| [e.g., Model file missing/corrupt] | [fail fast with clear error] | [re-download or prompt user] |

## Resource Management
- **Memory:** [what allocates, what releases, when]
- **Concurrency:** [threads, async patterns, race condition guards]
- **Cleanup:** [what must be released on crash/force-quit]

## Platform-Specific Concerns
- [OS-specific behaviors, sandbox restrictions, permission flows]
```

## 05-implementation-sequence.md

```markdown
# Implementation Sequence

**Depends on:** All previous files

## Phases

Each phase produces a working (possibly incomplete) system.

### Phase 1: [Name — e.g., "Core pipeline"]
- **Goal:** [what works at the end of this phase]
- **Modules to build:** [from 01-module-architecture]
- **Done when:** [what outcome confirms this phase is complete]

### Phase 2: [Name]
...

## Dependency Order

[Which tasks block others — can reference trekker task IDs if available]

## Incremental Milestones
- After Phase 1: [what capability exists]
- After Phase 2: [what additional capability exists]
- Final: [complete system matching outcomes from 00-overview]
```

## Guidelines

- **No code snippets** — the implementing agent writes code; the architect defines structure
- **Name specific APIs and tools** — not "use an audio library" but "use CoreAudio AVAudioEngine"
- **Document pitfalls** — every technology choice should include known gotchas
- **Composable modules** — each module should be replaceable without rewriting dependents
- **No testing responsibility** — the architect defines structure and decisions, not how to verify them
- **Skip files** — if a section adds no value for this particular plan, omit it
