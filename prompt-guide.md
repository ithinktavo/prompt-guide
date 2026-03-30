# Comprehensive Prompt Guide

## Table of Contents
1. [Basic Prompt Structure](#basic-prompt-structure)
2. [Effective Prompting Techniques](#effective-prompting-techniques)
3. [Common Prompt Patterns](#common-prompt-patterns)
4. [Domain-Specific Prompts](#domain-specific-prompts)
5. [Advanced Prompting Strategies](#advanced-prompting-strategies)
6. [Troubleshooting Common Issues](#troubleshooting-common-issues)

## Basic Prompt Structure

### Core Components
- **Context**: Background information the AI needs
- **Task**: What you want the AI to do
- **Constraints**: Rules, limitations, or specific requirements
- **Format**: Desired output structure
- **Examples**: Sample inputs/outputs (few-shot learning)

### Template
```
[Context/Background]
[Task Description]
[Constraints/Requirements]
[Output Format]
[Examples (if needed)]
```

## Effective Prompting Techniques

### 1. Be Specific and Clear
- Use precise language
- Avoid ambiguity
- Specify exact requirements

### 2. Provide Context
- Give relevant background information
- Explain the purpose/goal
- Mention constraints or limitations

### 3. Use Examples
- Show input-output pairs
- Demonstrate desired format
- Include edge cases

### 4. Break Down Complex Tasks
- Use step-by-step instructions
- Number sequential steps
- Define subtasks clearly

## Common Prompt Patterns

### 1. Role-Based Prompting
```
You are a [role/profession]. 
[Task description with role-specific context]
```

### 2. Chain of Thought
```
Think step by step to solve this problem:
1. [First step]
2. [Second step]
3. [Final step]
```

### 3. Template-Based
```
Fill in this template:
[Template structure]
Input: [user input]
Output: [desired format]
```

### 4. Comparative Analysis
```
Compare [A] and [B] based on:
- Criterion 1
- Criterion 2
- Criterion 3
```

## Domain-Specific Prompts

### Programming/Code
```
Write [language] code to [task].
Requirements:
- Use [specific libraries/frameworks]
- Follow [coding standards]
- Include [error handling/documentation]
```

### Writing/Content
```
Create a [content type] about [topic].
Target audience: [description]
Tone: [formal/casual/professional]
Length: [word count]
Key points to include: [list]
```

### Data Analysis
```
Analyze this [data type] to [goal].
Steps:
1. [Data preparation]
2. [Analysis method]
3. [Visualization requirements]
4. [Insights to extract]
```

### Problem Solving
```
Help me solve [problem type].
Context: [background information]
Constraints: [limitations]
Available resources: [tools/data]
Desired outcome: [specific result]
```

## Advanced Prompting Strategies

### 1. Iterative Refinement
- Start with a basic prompt
- Review the output
- Refine the prompt based on results
- Repeat until satisfactory

### 2. Multi-Persona Approach
```
As a [persona 1], analyze [topic].
Then, as a [persona 2], critique the analysis.
Finally, synthesize both perspectives.
```

### 3. Constraint-Based Generation
```
Generate [content] with these constraints:
- Must include [specific elements]
- Cannot use [forbidden terms]
- Must follow [style guidelines]
- Limited to [word count/length]
```

### 4. Meta-Prompting
```
Create a prompt that will [achieve goal].
The prompt should:
- Be clear and specific
- Include relevant context
- Provide examples
- Set appropriate constraints
```

## Troubleshooting Common Issues

### Problem: Vague or Incomplete Responses
**Solution**: Add more specific details and constraints
```
Instead of: "Write about marketing"
Use: "Write a 500-word blog post about digital marketing trends for small businesses, focusing on cost-effective strategies under $1000/month."
```

### Problem: Incorrect Format
**Solution**: Explicitly specify output format
```
Provide the answer in JSON format with these keys:
- "title": string
- "description": string
- "steps": array of strings
```

### Problem: Off-Topic Responses
**Solution**: Strengthen context and constraints
```
Stay focused on [specific topic]. Do not discuss [related but irrelevant topics]. Your response should only address [specific question].
```

### Problem: Too Technical or Too Simple
**Solution**: Specify target audience level
```
Explain [topic] for [beginner/intermediate/expert] level audience. Use [simple/technical] language and provide [basic/detailed] examples.
```

## Best Practices Summary

1. **Start Clear**: Begin with a clear, specific task description
2. **Provide Context**: Give necessary background information
3. **Set Constraints**: Define boundaries and requirements
4. **Use Examples**: Show desired format and style
5. **Iterate**: Refine prompts based on output quality
6. **Test**: Validate prompts with different scenarios
7. **Document**: Keep successful prompts for reuse

## Quick Reference

### Simple Tasks
```
[Task] for [topic] with [constraints].
```

### Complex Tasks
```
Context: [background]
Task: [detailed description]
Requirements: [specific constraints]
Format: [output structure]
Examples: [sample I/O]
```

### Code Generation
```
Write [language] code to [functionality].
Include: [features/libraries]
Follow: [standards/patterns]
Test: [verification method]
```

### Content Creation
```
Create [content type] about [topic].
Audience: [target demographic]
Tone: [voice/style]
Length: [word/character count]
Include: [key elements]
```

---

*This guide serves as a reference for crafting effective prompts across various use cases. Adjust and customize these patterns based on your specific needs and the AI assistant you're using.*