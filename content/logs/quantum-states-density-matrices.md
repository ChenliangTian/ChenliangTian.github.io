---
title: "Quantum States & Density Matrices"
date: "2026-05-29"
tags: ["Quantum", "Quantum Information", "Density Matrices", "Learning"]
description: "The mathematical toolkit for representing pure and mixed quantum states — state vectors, density matrices, and why coherence lives in the off-diagonal terms."
---

Today I picked up the basic mathematical tools for representing quantum states and their physical meaning — the building blocks behind decoherence, entanglement, fidelity, and quantum communication.

## The toolkit at a glance

| Concept | Mathematical form | Physical meaning |
| --- | --- | --- |
| State vector | $\lvert\psi\rangle$ | Describes a pure quantum state |
| Bra vector | $\langle\psi\rvert$ | Conjugate transpose of $\lvert\psi\rangle$ |
| Density matrix | $\rho$ | Describes pure *or* mixed quantum states |
| Outer product | $\lvert\psi\rangle\langle\psi\rvert$ | Builds a pure-state density matrix |
| Diagonal entries | $\rho_{00},\ \rho_{11}$ | Measurement probabilities in the chosen basis |
| Off-diagonal entries | $\rho_{01},\ \rho_{10}$ | Coherence / phase relationship between basis states |
| Eigenvectors | $\lvert\phi_i\rangle$ | The basis states that diagonalize $\rho$ |
| Eigenvalues | $\lambda_i$ | Probabilities in that diagonalized basis |
| Diagonalization | $\rho=\sum_i \lambda_i\lvert\phi_i\rangle\langle\phi_i\rvert$ | Rewriting $\rho$ as a classical mixture of orthogonal states |

## The key distinction: pure vs. mixed

The single most important idea here:

> $\lvert\psi\rangle$ describes **one** pure quantum state, while $\rho$ can describe **either** a pure state or a mixed state.

A state vector $\lvert\psi\rangle$ is always a single, definite (pure) state. The density matrix $\rho$ is more general — it can also capture a *statistical mixture* of states, which is exactly what we need to reason about noise and decoherence.

## A worked example

Take the pure state

$$
\lvert+\rangle=\frac{\lvert0\rangle+\lvert1\rangle}{\sqrt{2}}.
$$

Its density matrix is the outer product $\lvert+\rangle\langle+\rvert$:

$$
\rho_{+}=\begin{pmatrix} \frac{1}{2} & \frac{1}{2} \\[4pt] \frac{1}{2} & \frac{1}{2} \end{pmatrix}.
$$

Now compare it with the **mixed** state — an even classical mixture of $\lvert0\rangle$ and $\lvert1\rangle$:

$$
\rho_{\text{mixed}}=\tfrac{1}{2}\lvert0\rangle\langle0\rvert+\tfrac{1}{2}\lvert1\rangle\langle1\rvert=\begin{pmatrix} \frac{1}{2} & 0 \\[4pt] 0 & \frac{1}{2} \end{pmatrix}.
$$

The two share **the same diagonal** but have **different off-diagonal** terms:

- **Same diagonal** → identical $0/1$ measurement statistics in the computational basis.
- **Different off-diagonal** → physically different states.

That off-diagonal difference *is* the coherence. The state $\lvert+\rangle$ holds a definite phase relationship between $\lvert0\rangle$ and $\lvert1\rangle$; the mixed state has none. Measuring in the computational basis discards that information, which is why the two look identical there — but measure in the $\lvert+\rangle/\lvert-\rangle$ basis and they behave completely differently.

## Why it matters

These are the core mathematical building blocks for almost everything that follows:

- **Decoherence** — the decay of those off-diagonal coherence terms over time.
- **Entanglement** — correlations that no product state or classical mixture can reproduce.
- **Fidelity** — how close two quantum states are, defined directly on density matrices.
- **Quantum communication** — where preserving coherence across a network is the whole game.
