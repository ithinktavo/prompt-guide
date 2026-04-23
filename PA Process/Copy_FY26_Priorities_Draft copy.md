# FY26 PRIORITIES — GUSTAVO MARRERO (DRAFT v2)
## Style: Version B (Balanced) | Format: ML7 Corporate Standard

---

═══════════════════════════════════════════════════════════
PRIORITY 1: Client Value Creation — Platform Migrations & Contract Renewal
Level: Manager, ML7 | Status: **Completed**
═══════════════════════════════════════════════════════════

**Priority Title:** Deliver critical platform migrations and secure contract renewal

**Description:**
- Lead delivery of three concurrent platform migration initiatives for Capital One's fraud detection infrastructure: Java SpringBoot ECS-to-Lambda, HashiCorp Vault to AWS Secrets Manager, and Third Party ACH rules to Watchtower Platform.
- Provide consistent technical leadership through weekly and quarterly status reporting, sprint management, and direct stakeholder engagement to rebuild client confidence.
- Ensure all scoped applications are transitioned to production on the new platforms with zero critical incidents during cutover.
- Drive client relationship restoration to secure contract renewal for another year.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | High Quality Deliverables / Client Delivery | Deliver 3 platform migrations to production with zero critical defects |
| Financial | On Time/On Budget Project Delivery | Complete all 3 migrations within contracted timeline and budget |
| Non-Financial | Client Partnership/Relationships | Restore client confidence from red to green status and secure contract renewal |

**ABCD Reflection:**

**A — Accomplishments:**
Delivered three major platform initiatives for Capital One's fraud detection infrastructure. Completed the Java SpringBoot ECS-to-Lambda migration with the service now fully serving production traffic and the legacy ECS service decommissioned. Executed the HashiCorp Vault to AWS Secrets Manager migration across Dev, QA, and Production environments, with all scoped applications in production now reading from AWS Secrets Manager. Advanced the Third Party ACH Migration, converting 9 Python rules to DMN on Watchtower Platform with the system in parallel analysis mode comparing legacy and new platform decisions ahead of production cutover. Secured a one-year contract renewal — directly reversing earlier client doubts about the team's future.

**B — Business Impact:**
Transformed client relationship from "considering termination" to "renewed for another year," preserving and extending a multi-year engagement. Lambda migration eliminated legacy ECS infrastructure costs and simplified the operational footprint. Secrets Manager migration improved security posture by consolidating to AWS-native tooling and removing third-party dependency. Third Party ACH migration positioned the client to decommission legacy fraud detection infrastructure. Team delivered consistently at 25–30 story points per sprint, enabling predictable capacity planning for FY26 initiatives.

**C — Challenges Overcome:**
Inherited a team with zero completed deliverables, a removed previous Tech Lead, and active client doubt about the engagement's viability. Solved non-trivial Lambda migration challenges — the client underestimated the effort, expecting a simple code copy, but reactive code patterns, ephemeral storage constraints, and Lambda-specific architectural changes required significant engineering. Managed multi-environment secrets coordination across Dev, QA, and Production while investigating lingering Vault access in development. Navigated data element mismatches in Third Party ACH rule conversion requiring close collaboration with Fraud Strategy for validation.

**D — Development & Learning:**
Deepened expertise in serverless architecture patterns (Lambda optimization, ECS-to-Lambda migration strategies) and AWS security services (Secrets Manager multi-environment orchestration). Gained practical experience in DMN rule authoring and Watchtower Platform architecture — foundational knowledge for the upcoming First Party Fraud App migration. Strengthened client relationship management and stakeholder communication skills through direct engagement with senior client leaders during the turnaround period.

---

═══════════════════════════════════════════════════════════
PRIORITY 2: Client Value Creation — First Party Fraud App Migration
Level: Manager, ML7 | Status: In Progress
═══════════════════════════════════════════════════════════

**Priority Title:** Lead First Party Fraud App migration to Watchtower Platform

