# FY26 PRIORITIES — GUSTAVO MARRERO (DRAFT v3)
## Style: Version B (Balanced) | Format: ML7 Corporate Standard

---

═══════════════════════════════════════════════════════════
PRIORITY 1: Client Value Creation — Platform Migrations & Contract Renewal
Level: Manager, ML7 | Status: **Completed**
═══════════════════════════════════════════════════════════

**Priority Title:** Deliver critical platform migrations and secure contract renewal

**Description:**
- Lead delivery of two major platform migration initiatives for Capital One's fraud detection infrastructure: Java SpringBoot ECS-to-Lambda and HashiCorp Vault to AWS Secrets Manager.
- Provide consistent technical leadership through weekly and quarterly status reporting, sprint management, and direct stakeholder engagement to rebuild client confidence.
- Ensure all scoped applications are transitioned to production on the new platforms with zero critical incidents during cutover.
- Drive client relationship restoration to secure contract renewal for another year.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | High Quality Deliverables / Client Delivery | Deliver 2 platform migrations to production with zero critical defects |
| Financial | On Time/On Budget Project Delivery | Complete both migrations within contracted timeline and budget |
| Non-Financial | Client Partnership/Relationships | Restore client confidence from red to green status and secure contract renewal |

**ABCD Reflection:**

**A — Accomplishments:**
Delivered two major platform initiatives for Capital One's fraud detection infrastructure. Completed the Java SpringBoot ECS-to-Lambda migration with the service now fully serving production traffic and the legacy ECS service decommissioned. Executed the HashiCorp Vault to AWS Secrets Manager migration across Dev, QA, and Production environments, with all scoped applications in production now reading from AWS Secrets Manager. Secured a one-year contract renewal — directly reversing earlier client doubts about the team's future.

**B — Business Impact:**
Transformed client relationship from "considering termination" to "renewed for another year," preserving and extending a multi-year engagement. Lambda migration eliminated legacy ECS infrastructure costs and simplified the operational footprint. Secrets Manager migration improved security posture by consolidating to AWS-native tooling and removing third-party dependency. Team delivered consistently at 25–30 story points per sprint, enabling predictable capacity planning for FY26 initiatives.

**C — Challenges Overcome:**
Inherited a team with zero completed deliverables, a removed previous Tech Lead, and active client doubt about the engagement's viability. Solved non-trivial Lambda migration challenges — the client underestimated the effort, expecting a simple code copy, but reactive code patterns, ephemeral storage constraints, and Lambda-specific architectural changes required significant engineering. Managed multi-environment secrets coordination across Dev, QA, and Production while investigating lingering Vault access in development.

**D — Development & Learning:**
Deepened expertise in serverless architecture patterns (Lambda optimization, ECS-to-Lambda migration strategies) and AWS security services (Secrets Manager multi-environment orchestration). Gained practical experience in DMN rule authoring and Watchtower Platform architecture — foundational knowledge for the upcoming First Party Fraud App migration. Strengthened client relationship management and stakeholder communication skills through direct engagement with senior client leaders during the turnaround period.

---

═══════════════════════════════════════════════════════════
PRIORITY 2: Client Value Creation — Watchtower Platform Migrations
Level: Manager, ML7 | Status: In Progress
═══════════════════════════════════════════════════════════

**Priority Title:** Complete Watchtower Platform migrations for Third Party ACH and First Party Fraud App

**Description:**
- Drive the Third Party ACH migration to full production authority on Watchtower Platform — currently running in shadow mode with 9 Python rules converted to DMN, comparing legacy and new system decisions. Achieve the required 99.99% decision-matching rate to decommission the legacy system.
- Lead the end-to-end delivery of Capital One's largest fraud rule migration to date — the First Party Fraud App (~60 Python rules converted to DMN and deployed on Watchtower Platform).
- Coordinate an all-hands team effort across the Fraud Watchdogs, leveraging lessons learned from Third Party ACH and investing in upfront planning and onboarding for the First Party effort.
- Ensure each developer owns specific rule sets through the epic-ownership model, reducing single-point-of-failure risk and increasing team autonomy.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | High Quality Deliverables / Client Delivery | Third Party ACH: achieve 99.99% decision-matching rate and go fully authoritative |
| Non-Financial | Project-Specific KPIs (Non-Financial) | First Party: ~60 Python rules converted to DMN and serving production traffic |
| Financial | On Time/On Budget Project Delivery | Complete First Party migration by end of November 2025 |

