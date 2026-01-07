# 05 — Validation Engine (Invariant-Based)

## 1) Validation stages
### Stage A: Structural
- Trigger present (MVP: one trigger)
- Graph connected from trigger to at least one terminal Stop
- If/Else nodes:
  - each branch output connected
  - else output connected if elseEnabled
- No orphan required nodes (node exists but not reachable)

### Stage B: Configuration completeness
For each node type:
- check required fields exist and are non-empty
- type checks (numbers are numbers, booleans are booleans)
- enumerations valid (notify channel)

### Stage C: Requirements rules
Evaluate scenario requirements, producing teachable errors.

### Stage D: Simulation test cases
Run simulation per test case and compare outcomes:
- messages emitted
- tags added/removed
- fields updated
- tasks created
- notifications created
- webhooks fired

Pass only if ALL test cases pass.

---

## 2) Rule types (starter set)
- triggerIs { value }
- triggerConfigEquals { field, value }
- mustHaveNode { value: nodeType }
- forbidNodeType { value: nodeType }
- nodeConfigRequired { nodeType, fields[] }
- nodeOrder { sequence[] }  (exists a path where these nodes appear in order)
- mustContainIfElse { minCount? }
- branchCountAtLeast { nodeType: "ifElse", count: N }
- pathMustInclude { nodeTypes[] }
- requireStopPath { } (at least one Stop reachable)

---

## 3) Error messaging requirements
Each validation error must include:
- WHAT failed
- WHY it matters (1 sentence)
- WHERE to fix (node id/type)
- NEXT step suggestion

Example:
> Missing config: sms.send.body is empty  
> Why: a send action cannot run without a message body  
> Fix: select the SMS node and fill “Body”.

---

## 4) Acceptable variants policy
Allow learners to add:
- extra guardrail checks
- extra logging tags/notes
as long as test cases still pass and forbidden nodes aren’t used.

---

## 5) Anti-cheat options (optional)
- hints ladder
- do not reveal correct answers until pass
- log “solution reveal” usage if enabled