**Description:**
- Lead the end-to-end delivery of Capital One's largest fraud rule migration to date — the First Party Fraud App (~60 Python rules converted to DMN and deployed on Watchtower Platform).
- Coordinate an all-hands team effort across the Fraud Watchdogs, leveraging lessons learned from the Third Party ACH migration and investing in upfront planning and onboarding.
- Ensure each developer owns specific rule sets through the epic-ownership model, reducing single-point-of-failure risk and increasing team autonomy.
- Target full migration completion and production deployment by end of November 2025 with zero critical defects during cutover.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | High Quality Deliverables / Client Delivery | Migrate all ~60 rules to production with zero critical defects during cutover |
| Financial | On Time/On Budget Project Delivery | Complete full migration by end of November 2025 |
| Non-Financial | Project-Specific KPIs (Non-Financial) | 60 Python rules converted to DMN and serving production traffic |

**ABCD Reflection (Mid-Year — by April):**

**A — Accomplishments:**
Initiated the First Party Fraud App migration planning phase with senior developer Ana leading the initial Watchtower Platform assessment and team onboarding. Established the migration approach informed by lessons from Third Party ACH (9 rules), scaling processes and coordination patterns for a 60-rule effort. Began personal ramp-up on Watchtower Platform specifics for First Party to be able to directly support Ana and the broader team.

**B — Business Impact:**
Early planning and structured team onboarding positioned the Fraud Watchdogs to execute the largest single migration on the account efficiently. Proactive investment in knowledge transfer across the full team (not just SMEs) reduced single-point-of-failure risk and improved delivery resilience.

**C — Challenges Overcome:**
Scaling from a 9-rule migration to a 60-rule migration required rethinking coordination, workstream parallelization, and quality assurance processes. Addressed team knowledge gaps by structuring onboarding so all developers — not just Ana — could contribute meaningfully to DMN rule conversion.

**D — Development & Learning:**
Deepened understanding of Watchtower Platform architecture and DMN rule design at scale. Developed migration program management skills including workstream planning, dependency mapping, and team capacity allocation for large-scale conversion efforts.

**ABCD Reflection (End-of-Year — by September):**

**A — Accomplishments:**
Completed the full First Party Fraud App migration — all ~60 Python rules converted to DMN and deployed on Watchtower Platform by the November target. Managed a coordinated all-hands effort across the Fraud Watchdogs, with each developer owning specific rule sets through the epic-ownership model. Executed production cutover with incremental traffic rollout (starting at 2%) and post-decision validation before scaling to 100%.

**B — Business Impact:**
First Party Fraud App fully authoritative on Watchtower Platform, enabling decommissioning of legacy fraud detection infrastructure and eliminating long-standing technical debt. On-time delivery of the account's largest single migration reinforced Accenture's value as a trusted delivery partner. Completed the client's strategic initiative to modernize their fraud detection stack ahead of schedule.

**C — Challenges Overcome:**
Managed a 6x scale increase in migration complexity (60 rules vs. prior 9) while maintaining delivery quality and team morale. Navigated AI tooling limitations for contractors (limited to GitHub Copilot) that constrained the use of the Python-to-DMN AI conversion POC, requiring hybrid manual/AI approaches. Coordinated Fraud Strategy sign-off and incremental production cutover with rigorous mismatch analysis between legacy and new platform decisions.

**D — Development & Learning:**
Mastered large-scale rule migration program management spanning parallel workstream coordination, production cutover orchestration, and stakeholder alignment across Accenture and Capital One teams. Strengthened ability to lead all-hands delivery efforts where every team member contributes to a shared critical deliverable. Built institutional knowledge on Watchtower Platform at scale that benefits future engagements.

---

═══════════════════════════════════════════════════════════
PRIORITY 3: Client Value Creation — Rules Lab Feasibility Assessment & POC
Level: Manager, ML7 | Status: In Progress
═══════════════════════════════════════════════════════════