**ABCD Reflection (Mid-Year — by April):**

**A — Accomplishments:**
Third Party ACH migration is running in shadow mode in production — all 9 Python rules converted to DMN and deployed on Watchtower Platform, with the system actively comparing legacy and new platform decisions. Addressing minor mismatches identified during parallel analysis to reach the 99.99% decision-matching threshold required for full authority. Simultaneously initiated the First Party Fraud App migration planning phase, with senior developer Ana leading the initial Watchtower Platform assessment and team onboarding. Established the First Party migration approach informed by lessons from Third Party ACH, scaling processes and coordination patterns from a 9-rule effort to a 60-rule effort.

**B — Business Impact:**
Third Party ACH in shadow mode validates the Watchtower Platform migration approach and positions the client to decommission legacy fraud detection infrastructure once the matching threshold is met. Early planning and structured team onboarding for First Party positioned the Fraud Watchdogs to execute the largest single migration on the account efficiently. Proactive investment in knowledge transfer across the full team (not just SMEs) reduced single-point-of-failure risk and improved delivery resilience.

**C — Challenges Overcome:**
Navigated data element mismatches in Third Party ACH rule conversion requiring close collaboration with Fraud Strategy for validation. Scaling from a 9-rule migration to a 60-rule migration required rethinking coordination, workstream parallelization, and quality assurance processes. Addressed team knowledge gaps by structuring onboarding so all developers could contribute meaningfully to DMN rule conversion.

**D — Development & Learning:**
Deepened understanding of Watchtower Platform architecture, DMN rule design at scale, and production shadow-mode validation processes. Developed migration program management skills including workstream planning, dependency mapping, and team capacity allocation for large-scale conversion efforts.

**ABCD Reflection (End-of-Year — by September):**

**A — Accomplishments:**
Third Party ACH achieved the 99.99% decision-matching rate and transitioned to fully authoritative on Watchtower Platform, enabling decommission of the legacy system. Completed the full First Party Fraud App migration — all ~60 Python rules converted to DMN and deployed on Watchtower Platform by the November target. Managed a coordinated all-hands effort across the Fraud Watchdogs, with each developer owning specific rule sets through the epic-ownership model. Executed production cutover with incremental traffic rollout and post-decision validation before scaling to 100%.

**B — Business Impact:**
Both Third Party ACH and First Party Fraud App fully authoritative on Watchtower Platform, enabling decommissioning of legacy fraud detection infrastructure and eliminating long-standing technical debt. On-time delivery of the account's largest single migration reinforced Accenture's value as a trusted delivery partner. Completed the client's strategic initiative to modernize their fraud detection stack.

**C — Challenges Overcome:**
Managed a 6x scale increase in migration complexity (60 rules vs. prior 9) while maintaining delivery quality and team morale. Navigated AI tooling limitations for contractors (limited to GitHub Copilot) that constrained the use of the Python-to-DMN AI conversion POC, requiring hybrid manual/AI approaches. Coordinated Fraud Strategy sign-off and incremental production cutover with rigorous mismatch analysis between legacy and new platform decisions.

**D — Development & Learning:**
Mastered large-scale rule migration program management spanning parallel workstream coordination, production cutover orchestration, and stakeholder alignment across Accenture and Capital One teams. Strengthened ability to lead all-hands delivery efforts where every team member contributes to a shared critical deliverable. Built institutional knowledge on Watchtower Platform at scale that benefits future engagements.

---

═══════════════════════════════════════════════════════════
PRIORITY 3: Great Place to Work for Reinventors — Team Turnaround & Culture
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
PRIORITY 4: Great Place to Work for Reinventors — Counselee Mentoring & Development
Level: Manager, ML7 | Status: **Completed**
═══════════════════════════════════════════════════════════

**Priority Title:** Mentor counselee through career development and promotion to Senior Analyst

