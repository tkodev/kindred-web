# Matching

A preliminary model for turning two questionnaires into one compatibility score with a per-dimension breakdown. This is a design, not a shipped implementation: the seed reveals return authored numbers, and this doc is the contract the real `friends.reveal` must grow into. What a member can answer is [03-profile.md](03-profile.md)'s concern.

## Principles

1. **Only profile answers feed the score.** No behavioral surveillance, no third-party data: the input is exactly what a member entered ([03-profile.md](03-profile.md)). The score must be explainable back to those answers.
2. **The pair is the unit, and the score is symmetric.** `score(a, b) == score(b, a)`. A dimension may be asymmetric internally (one person's dealbreaker), but the headline is order-independent.
3. **Compatibility is not sameness.** Some dimensions reward similarity (values), some reward complementarity (social energy), some are one-directional gates (dealbreakers). The model encodes which is which per dimension, rather than assuming "closer is better" everywhere.
4. **Absence is uncertainty, not a zero.** A sparse profile widens the confidence band and pulls the score toward a neutral prior; it never fabricates a high or low match.

## Pipeline

Both profiles become feature vectors, each dimension scores the pair, dimensions combine under intent-aware weights, and the result is calibrated to a legible 0–100.

| Stage | What happens |
| --- | --- |
| Extract | Each category's answers become typed features: numeric scales normalized to 0–1, chips and enums as (possibly weighted) sets, free text as embeddings |
| Score per dimension | Each dimension maps the two feature sets to a 0–1 sub-score with its own rule (similarity, overlap, or gate) |
| Weight and combine | Sub-scores combine as an intent-weighted mean, minus any dealbreaker penalty |
| Calibrate | The raw 0–1 is mapped through a monotonic curve fit so the 0–100 output matches human intuition, and rounded |

## Dimensions

The five axes returned in a `CompatibilityResult`, each with a combination rule chosen for what actually predicts a good pairing.

| Dimension | Drawn from | Rule |
| --- | --- | --- |
| Values | `self` (relationship intent, religion, politics, kids), `background` | Weighted similarity, with hard gates on declared dealbreakers |
| Lifestyle | `going out`, `interests` habits, `professional` work attitude | Similarity on rhythm and habits |
| Interests | `interests`, `music`, `screen` tags | Set overlap (Jaccard) with a bonus for shared *favorites* |
| Social energy | `going out` scales (loud settings, spontaneity) | Complementarity-aware: near-match rewarded, extreme mismatch penalized, mild difference neutral |
| Ambition | `professional` drive and industry alignment | Similarity, softened so different fields still match on drive |

## Signals

1. **A favorite star is a heavier weight.** A starred chip contributes more to overlap than an ordinary tag: shared favorites are the strongest positive interest signal.
2. **A dealbreaker is a gate, not a penalty.** Where a member marks a value as non-negotiable (e.g. wants kids), a conflicting answer caps the Values dimension low regardless of other overlap, so a high total can never paper over an incompatibility on something declared essential.
3. **Intent reweights everything.** "Here for friends" and "here for dating" are different objective functions over the same dimensions: friendship leans on Interests and Lifestyle, dating raises Values and adds intent-specific gates. The pair's mutual intent selects the weight profile; asymmetric intent (one dating, one not) is surfaced honestly rather than blended away.

## Cold start and confidence

1. **New or thin profiles fall back to the category priors** and report lower confidence; the UI can widen or soften a low-confidence reveal rather than assert a precise number.
2. **Confidence rises with mutual completeness**, so the reveal doubles as a nudge to finish the profile ([03-profile.md](03-profile.md) §Requirements).

## Where it lives

`friends.reveal` computes and returns the `CompatibilityResult`; scoring is pure and unit-testable over two `Profile` inputs, kept out of the transport layer so it can be evaluated offline against a labeled set before it ships. Persistence records a revealed score so it is stable across sessions ([07-architecture.md](07-architecture.md)).
