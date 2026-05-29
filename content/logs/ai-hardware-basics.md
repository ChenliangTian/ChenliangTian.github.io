---
title: "AI Hardware & Model Fundamentals"
date: "2025-12-17"
tags: ["AI", "Hardware"]
description: "A comprehensive overview of AI chips, model lifecycle, frameworks, and decoding parameters."
---

# AI Learning Notes

Below are my notes on the fundamentals of AI hardware, models, and how LLMs generate text.

## 1. Hardware Basics

**Q: What are AI Chips and how do they differ from CPUs?**

**A:** AI chips (like GPUs, TPUs, NPUs) are specialized processors designed for parallel processing. Unlike CPUs which handle tasks sequentially, AI chips perform massive amounts of simple calculations (math operations) simultaneously, which is essential for neural networks.

**Key Players:** NVIDIA (GPU), Google (TPU), Apple/Qualcomm (NPU for edge devices).

## 2. Model Fundamentals

**Q: What exactly is an AI Model?**

**A:** Think of it as an engine. It consists of **Architecture** (the blueprint), **Parameters** (the adjustable knobs/knowledge), and is fueled by **Training Data**. It's a mathematical framework that learns rules from data rather than being explicitly programmed.

## 3. The Lifecycle: Training vs. Inference

**Q: Is "Inference" part of the training process?**

**A:** No, they are distinct phases.

- **Training (The "Study" Phase):** Compute-intensive. The model learns by constantly adjusting its parameters to minimize errors.
- **Inference (The "Exam" Phase):** The model is deployed with fixed parameters. It applies what it learned to new, unseen data to make predictions.

## 4. Frameworks

**Q: What is TensorFlow?**

**A:** It is an open-source end-to-end platform developed by Google. It provides the tools and libraries to build, train, and deploy machine learning models. It uses **Tensors** (multi-dimensional arrays) as the fundamental data structure.

## 5. How LLMs "Think" (Parameters)

**Q: How do LLM parameters decide the output for a human?**

**A:** It involves two layers:

1.  **Learned Parameters (Weights & Biases):** These are the billions of numbers stored in the model. They calculate the probability of every possible next word.
2.  **Decoding Hyperparameters (The Decision Makers):** These are external settings that choose which word to actually pick from those probabilities.

## 6. Decoding Strategy Example

**Q: How do settings like "Temperature" change the result?**

**A:** Temperature controls randomness.

- **Low Temperature (e.g., 0.1):** Chooses the most probable words. Result is factual, robotic, and safe.
- **High Temperature (e.g., 0.8):** Allows lower-probability words. Result is creative, diverse, and sometimes surprising.

### Example Scenario

**Prompt:** "The lighthouse keeper saw a green glow..."

- **Low Temp Output:** "...and wrote the time: 23:17." (Logical)
- **High Temp Output:** "...and realized the clocks had stopped forever." (Creative)