**Description:**
- Engage regularly with counselee Ivanelyz through biweekly coaching calls and weekly check-ins via chat to provide consistent career development guidance.
- Help identify growth and learning opportunities aligned with counselee's strengths and career aspirations.
- Coach counselee on how to frame priorities concisely and build a compelling promotion case, including advising her to collect feedback from her previous manager.
- Represent counselee during the official performance call with a well-supported narrative grounded in data and concrete accomplishments.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | Mentorship/People Leadership | Maintain biweekly coaching calls and weekly chat engagement with counselee |
| Non-Financial | Development | Help counselee achieve promotion to next career level |
| Non-Financial | Feedback | Coach counselee on priority framing and guide feedback collection from previous manager |

**ABCD Reflection:**

**A — Accomplishments:**
Established a consistent coaching rhythm with counselee Ivanelyz — biweekly calls and at least weekly chat check-ins. Identified growth and learning opportunities that aligned with her career development goals. Coached her on how to write concise, well-framed priorities. Advised her to reach out to her previous manager for feedback, who confirmed she was already performing at the next level. Used that data to build a compelling promotion narrative and represented her during the official performance call. Result: Ivanelyz was promoted to Senior Analyst.

**B — Business Impact:**
Directly contributed to the development and promotion of an Accenture employee, reinforcing talent retention and demonstrating investment in people development. A promoted, engaged employee contributes at a higher level to client delivery and team performance.

**C — Challenges Overcome:**
Coaching a counselee on a different project required building rapport and understanding her work context remotely. Guided her through the sometimes opaque promotion process — helping her understand what data to collect, how to frame it, and how to engage her previous manager for the supporting feedback needed to build a strong case.

**D — Development & Learning:**
Strengthened counseling and people development skills — learning how to coach someone through the full promotion lifecycle from priority framing to performance call representation. Gained experience in building promotion cases grounded in data and stakeholder feedback, a capability directly applicable to Manager-level people leadership responsibilities.

---

═══════════════════════════════════════════════════════════
PRIORITY 5: Great Place to Work for Reinventors — Ongoing Counselee Development
Level: Manager, ML7 | Status: In Progress
═══════════════════════════════════════════════════════════

**Priority Title:** Continue counselee development and engagement as ongoing mentor

**Description:**
- Continue regular biweekly coaching calls and weekly chat engagement with counselee Ivanelyz following her promotion to Senior Analyst.
- Help define new growth objectives and learning opportunities appropriate for her new level.
- Provide ongoing career guidance, priority framing support, and feedback as she establishes herself in the Senior Analyst role.
- Serve as a consistent advocate and resource for her professional development within Accenture.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | Mentorship/People Leadership | Maintain biweekly coaching calls and weekly chat engagement throughout FY26 |
| Non-Financial | Development | Help counselee define and pursue growth objectives at Senior Analyst level |
| Non-Financial | Feedback | Provide ongoing, timely feedback and career guidance |

**ABCD Reflection (Mid-Year — by April):**

**A — Accomplishments:**
Maintained consistent biweekly coaching calls and weekly chat engagement with Ivanelyz following her promotion. Began working with her to define growth objectives appropriate for the Senior Analyst level and identify new learning opportunities.

**B — Business Impact:**
Ongoing mentorship supports talent retention and continued development of a recently promoted employee, ensuring she is set up for success at her new level.

**C — Challenges Overcome:**
Adapting coaching approach from promotion-focused to growth-focused after the successful promotion outcome. Ensuring continued engagement and value in the counseling relationship beyond the immediate promotion milestone.

**D — Development & Learning:**
Developing skills in sustained mentorship — learning how to evolve the coaching relationship as the counselee grows and her needs change at a new career level.

---

═══════════════════════════════════════════════════════════
PRIORITY 6: AI Enablement — AI Coaches Initiative & Account Enablement
Level: Manager, ML7 | Status: **Completed**
═══════════════════════════════════════════════════════════

**Priority Title:** Establish AI Coaches initiative and enable AI adoption across the account

