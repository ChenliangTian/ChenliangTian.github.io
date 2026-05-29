---
title: "Decoherence"
date: "2026-05-30"
tags: ["Quantum", "Foundations"]
description: "The two ways a qubit decoheres — dephasing (phase information lost, T₂) and relaxation (population/energy lost, T₁) — with an interactive simulator for the dephasing channel."
---

A coherent superposition is only as useful as the *phase relationship* it holds.
Today I reviewed how that relationship decays — **decoherence** — and built an
interactive simulator to make the picture concrete.

## Two ways a qubit decoheres

For a single qubit, decoherence is not one process but two distinct channels:

$$
\boxed{\;\text{dephasing} = \text{phase information lost}\;}
$$

$$
\boxed{\;\text{relaxation} = \text{population/energy lost}\;}
$$

**Dephasing** ($T_2$) scrambles the *relative phase* between $\lvert0\rangle$ and
$\lvert1\rangle$ while leaving the populations alone — it kills the off-diagonal
terms. **Relaxation** ($T_1$) is the qubit *losing energy* to its environment, the
excited state decaying toward the ground state — it moves the diagonal. Most of
this note (and the simulator) is about dephasing; relaxation gets its own section
at the end.

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

## Dephasing (T₂): phase information lost

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

## Relaxation (T₁): population/energy lost

Dephasing leaves the diagonal alone. **Relaxation** does not. Here the qubit
*exchanges energy* with its environment: the excited state $\lvert1\rangle$ decays
toward the ground state $\lvert0\rangle$ (spontaneous emission), an "amplitude
damping" process governed by the **relaxation time** $T_1$. The excited population
decays exponentially,

$$
\rho_{11}(t)=\rho_{11}(0)\,e^{-t/T_1},
\qquad
\rho_{00}(t)=1-\rho_{11}(0)\,e^{-t/T_1},
$$

so the *diagonal itself moves*. Crucially, the two channels relax toward different
states. Pure dephasing from $\lvert+\rangle$ erases the phase but keeps the 50/50
split — it lands on the **maximally mixed** state. Relaxation instead drains energy
until the qubit sits in the ground state:

$$
\underbrace{\begin{pmatrix} \tfrac{1}{2} & 0 \\[4pt] 0 & \tfrac{1}{2} \end{pmatrix}}_{\text{dephasing} \to \text{maximally mixed}}
\qquad\text{vs.}\qquad
\underbrace{\begin{pmatrix} 1 & 0 \\[4pt] 0 & 0 \end{pmatrix}}_{\text{relaxation} \to \text{ground state}}.
$$

Energy loss also destroys phase as a side effect, so $T_1$ feeds into $T_2$. The
standard relation is

$$
\frac{1}{T_2}=\frac{1}{2T_1}+\frac{1}{T_\varphi},
$$

where $T_\varphi$ is the *pure* dephasing time (phase scrambling with no energy
loss). Two consequences worth remembering: relaxation always contributes to
dephasing, and therefore $T_2 \le 2T_1$ — you can never keep phase coherence longer
than energy relaxation allows.

## Takeaway

For a single qubit, decoherence runs on two channels:

- **Dephasing ($T_2$)** suppresses the **off-diagonal** terms while leaving
  populations fixed — *phase information lost*. From $\lvert+\rangle$ it lands on
  the maximally mixed state.

$$
\begin{pmatrix} \tfrac{1}{2} & \tfrac{1}{2} \\[4pt] \tfrac{1}{2} & \tfrac{1}{2} \end{pmatrix}
\;\longrightarrow\;
\begin{pmatrix} \tfrac{1}{2} & 0 \\[4pt] 0 & \tfrac{1}{2} \end{pmatrix}.
$$

- **Relaxation ($T_1$)** moves the **diagonal**, draining the excited population
  toward the ground state — *population/energy lost*.

$$
\begin{pmatrix} 0 & 0 \\[4pt] 0 & 1 \end{pmatrix}
\;\longrightarrow\;
\begin{pmatrix} 1 & 0 \\[4pt] 0 & 0 \end{pmatrix}.
$$

Visually, dephasing is the loss of a stable, shared phase relationship — a quantum
superposition starting to look like a classical coin flip — while relaxation is the
qubit simply running out of energy. For quantum communication, keeping that average
phase arrow long *and* holding excited populations alive across a network is the
engineering problem.
