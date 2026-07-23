# Process

How work happens: the sources of truth, how they stay honest with each other,
and how work is planned, parallelized, and reviewed. This doc is the methodology
layer and stays project-agnostic; the PRD and the plan derive
their structure from it. How change is recorded is
[git.md](git.md)'s concern.

## The working loop

Front-loaded on distillation and direction before any build:

> Gather inspiration → distill the essence → set direction → design → plan implementation → deliver.

The brief and observations stages of the PRD (§The PRD) are the path toward the
design: gathering, distillation, and direction-setting. The **design file is the
designed solution** that path produces, transcribed into the design contract.
Planning the implementation lays out the milestone graph (§Milestones) from the
PRD and the design; delivery runs each milestone through the same cycle
(§The delivery cycle).

## The PRD

`docs/02-prd/` is the numbered product pipeline, read in order; each stage derives
from the ones before it:

| Stage | Owns |
| --- | --- |
| `01-brief.md` | The distilled intent: what it is, who it's for, the aesthetic, references |
| `02-observations.md` | Research and risks, each paired with the direction taken |
| `03-solution.md` | The settled design at concept level: concept, surfaces, systems |
| `04-design.md` | The design-token contract, transcribed from the design file |
| `05-architecture.md` | Stack, information architecture, repo structure, data layer |
| `06-plan.md` | The plan: the milestone graph (kinds, dependencies), cut from the stages above |

- **Observations follow the priority frame**, the order problems get worked in:
  1. **The Problem**: one or two sentences.
  2. **The Hardest Failure Mode**: what breaks worst; design around it first.
  3. **Key Design Decisions**: the load-bearing choices everything else hangs
     off.
  4. **What to Prototype First**: the riskiest slice to validate early; this
     names the proving surface.
- **Directions are research, not contract.** An observation's direction lands
  only when the design file (and its transcription in the design contract)
  adopts it; where they conflict, the design contract wins.

## Division of truth

Three authorities, each owning a different kind of truth and each with the
rules that keep it honest:

- **The repo holds law and state**: the PRD (ending in the plan,
  `docs/02-prd/06-plan.md`, the milestone list with live status), the standards,
  and the code; versioned, canonical for intent, contract, and work status. Docs and code
  change together **in the same change**; a discovery the docs missed (a
  token value, a variant, a breakpoint) is written back to the owning doc,
  never left in a commit message or comment. Docs carry intent and contract;
  function-level detail belongs in the code. Each fact lives in exactly one
  owning doc: everywhere else points or summarizes, never restates, and when
  two docs disagree the owner wins. The plan's milestone status is work state,
  not contract; a fact that matters beyond a milestone moves to the owning doc.
- **Figma holds pixels**: design questions resolve against the Figma nodes,
  not guesswork. Use structured design context (metadata/variables/code), not
  screenshots, when reading Figma. A component isn't done until it's been
  compared against its Figma node at desktop and mobile widths.
- **GitHub holds review**: PRs, machine checks, preview deploys. Nothing
  lives only on GitHub; a milestone's status flips in the plan, in the
  same PR as the work that completes it.

When all three still leave a question genuinely ambiguous, ask; don't
improvise the product.

## The delivery cycle

Every milestone runs the same three phases. The human steers at the two cheap
points (the plan and the gate); agents and machines carry the middle.

1. **Plan.** Scope comes from the PRD and the design frames: cut the
   milestone into tasks by file ownership, map dependencies, mark trunk vs
   leaf, tracked as task branches and PRs. An unknown that blocks the cut
   gets a **spike** first: a throwaway experiment answering one question;
   spike code is never merged, its answer is written back to the owning doc.
   The human approves the cut before execution; steering a plan costs
   minutes, steering merged code costs days.
2. **Execute.** Trunk tasks merge serially first; leaf tasks fan out in
   parallel worktrees. Every task PR must pass the machine checks and an
   agent review before merge (§Review).
3. **Gate.** The human reviews outcomes on the milestone branch's deployed
   preview against the design frames at desktop and mobile widths, plus the
   milestone's merged task PRs. Outcomes, not diffs; a human reads
   code only on escalation.

