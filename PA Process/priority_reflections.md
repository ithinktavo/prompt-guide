# FY26 Priority Reflections — Gustavo Marrero
## Format: Well / Better / Next

> These reflections are visible to priority reviewers during their reflections.

---

## Priority 1: Deliver Critical Platform Migrations and Secure Contract Renewal
**Status:** Completed

**What went WELL:**
Delivered two major platform migrations for Capital One's fraud detection infrastructure — the ECS-to-Lambda migration is fully serving production traffic with the legacy service decommissioned, and the Vault to AWS Secrets Manager migration is live across Dev, QA, and Production. The client relationship was transformed from actively considering termination to renewing the contract for another year. Establishing structured sprint planning, weekly status reporting, and quarterly client reviews brought process discipline that gave the client visibility and restored confidence. The team reached a sustained 25–30 story point sprint velocity.

**What I could do BETTER:**
I could have pushed harder for consistent documentation practices across the team from the start. The initial ramp-up period required significant individual investigation to understand the legacy systems, and having thorough documentation in place — architectural decisions, migration patterns, lessons learned — would have made it much easier for new team members to onboard and contribute sooner. This is something I've already started prioritizing as the team moves into the Watchtower Platform work.

**What I will do NEXT:**
Apply the lessons learned from these migrations directly to the upcoming Watchtower Platform work — starting with a stronger emphasis on documentation so that architectural decisions, migration patterns, and technical context are captured as we go, making it easier for anyone to ramp up quickly. Continue building on the Agile processes and reporting cadence that proved effective, and integrate AI tooling wherever possible to accelerate delivery and improve efficiency.

---

## Priority 2: Complete Watchtower Platform Migrations (Third Party ACH + First Party Fraud App)
**Status:** In Progress

**What went WELL:**
Third Party ACH migration is running in shadow mode in production — all 9 Python rules were successfully converted to DMN and deployed on Watchtower Platform, with the system actively comparing legacy and new platform decisions. The engineering-heavy phase is complete and we are working through minor mismatches to reach the 99.99% decision-matching threshold. The planning phase for the First Party Fraud App migration was initiated early, with senior developer Ana leading the Watchtower Platform assessment and team onboarding. Lessons learned from the Third Party ACH effort were systematically captured and used to shape the First Party migration approach — scaling coordination patterns from a 9-rule effort to a 60-rule effort. The epic-ownership model ensures every developer will own specific rule sets, reducing single-point-of-failure risk.

**What I could do BETTER:**
I could invest more upfront time in data element mapping before beginning rule conversion — some of the mismatches identified during Third Party ACH shadow mode stemmed from data element differences that could have been caught earlier with a more rigorous pre-conversion validation step. I should also formalize the collaboration process with Fraud Strategy earlier in the cycle, since their sign-off is a critical dependency and scheduling can be a bottleneck. For the First Party migration, I need to ensure the team's onboarding is deep enough that all developers can work independently on their assigned rule sets without creating bottlenecks on the few team members with the most Watchtower Platform experience.

**What I will do NEXT:**
Drive Third Party ACH to full production authority by resolving the remaining mismatches and achieving the 99.99% decision-matching rate. Execute the First Party Fraud App migration as a coordinated all-hands effort — all ~60 Python rules converted to DMN and deployed on Watchtower Platform by the November 2025 target. Apply the Python-to-DMN AI conversion POC where possible to accelerate rule conversion. Implement incremental production cutover with post-decision validation before scaling to 100% traffic.

---

## Priority 3: Transform Team Performance and Build a Culture of Ownership
**Status:** Completed

**What went WELL:**
Designed and implemented a custom Agile framework with an epic-ownership model that gave each developer end-to-end responsibility — from story creation through delivery. This directly resolved the client's key frustration about having to create stories for the team. The team went from zero completed deliverables to a consistent 25–30 story point sprint velocity. Client feedback shifted from requesting personnel changes to stating "I have hope again in this team." Mentored 4 developers across different experience levels with regular 1:1s and career development support — including actively pursuing a promotion for one of my direct reports who has earned consistent positive feedback from the client. Successfully managed a mid-engagement team member departure (Arpita) and onboarded a replacement (Jerry) without disrupting delivery. Departing team member's feedback — "best team I've ever been on" — validated the culture and leadership approach.

