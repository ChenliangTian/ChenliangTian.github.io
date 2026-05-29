---
title: "Decoherence"
date: "2026-05-30"
tags: ["Quantum", "Foundations"]
description: "How a coherent quantum state loses its phase relationship — pure dephasing, the decay of the off-diagonal terms, and why it is not the same as a controlled phase shift."
---

A coherent superposition is only as useful as the *phase relationship* it holds.
Today I reviewed how that relationship decays — **decoherence** — and built an
interactive simulator to make the picture concrete.

## The starting point: a clean superposition

Take the canonical equal superposition,

$$
\lvert\psi\rangle=\frac{1}{\sqrt{2}}\bigl(\lvert0\rangle+\lvert1\rangle\bigr),
$$

whose density matrix carries equal diagonal *populations* and full off-diagonal
*coherences*:

$$
\rho(0)=\begin{pmatrix} \tfrac{1}{2} & \tfrac{1}{2} \\[4pt] \tfrac{1}{2} & \tfrac{1}{2} \end{pmatrix}.
$$

The off-diagonal terms $\rho_{01},\rho_{10}$ are the whole story: they encode the
definite phase between $\lvert0\rangle$ and $\lvert1\rangle$.

## Pure dephasing

In **pure dephasing**, the populations are untouched — what decays is the phase.
Across an ensemble (many copies of the state, or one state entangled with an
environment), each copy slowly acquires a slightly different relative phase. When
we average over those unknown phases, the off-diagonal terms shrink exponentially:

$$
\rho_{01}(t)=\rho_{01}(0)\,e^{-t/T_2},
$$

while the diagonal stays put:

$$
\rho_{00}=\rho_{11}=\tfrac{1}{2}.
$$

$T_2$ is the **coherence time** — the timescale over which the shared phase
relationship survives. As $t$ grows, the density matrix slides from a coherent
superposition toward a **classical mixture**:

$$
\begin{pmatrix} \tfrac{1}{2} & \tfrac{1}{2} \\[4pt] \tfrac{1}{2} & \tfrac{1}{2} \end{pmatrix}
\;\longrightarrow\;
\begin{pmatrix} \tfrac{1}{2} & 0 \\[4pt] 0 & \tfrac{1}{2} \end{pmatrix}.
$$

## See it move

The simulator below shows the same process three ways at once. The **phase
ensemble** (left) draws many copies of the state as overlaid wave segments; the
**coherence vector** (middle) draws each copy as a phasor on the unit circle and
sums them; the **density matrix** (right) updates $\rho_{01}=\tfrac{1}{2}e^{-t/T_2}$
in real time. Press play, then try widening the phase noise or shortening $T_2$.

<DecoherenceLab />

A useful way to read it: the bold average wave (left) and the bold resultant arrow
(middle) are the *same quantity* — the surviving coherence
$\lvert\langle e^{i\phi}\rangle\rvert = e^{-t/T_2}$. Both shrink as the individual
phases fan out, even though every individual copy still has unit amplitude.

## The key distinction: controlled shift ≠ decoherence

This is the point worth internalizing. A **controlled phase shift** — a gate like
$\lvert1\rangle \to e^{i\theta}\lvert1\rangle$ — moves *every* copy by the *same*
amount. The phasors all rotate together; the average vector turns but keeps its
length, and coherence is preserved. Drag the **controlled phase shift** slider in
the simulator: the whole pattern rotates rigidly, and $\rho_{01}$ keeps its
magnitude.

**Decoherence** is different. The phase becomes *uncertain* across copies — because
of environmental entanglement or fluctuating fields — so different members acquire
different, unknown phases. Averaging over that ignorance is what collapses the
off-diagonal terms. Nothing rotated the state on purpose; we simply lost track of
the phase.

## Takeaway

Decoherence (at least pure dephasing) acts on the density matrix mainly by
**suppressing the off-diagonal terms** while leaving the populations alone:

$$
\begin{pmatrix} \tfrac{1}{2} & \tfrac{1}{2} \\[4pt] \tfrac{1}{2} & \tfrac{1}{2} \end{pmatrix}
\;\longrightarrow\;
\begin{pmatrix} \tfrac{1}{2} & 0 \\[4pt] 0 & \tfrac{1}{2} \end{pmatrix}.
$$

Visually, that is the loss of a stable, shared phase relationship — the moment a
quantum superposition stops behaving quantumly and starts looking like a classical
coin flip. For quantum communication, keeping that average arrow long across a
network *is* the engineering problem.