**Priority Title:** Assess Rules Lab feasibility and deliver DMN import POC

**Description:**
- Conduct a feasibility assessment of Capital One's next-generation rules platform (Rules Lab) to determine compatibility with existing DMN rules and identify a viable migration pathway.
- Deliver a proof-of-concept demonstrating successful DMN import into Rules Lab, proactively addressing senior client leadership's concern about avoiding another costly re-migration.
- Explore whether the First Party Fraud App migration can serve as a testbed for Rules Lab integration.
- Provide the client with a strategic roadmap and recommendation on how to transition from Watchtower Platform to Rules Lab with minimal disruption.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | Innovation | Deliver 1 working POC demonstrating DMN-to-Rules Lab import |
| Non-Financial | Asset / Solution Development | Produce feasibility assessment with strategic roadmap |
| Non-Financial | Client Partnership/Relationships | Engage senior client stakeholders to align on Rules Lab migration path |

**ABCD Reflection (Mid-Year — by April):**

**A — Accomplishments:**
Began Rules Lab investigation per delivery lead Renan's direction, researching platform capabilities, DMN compatibility, and import mechanisms. Engaged with client stakeholders to understand Rules Lab requirements and the strategic urgency of avoiding a future re-migration from Watchtower Platform to Rules Lab.

**B — Business Impact:**
Early investigation positioned Accenture as a proactive strategic advisor — identifying and addressing a future risk before it became a crisis. Initial findings informed planning discussions about whether the First Party Fraud App migration could incorporate Rules Lab considerations.

**C — Challenges Overcome:**
Rules Lab is a newer platform with limited documentation and evolving requirements. Navigated ambiguity by engaging directly with senior client stakeholders to align on scope, expectations, and timeline for the feasibility assessment. Balanced this investigation with primary delivery responsibilities on the First Party migration.

**D — Development & Learning:**
Built early knowledge of Rules Lab platform architecture and its relationship to the broader Capital One fraud detection technology stack. Developed strategic analysis skills by evaluating platform compatibility and migration pathway options.

**ABCD Reflection (End-of-Year — by September):**

**A — Accomplishments:**
Delivered a comprehensive Rules Lab feasibility assessment documenting DMN compatibility findings, import mechanisms, and identified gaps. Produced a working POC demonstrating successful DMN import into Rules Lab, validating the migration pathway. Provided the client with a strategic roadmap and recommendation on how to transition from Watchtower Platform to Rules Lab with minimal disruption.

**B — Business Impact:**
POC validated that existing DMN rules can be imported into Rules Lab, potentially saving the client months of re-migration effort and significant cost. Strategic assessment positioned Accenture as the go-to partner for the client's next platform evolution, directly influencing future scope and engagement opportunities. Proactive risk mitigation demonstrated Accenture's commitment to long-term client value beyond current deliverables.

**C — Challenges Overcome:**
Navigated Rules Lab platform immaturity with limited documentation and evolving client requirements. Balanced the feasibility investigation with primary delivery responsibilities on the First Party Fraud App migration without impacting either workstream. Aligned multiple senior stakeholders (Accenture and Capital One) on a pragmatic approach given competing priorities.

**D — Development & Learning:**
Built first-mover expertise in Rules Lab — a strategic capability for future Accenture engagements with Capital One and potentially other financial services clients. Developed skills in platform evaluation, feasibility analysis, and strategic advisory at the intersection of technology and business planning.

---

═══════════════════════════════════════════════════════════
PRIORITY 4: Great Place to Work for Reinventors — Team Turnaround & Culture
Level: Manager, ML7 | Status: **Completed**
═══════════════════════════════════════════════════════════

**Priority Title:** Transform team performance and build a culture of ownership