## Milestones: the human gates

A milestone is a reviewable increment behind a human gate, instantiated as an
**entry in the plan** (`docs/02-prd/06-plan.md`) binding it to concrete scope, a
definition of done, and a status; its tasks are cut at its plan step and tracked
as branches and PRs. Milestones form a dependency graph, not a fixed sequence, laid
out in the plan (§The PRD, `06-plan.md`); three kinds set what may run in
parallel:

| Kind | The work | Parallelism |
| --- | --- | --- |
| **System** | Creates or proves shared conventions: scaffold, tokens, the shell | Serial; nothing may consume unproven conventions |
| **Surface** | Delivers one surface on conventions already proven | Parallel with other surface milestones, as sibling branches with independent gates |
| **Sweep** | One cross-cutting pass over everything: coherence, polish, audits, launch | Serial, after the surfaces it sweeps |

- **System milestones gate on a specimen.** A system milestone has no surface
  to review, so its gate reviews a specimen artifact instead: a design-system
  page rendering every token, ramp, and primitive, compared against the design
  system file. The specimen stays in the site as a living styleguide route.
- **The readiness rule.** A milestone may open when everything it consumes is
  merged and its inputs are settled: design frames in the design file, content
  in the data source. An unready surface (undesigned, content missing) is a
  waiting node, never a blocker for its siblings.
- **The proving surface.** The first surface milestone is chosen deliberately:
  the riskiest or most representative surface, named by the observations
  stage, built through every layer end to end. Its gate is what unlocks
  surface parallelism; the milestone graph may scope it tighter than a full
  surface.
- **The canonical arc.** Foundations (system) → the proving surface → the
  remaining surfaces in parallel → polish and launch sweeps. Parallelism is
  earned: it begins only once the proving surface's gate passes.
- **Launch is a sweep** with a checklist gate: metadata and SEO verified,
  analytics live, performance budgets met, domain cut over.

## Tasks: the agent work units

A task is one unit of work an agent can complete unattended, carrying goal,
kind, owned files, dependencies, acceptance criteria, verification commands, and
the Figma node when visual; it lives as a branch and PR, not a persisted doc
entry.

- **Scope by file ownership.** A task lists the file globs it owns; two
  tasks may run in parallel only if their owned sets don't overlap. The same
  disjointness applies across sibling milestone branches.
- **Trunk, then fan out.** Work touching shared files (theme, layout shell,
  constants, utils) is a *trunk* task, serialized at the start of its
  milestone; *leaf* tasks (components, pages) fan out afterwards in parallel
  worktrees.
- **Shared discoveries become system work.** When parallel work uncovers a
  shared need (a primitive two surfaces want), it lands on `main` as its own
  small system task and sibling branches merge `main` forward; never two
  parallel copies of the same convention.
- **Check the plan and open branches at task start**: the milestone's scope
  and the sibling tasks in flight bound what may run in parallel.
- **Status flips with the work.** A task moves through its branch and PR
  (open → in-review → merged) in the same PR as the change it describes;
  blocked is a state carried on the PR, not a comment.

## Branches and PRs

- One branch per milestone (`feat/m02-works`), cut from `main`.
- One branch per task (`feat/m02-t04-works-ledger`), PR'd into the milestone
  branch; the PR flips its task's status in the same diff.
- The milestone branch PRs into `main` at the gate; merge `main` forward into
  any milestone branch that runs long.

## Review

Three tiers, split by kind, not by priority:

- **Machines check mechanics.** Lint, types, tests, build, and a green preview
  deploy gate every PR; a human never spends attention on what CI can catch.
- **Agents review correctness.** Every task PR, against the standards and
  the task's acceptance criteria.
- **Humans review taste.** At plan and gate only (§The delivery cycle): the
  qualities no check can score; fidelity to the design, motion feel, whether
  the thing is good.

## The board

The board is a query, not a service: milestone status lives in the plan and
task status is the state of its open branches and PRs, so `docs/02-prd/06-plan.md`
plus the live PRs are always the board and git history is the audit trail.
Nothing is mirrored to an external tracker.