**Description:**
- Co-lead the formation of the AI Coaches initiative at Capital One alongside delivery lead Renan, building a community of developers with expertise in client-approved AI tools (GitHub Copilot, Gemini, Claude, Windsurf).
- Enable all 30 Accenture development teams at Capital One on VS Code + GitHub Copilot and secure funding for AI tool access for the coaching team.
- Lead the organization of a 3-day AI Bootcamp — design the curriculum and topics, personally present on prompt engineering, and coordinate other AI Coaches to deliver sessions on RAG, MCP, and AI agents to upskill developers across the account.
- Identify and propose AI POCs relevant to client work, including the Python-to-DMN conversion POC applicable to Watchtower migrations.
- Complete the Accenture Reinvention training and earn the Credly badge.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | AI Tool Usage | Enable all 30 Accenture dev teams on VS Code + GitHub Copilot |
| Non-Financial | AI Proficiency / Skills | Deliver 1 AI Bootcamp, sell 3 AI Coach roles, complete Accenture Reinvention training |
| Non-Financial | Innovation | Identify and propose AI POCs including Python-to-DMN conversion for Watchtower migrations |

**ABCD Reflection:**

**A — Accomplishments:**
Co-founded and helped lead the AI Coaches initiative — building a community of developers focused on AI expertise and coaching across the Capital One account. Enabled all 30 Accenture development teams on VS Code + GitHub Copilot. Secured funding for AI tool access for the coaching team. Led the organization of a 3-day AI Bootcamp during Thanksgiving week (on personal time, outside project hours) — designed the curriculum and topics, personally presented on prompt engineering, and coordinated other AI Coaches to deliver sessions on Spec-Driven Development, RAG, MCP, AI Agents, and hands-on exercises. Identified and proposed multiple AI POCs relevant to client work, including the Python-to-DMN AI conversion POC that was well-received by the client and senior developer Ana. 3 AI Coach roles were sold to Capital One. Completed the Accenture Reinvention training and earned the Credly badge. Awarded the **Capital One Divergent Award** for challenging the status quo and driving innovation with bold thinking.

**B — Business Impact:**
3 new AI Coach roles sold to Capital One — direct revenue generation for Accenture driven by the demonstrated value of the AI Coaches initiative. Positioned Accenture as AI-ready for emerging opportunities at the client. Python-to-DMN POC identified as a key accelerator for the upcoming 60-rule First Party migration, with the client actively pushing for an AI tooling exemption for contractors because they see the value. AI Bootcamp upskilled developers across the account on practical AI techniques applicable to their daily work.

**C — Challenges Overcome:**
Built the AI Coaches initiative from scratch with no formal budget or mandate — relying on shared passion and volunteer effort. Led the organization of the 3-day AI Bootcamp on personal time during Thanksgiving week, coordinating multiple presenters across the AI Coaches team. Navigated contractor AI tooling restrictions at Capital One — contractors currently limited to GitHub Copilot only — requiring creative approaches to demonstrate value with constrained tools. Advocated for expanded AI tool access (including Windsurf) while working within existing limitations.

**D — Development & Learning:**
Developed deep practical expertise in prompt engineering, RAG architectures, MCP protocols, and AI agent design through both self-study and bootcamp curriculum design. Built skills in AI solution design by creating the Python-to-DMN conversion methodology using templated prompts. Gained experience in AI community building, training facilitation, and evangelism at scale. Completed Accenture Reinvention training and earned Credly badge, reinforcing AI proficiency with formal certification.

---

═══════════════════════════════════════════════════════════
PRIORITY 7: AI Enablement — AI POC Development
Level: Manager, ML7 | Status: In Progress
═══════════════════════════════════════════════════════════

**Priority Title:** Develop and apply AI POCs to accelerate client delivery

**Description:**
- Develop the Python-to-DMN AI conversion POC into a production-ready tool that can be applied to the First Party Fraud App migration on Watchtower Platform.
- Actively explore and develop additional AI POCs to identify how Accenture teams across the Capital One account can integrate AI within the client's approved tooling constraints.
- Proactively explore AI use cases that benefit not just the Fraud Watchdogs but other delivery teams on the account.
- Apply AI-assisted development techniques to accelerate rule migration and improve delivery efficiency.