**Description:**
- Design and implement a custom Agile framework for the Fraud Watchdogs, including an epic-ownership model where each developer is responsible for their entire epic from story creation through delivery.
- Mentor a team of 4 developers across different experience levels, providing technical guidance and career development support through regular 1:1s and sprint retrospectives.
- Establish structured sprint planning, weekly status reporting cadence, and quarterly client reviews to bring process discipline and accountability to the team.
- Build a team culture centered on autonomy, collaboration, and professional growth that restores client confidence and retains talent.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | Mentorship/People Leadership | Mentor 4 direct reports with regular 1:1s and career development guidance |
| Non-Financial | Team Engagement Survey / Actions | Achieve consistent 25–30 story point sprint velocity and restore team to green status |
| Non-Financial | High Quality Deliverables / Client Delivery | Developers independently owning epics and creating stories without client dependency |

**ABCD Reflection:**

**A — Accomplishments:**
Designed and implemented a custom Agile framework tailored to the Fraud Watchdogs' needs, including an epic-ownership model where each developer is responsible for their entire epic — from story creation through delivery. This directly addressed the client's key concern about over-reliance on the client for story creation. Established structured sprint planning, weekly status reporting cadence, and quarterly client reviews. Mentored a team of 4 developers (Ana, Moya, Juquan, Arpita/Jerry) across different experience levels, providing technical guidance and career development support. Managed the mid-engagement departure of Arpita and onboarding of Jerry without disrupting delivery.

**B — Business Impact:**
Team went from zero completed deliverables to consistent 25–30 story point sprint velocity — enabling predictable delivery forecasting and restoring the client's ability to plan around Accenture's output. Client feedback shifted from requesting the previous Tech Lead's removal to stating "I have hope again in this team." The engagement was renewed for another year, directly validating the team transformation. Developer autonomy reduced bottlenecks and eliminated the client's need to create stories for the team, resolving a key friction point.

**C — Challenges Overcome:**
Inherited a team with no established processes, no delivery track record, and a client who had lost confidence in Accenture's ability to deliver. Quickly diagnosed organizational gaps (planning, story creation, ownership) through systematic assessment rather than making reactive changes. Managed a team member departure (Arpita) mid-engagement — navigating knowledge transfer and new team member onboarding while maintaining velocity. Balanced hands-on technical contribution with people management responsibilities as a first-time Tech Lead with direct reports.

**D — Development & Learning:**
Gained essential people management experience required for Manager-level promotion — including direct leadership of 4 developers, individual mentoring, process design, and conflict resolution. Developed change management skills by diagnosing team dysfunction and implementing systematic improvements rather than surface-level fixes. Learned to balance technical delivery with team development, recognizing that investing in people ownership and autonomy drives better outcomes than micromanagement. Departure feedback from Arpita — "best team I've ever been on" — validated the leadership approach.

---

═══════════════════════════════════════════════════════════
PRIORITY 5: AI Enablement — AI Coaches & Python-to-DMN POC
Level: Manager, ML7 | Status: In Progress
═══════════════════════════════════════════════════════════

**Priority Title:** Lead AI Coaches initiative and deliver Python-to-DMN AI conversion POC

**Description:**
- Co-lead the AI Coaches initiative at Capital One alongside delivery lead Renan, building expertise in client-approved AI tools (GitHub Copilot, Gemini, Claude, Windsurf) and coaching development teams on AI adoption.
- Develop and present the Python-to-DMN AI conversion POC demonstrating how AI can accelerate rule migration using templated prompts and prompting techniques.
- Enable all 30 Accenture development teams at Capital One on VS Code + GitHub Copilot and secure funding for AI tool access for the coaching team.
- Deliver hands-on AI training (including a 3-day AI Bootcamp covering prompt engineering, RAG, MCP, AI agents) to upskill developers across the account.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | AI Tool Usage | Enable all 30 Accenture dev teams on VS Code + GitHub Copilot |
| Non-Financial | Innovation | Deliver Python-to-DMN AI conversion POC and apply to First Party migration |
| Non-Financial | AI Proficiency / Skills | Deliver 1 AI Bootcamp and sell 2 new AI Coach roles to Capital One |