**What I could do BETTER:**
The epic-ownership model was the right approach for the context we inherited — the team needed to build credibility by demonstrating they could independently create and deliver work without relying on the client. Going forward, the ideal setup would involve closer collaboration with a dedicated Product Owner to define and prioritize work, which would let the developers focus more on execution while still maintaining the ownership mindset. I'd also like to formalize the Agile framework I designed into reusable documentation that can be shared across engagements. And as a first-time Tech Lead with direct reports, I'm continuing to grow in balancing technical contribution with people leadership — leaning more into coaching developers through challenges rather than jumping in directly.

**What I will do NEXT:**
Continue following the Agile framework that's proven effective, with a stronger emphasis on documentation across the team to reduce knowledge gaps and improve resilience — ensuring any developer can pick up context on any workstream quickly. Focus the team's energy on the upcoming First Party Fraud App migration, which will be the largest and most complex effort to date and will require tight coordination across the full team.

---

## Priority 4: Mentor Counselee Through Career Development and Promotion to Senior Analyst
**Status:** Completed

**What went WELL:**
Established a consistent and reliable coaching rhythm with counselee Ivanelyz — biweekly calls and at least weekly chat check-ins — which built strong rapport and trust despite being on different projects. Identified growth and learning opportunities aligned with her strengths and career aspirations. Coached her on writing concise, well-framed priorities — a skill that directly strengthened her promotion case. Advised her to proactively reach out to her previous manager for feedback, who confirmed she was already performing at the next level. Used that data to build a compelling, evidence-based promotion narrative and represented her effectively during the official performance call. The result: Ivanelyz was promoted to Senior Analyst.

**What I could do BETTER:**
I could have started the feedback collection process earlier in the cycle rather than closer to the performance call window. Having that data sooner would have given us more time to refine the narrative and identify any gaps to address. I also could have introduced her to a broader network of senior colleagues earlier — expanding her visibility beyond her immediate project team would have created additional advocates and development opportunities. While the coaching cadence was consistent, I could have been more structured about tracking her progress against specific development goals between sessions.

**What I will do NEXT:**
Continue mentoring Ivanelyz in her new Senior Analyst role with adjusted coaching focused on growth at the new level rather than promotion preparation. Help her define concrete development objectives and identify stretch opportunities appropriate for Senior Analyst. Apply the full promotion lifecycle experience — priority framing, feedback collection, narrative building, performance call representation — to future counselees. Begin building a lightweight coaching framework that I can use consistently across mentoring relationships.

---

## Priority 5: Continue Counselee Development and Engagement as Ongoing Mentor
**Status:** In Progress

**What went WELL:**
Maintained the consistent biweekly coaching calls and weekly chat engagement with Ivanelyz following her promotion, ensuring continuity in the mentoring relationship. Successfully transitioned the coaching focus from promotion-oriented to growth-oriented, working with her to identify development objectives appropriate for the Senior Analyst level. The trust and rapport built during the promotion cycle carried forward, making it natural to shift to longer-term career development conversations.

**What I could do BETTER:**
I could be more structured about setting measurable short-term goals between sessions so we have concrete progress to review rather than relying on open-ended conversations. I should also explore connecting her with other mentors or sponsors who could provide complementary perspectives and expand her professional network within Accenture. I need to be more intentional about balancing reactive support (helping with immediate challenges) with proactive development (pushing toward stretch goals and new experiences).

**What I will do NEXT:**
Help Ivanelyz establish a clear development plan with specific, time-bound objectives for the remainder of FY26. Identify at least one stretch opportunity or cross-functional exposure that pushes her growth at the Senior Analyst level. Continue the consistent coaching cadence while evolving the conversation topics to match her development stage. Look for opportunities to connect her with relevant colleagues across the account or within AABG.

---

## Priority 6: Establish AI Coaches Initiative and Enable AI Adoption Across the Account
**Status:** Completed