**Metrics:**

| Category | Metric Name | Target |
|----------|-------------|--------|
| Non-Financial | Innovation | Refine Python-to-DMN POC and apply to First Party migration |
| Non-Financial | Asset / Solution Development | Develop at least 1 additional AI POC applicable to account delivery teams |
| Non-Financial | AI Tool Usage | Demonstrate measurable acceleration in rule migration through AI-assisted development |

**ABCD Reflection (Mid-Year — by April):**

**A — Accomplishments:**
Continued development of the Python-to-DMN AI conversion POC, refining templated prompts and conversion methodology for application to the First Party Fraud App migration. Began exploring additional AI POC opportunities across the account, identifying use cases where Accenture teams can leverage AI within the client's approved tooling constraints.

**B — Business Impact:**
Python-to-DMN POC positioned to accelerate the upcoming 60-rule migration, potentially reducing manual conversion effort significantly. Proactive exploration of cross-team AI use cases demonstrates Accenture's commitment to embedding AI across the account, not just within a single team.

**C — Challenges Overcome:**
Navigating contractor AI tooling limitations (limited to GitHub Copilot) constrains the full potential of AI-assisted development. Adapting POC methodology from proof-of-concept to production-applicable tooling requires balancing innovation speed with enterprise quality and compliance requirements.

**D — Development & Learning:**
Advancing from POC design to production application of AI-assisted development. Learning how to scale AI tooling adoption within enterprise security and compliance constraints at a major financial services client.

**ABCD Reflection (End-of-Year — by September):**

**A — Accomplishments:**
Refined the Python-to-DMN AI conversion POC and applied it to the First Party Fraud App migration, demonstrating measurable acceleration in rule conversion. Developed additional AI POCs applicable to other delivery teams on the account. Supported onboarding of the 3 AI Coach roles and continued coaching teams on AI tool adoption and best practices.

**B — Business Impact:**
AI-assisted rule conversion contributed to the on-time delivery of the First Party Fraud App migration, demonstrating tangible ROI on the AI investment. Expanded AI adoption across development teams improved productivity and positioned the account for future AI-driven delivery opportunities.

**C — Challenges Overcome:**
Adapted AI conversion methodology as real-world application revealed edge cases and limitations in the templated prompt approach. Balanced POC development responsibilities with primary delivery commitments on the Watchtower migrations and Rules Lab investigation.

**D — Development & Learning:**
Advanced from AI evangelist to practitioner by applying AI-assisted development to a production deliverable. Deepened understanding of AI tool strengths and limitations in enterprise contexts with security and compliance constraints. Built leadership skills in scaling AI adoption from a single team to an account-wide initiative.

---

═══════════════════════════════════════════════════════════
PRIORITY 8: Community — AABG Atlanta Local Engagement
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
| 1 | Client Value Creation | Deliver critical platform migrations and secure contract renewal | **Completed** | 2 migrations to prod, zero defects; on time/budget; red→green + renewal |
| 2 | Client Value Creation | Complete Watchtower migrations (Third Party ACH + First Party) | In Progress | ACH: 99.99% match rate; First Party: 60 rules to prod by Nov 2025 |
| 3 | Great Place to Work | Transform team performance and build a culture of ownership | **Completed** | 4 mentees w/ 1:1s; 25-30 SP velocity + green status; epic ownership |
| 4 | Great Place to Work | Mentor counselee through development and promotion | **Completed** | Biweekly calls; growth opportunities identified; counselee promoted to Senior Analyst |
| 5 | Great Place to Work | Continue ongoing counselee development | In Progress | Biweekly calls; new growth objectives at Senior Analyst level |
| 6 | AI Enablement | Establish AI Coaches initiative and enable account AI adoption | **Completed** | 30 teams on Copilot; 3 AI Coach roles sold; 1 bootcamp; Reinvention badge |
| 7 | AI Enablement | Develop and apply AI POCs to accelerate delivery | In Progress | Python-to-DMN POC for migration; 1+ additional POC; measurable acceleration |
| 8 | Community | Strengthen AABG Atlanta local community | In Progress | 4+ events/year; 2 community activities; cross-team relationships |