**ABCD Reflection (Mid-Year — by April):**

**A — Accomplishments:**
Co-founded and helped lead the AI Coaches initiative — an informal community of developers focused on building AI expertise and coaching others. Enabled all 30 Accenture development teams at Capital One on VS Code + GitHub Copilot. Secured funding for AI tool access for the coaching team. Delivered a 3-day AI Bootcamp during Thanksgiving week (on personal time, outside project hours) covering Prompt Engineering, Spec-Driven Development, RAG, MCP, AI Agents, and hands-on exercises. Developed and presented the Python-to-DMN AI conversion POC to Capital One — demonstrating how AI can accelerate rule migration using templated prompts. The POC was well-received, with senior developer Ana confirming it could improve team productivity for the First Party migration. Awarded the **Capital One Divergent Award** for challenging the status quo and driving innovation with bold thinking.

**B — Business Impact:**
2 new AI Coach roles were sold to Capital One with the primary purpose of building and supporting AI initiatives — a direct revenue impact driven by the demonstrated value of the AI Coaches initiative. Positioned Accenture as AI-ready for emerging opportunities at the client. Python-to-DMN POC showed promise in accelerating the upcoming 60-rule migration, with the client actively pushing for an AI tooling exemption for contractors because they see the value. AI Bootcamp upskilled developers across the account on practical AI techniques applicable to their daily work.

**C — Challenges Overcome:**
Built the AI Coaches initiative from scratch with no formal budget or mandate — relying on shared passion and volunteer effort. Delivered the 3-day AI Bootcamp on personal time during Thanksgiving week. Navigated contractor AI tooling restrictions at Capital One — contractors currently limited to GitHub Copilot only — requiring creative approaches to demonstrate value with constrained tools. Advocated for expanded AI tool access (including Windsurf) while working within existing limitations.

**D — Development & Learning:**
Developed deep practical expertise in prompt engineering, RAG architectures, MCP protocols, and AI agent design through both self-study and bootcamp preparation. Built skills in AI solution design by creating the Python-to-DMN conversion methodology using templated prompts. Gained experience in AI community building, training facilitation, and evangelism at scale. Currently pursuing expanded AI certifications to complement hands-on expertise.

**ABCD Reflection (End-of-Year — by September):**

**A — Accomplishments:**
Continued leading AI Coaches initiative with expanded reach and impact. Refined the Python-to-DMN AI conversion POC and applied it to the First Party Fraud App migration, demonstrating measurable acceleration in rule conversion. Supported onboarding of the 2 new AI Coach roles sold to Capital One. Continued coaching development teams on AI tool adoption and best practices across the account.

**B — Business Impact:**
AI-assisted rule conversion contributed to the on-time delivery of the First Party Fraud App migration, demonstrating tangible ROI on the AI Coaches investment. 2 new AI Coach roles generating revenue for Accenture on the Capital One account. Expanded AI adoption across development teams improved productivity and positioned the account for future AI-driven delivery opportunities.

**C — Challenges Overcome:**
Continued navigating contractor AI tooling limitations while maximizing value from approved tools. Balanced AI Coaches leadership responsibilities with primary delivery commitments on the First Party migration and Rules Lab investigation. Adapted AI conversion methodology as real-world application revealed edge cases and limitations in the templated prompt approach.

**D — Development & Learning:**
Advanced from AI evangelist to practitioner by applying AI-assisted development to a production deliverable (First Party migration). Deepened understanding of AI tool strengths and limitations in enterprise contexts with security and compliance constraints. Built leadership skills in scaling a grassroots initiative into a client-recognized, revenue-generating capability.

---

═══════════════════════════════════════════════════════════
PRIORITY 6: Community — AABG Atlanta Local Engagement
Level: Manager, ML7 | Status: In Progress
═══════════════════════════════════════════════════════════

