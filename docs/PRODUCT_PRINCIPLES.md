# Product Principles v2.0

## Purpose

Reusable product principles for future apps built on this template. The principles come from guided-work product work, but this document is not a specification for any single application.

The goal is to digitize professional knowledge, decision support, and workflows in a consistent way.

## Core Decision

A = digital document/form  
B = guided work experience

Recommendation: B.

Apps should primarily be built as guided work experiences. Documents, forms, and tables can still exist, but they should support the work instead of being the main experience.

## From Quiz Engine to Guided Workflow Engine

The platform concept is `Guided Workflow Engine`.

A quiz-like experience can be a good UI pattern when the user answers one question at a time, but quiz is not the architecture. A `Guided Workflow Engine` also covers:

- work steps
- questions
- decisions
- help text
- domain terms
- conditional logic
- progressive disclosure
- background document generation
- setup before start
- reusable patterns between apps

Do not use `Quiz Engine` as the platform term. Prefer `Guided Workflow Engine`, `guided workflow`, `work step`, `decision support`, or `question bank`.

## The 15 Product Principles

### 1. Digitize knowledge, not documents

Start from the knowledge a document represents, not from recreating paper on screen.

### 2. Source documents are knowledge, not UI specs

Original documents help the team understand content and terms. They should not drive the UI line by line.

### 3. Guided workflow before forms

Forms work when the user already knows what to fill in. Guided work splits the task into clear steps.

### 4. Documents are created in the background

The finished document is a result of the work, not necessarily the workspace.

### 5. Write as little as possible

Prefer choices, short decisions, reusable options, help text, and smart defaults.

### 6. Intelligent question / work-step bank

Model reusable blocks: question, decision, explanation, condition, category, recommendation, document effect.

### 7. Progressive disclosure

Show only what the user needs now.

### 8. Positive productivity

The experience should feel like help, not control.

### 9. Mobile first

Design for use close to the work. Desktop can add overview.

### 10. Everyday language and domain language

Simple, concrete, professional. Avoid unnecessary system jargon.

### 11. Experience is as important as function

UX, wording, empty states, and visual rhythm are product, not decoration.

### 12. Reusable Guided Workflow Engine

Do not build one-off guided flows per app. This document states the principle; it does not implement the engine.

### 13. Adapt before start

Let the user scope the flow when relevant: project type, role, coverage, risk level.

### 14. One question or decision at a time when it fits

Use the pattern that best supports the decision in front of the user.

### 15. Overview and tables only where they add value

If the user needs guidance, start with guided workflow. If the user needs control, use a table or dashboard.

## Design and Architecture Consequences

Future apps should:

- start from the user's task, not the document layout
- model work steps and decisions before UI components
- reuse language, patterns, and structure without making apps identical
- separate input experience from generated documents
- use tables, dashboards, and forms when they add clear value
- treat mobile as a primary environment
- use dashboard and sidebar as the standard application shell

## Non-Goals

This document does not create:

- an app implementation
- a database model
- an API
- finished workflow components