**What went WELL:**
Co-founded and led the AI Coaches initiative from nothing — no budget, no formal mandate, built entirely through shared passion and initiative. Enabled all 30 Accenture development teams at Capital One on VS Code + GitHub Copilot. Secured funding for AI tool access for the coaching team. Led the organization of a 3-day AI Bootcamp during Thanksgiving week on personal time — designed the curriculum and topics, personally presented on prompt engineering, and coordinated other AI Coaches to deliver sessions on spec-driven development, RAG, MCP, and AI agents. Identified and proposed the Python-to-DMN AI conversion POC — directly applicable to the upcoming Watchtower migrations — which was well-received by the client and senior developer Ana. Three AI Coach roles were sold to Capital One, generating new revenue for Accenture. Completed the Accenture Reinvention training and earned the Credly badge. I was awarded the Capital One Divergent Award for challenging the status quo and driving innovation.

**What I could do BETTER:**
The initiative's mission sharpened over time through experimentation — but defining a tighter set of objectives earlier would have given the coaching team something concrete to rally around sooner and shortened the initial exploration phase. Similarly, establishing formal success metrics and adoption tracking from the start would have strengthened the business case with harder data. On the bootcamp side, prep and delivery happened outside of client hours, which is typical for learning initiatives — but when the client furloughed our teams during Thanksgiving week, my delivery lead and I secured a charge code for the coaches so they could stay productive, turning a scheduling gap into a focused learning opportunity.

**What I will do NEXT:**
Continue supporting the AI Coaches initiative and look for opportunities to socialize our content to the broader Accenture community so that others can benefit from our learning and materials in their own AI journeys. Support the onboarding and ramp-up of the 3 newly sold AI Coach roles. Continue advocating for expanded AI tool access for contractors beyond GitHub Copilot. Develop follow-up training materials and structured practice sessions to deepen AI adoption across the account.

---

## Priority 7: Develop and Apply AI POCs to Accelerate Client Delivery
**Status:** In Progress

**What went WELL:**
Continued developing the Python-to-DMN AI conversion POC, refining templated prompts and conversion methodology for direct application to the First Party Fraud App migration. The POC is positioned as a key accelerator for the upcoming 60-rule migration, with the potential to significantly reduce manual conversion effort. Began exploring additional AI POC opportunities across the account, identifying use cases where other Accenture teams can leverage AI within the client's approved tooling constraints. The proactive cross-team exploration demonstrates that AI enablement extends beyond a single team.

**What I could do BETTER:**
I need to move faster from POC to production-applicable tooling — the gap between a promising proof-of-concept and a reliable, repeatable tool that the full team can use requires more focused investment. I should also be more systematic about documenting edge cases and limitations discovered during POC development so the team has realistic expectations about where AI-assisted conversion works well and where manual effort is still needed. Balancing POC development with primary delivery commitments has been a challenge — I could be more disciplined about allocating dedicated time blocks for innovation work.

**What I will do NEXT:**
Apply the Python-to-DMN POC directly to the First Party Fraud App migration and measure the actual acceleration achieved versus manual conversion. Develop at least one additional AI POC applicable to other delivery teams on the account. Support the 3 new AI Coach roles in identifying and executing their own AI use cases. Document the end-to-end AI-assisted conversion methodology so it can be replicated by other teams and on future engagements.

---

## Priority 8: Strengthen AABG Atlanta Local Community Through Events and Networking
**Status:** In Progress

**What went WELL:**
Organized team dinners for local AABG colleagues in the Atlanta area, successfully bringing together team members from different client engagements for informal networking and relationship building. These events created natural channels for sharing best practices and client experiences that don't exist in the day-to-day project structure. Took the initiative to organize events without any formal budget or community mandate — relying on personal effort and grassroots coordination. The response from colleagues has been positive, with interest in expanding the cadence and variety of activities.

**What I could do BETTER:**
I could establish a more regular and predictable event cadence — ad-hoc scheduling makes it harder for people to plan around and reduces attendance consistency. I should also diversify the event types beyond team dinners to include knowledge-sharing sessions, career development discussions, or community service activities that provide more varied engagement opportunities. I need to delegate more of the logistics and planning to build a shared ownership model rather than being the single organizer, which would make the community more sustainable.

**What I will do NEXT:**
Establish a regular monthly or bimonthly event cadence for the remainder of FY26. Organize at least 2 community-oriented AABG activities (beyond team dinners) to meet the community volunteering metric. Recruit 1–2 co-organizers from the local AABG group to share planning responsibilities and bring fresh ideas. Explore formal or informal sponsorship options to support event costs and increase the scope of what we can offer.