**Priority Title:** Strengthen AABG Atlanta local community through events and networking

**Description:**
- Organize and lead regular team events and get-togethers for local AABG colleagues in the Atlanta area, fostering connections across different client engagements.
- Plan a variety of activities (team dinners, networking events, knowledge-sharing sessions) to build a sense of community that supports collaboration and professional development.
- Coordinate schedules and logistics for team members spread across different projects, ensuring consistent engagement throughout FY26.
- Help strengthen the local AABG presence in Atlanta by creating informal channels for knowledge sharing and cross-team relationship building.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | Office/Network Involvement | Organize at least 4 AABG Atlanta events throughout FY26 |
| Non-Financial | Community Volunteering | Participate in or organize at least 2 community-oriented AABG activities |
| Non-Financial | Social & Environmental Citizenship | Strengthen cross-team relationships among Atlanta-based AABG members |

**ABCD Reflection (Mid-Year — by April):**

**A — Accomplishments:**
Organized team dinners for local AABG colleagues in the Atlanta area, bringing together team members who work on different client engagements for informal networking and relationship building. Began planning additional events and get-togethers to expand the cadence and variety of local AABG activities.

**B — Business Impact:**
Strengthened cross-team relationships among Atlanta-based AABG members, fostering a sense of community that supports knowledge sharing, collaboration opportunities, and talent retention. Local events created informal channels for sharing best practices and client experiences across different engagements.

**C — Challenges Overcome:**
Coordinated schedules and logistics for team members spread across different client projects with varying in-office and remote work patterns. Took initiative to organize events without a formal community budget or mandate, relying on personal effort and grassroots coordination.

**D — Development & Learning:**
Developed community building and event coordination skills. Gained visibility across the local AABG network, building relationships with colleagues outside of immediate project teams that support broader career development and collaboration opportunities.

**ABCD Reflection (End-of-Year — by September):**

**A — Accomplishments:**
Expanded AABG Atlanta community activities beyond initial team dinners to include a regular cadence of events and get-togethers throughout FY26. Contributed to building a local AABG culture that values in-person connection and cross-team collaboration.

**B — Business Impact:**
Consistent local engagement activities strengthened the Atlanta AABG network, improving team cohesion, knowledge sharing, and creating an environment that supports talent retention and professional growth. Community building contributed to Accenture's broader "Great Place to Work" culture.

**C — Challenges Overcome:**
Maintained community engagement momentum while balancing demanding delivery commitments on the Capital One account. Scaled event planning from ad-hoc dinners to a more structured cadence of activities.

**D — Development & Learning:**
Built skills in community leadership, event planning, and cross-team relationship management. Gained experience in fostering team culture and engagement at the local office level — a capability that supports broader management and leadership responsibilities.

---

# SUMMARY TABLE

| # | Category | Priority Title | Status | Key Metrics & Targets |
|---|----------|----------------|--------|----------------------|
| 1 | Client Value Creation | Deliver critical platform migrations and secure contract renewal | **Completed** | 3 migrations to prod, zero defects; on time/budget; red→green + renewal |
| 2 | Client Value Creation | Lead First Party Fraud App migration to Watchtower Platform | In Progress | 60 rules to prod, zero defects; by Nov 2025; 60 Python→DMN |
| 3 | Client Value Creation | Assess Rules Lab feasibility and deliver DMN import POC | In Progress | 1 POC; feasibility assessment + roadmap; stakeholder alignment |
| 4 | Great Place to Work | Transform team performance and build a culture of ownership | **Completed** | 4 mentees w/ 1:1s; 25-30 SP velocity + green status; epic ownership |
| 5 | AI Enablement | Lead AI Coaches initiative and deliver Python-to-DMN POC | In Progress | 30 teams on Copilot; POC for migration; 1 bootcamp + 2 roles sold |
| 6 | Community | Strengthen AABG Atlanta local community | In Progress | 4+ events/year; 2 community activities; cross-team relationships |
