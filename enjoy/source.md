*May 1, 2026*

# A Marxist Guide to Getting Rich in AI: A Theoretical Reconstruction of the AI Transition and Operating Framework for Evaluating Future Value in AI

### 1. Introduction

Earlier this month, I was lucky to have attended Sequoia Capital’s AI Ascent
conference. Talks and presentations were given by many of the most interesting
founders and operators working in AI today.

As a non-engineer in the tech industry, I’ve looked for opportunities to
leverage my interests and skills to bring a new perspective to bear on an old or
new challenge. And as I reflected on my conversations at AI Ascent, I was
struck by how many of them seemed to hinge on topics and subject matter that
did not immediately read as technical.

Many thematically paralleled discussions that I’d been having at work. For
instance, at a recent Observable All Hands, an engineer discussed his work
writing evals and skills for AI use. He kept using phrases like “stochastic” or
“non-deterministic” to describe the new challenges posed by a machine whose
outputs could not necessarily be predicted by its inputs. He described edits he
had made to his prompts, how the system seemed to prefer the use of this or that
word over some traditional engineering nomenclature, or how even the emotional
tone of a prompt would impact its success.

What I heard being described sounded less like engineering and more like
the work of a product marketer or political strategist, struggling to find
language that would best engage, convince, and activate his audience. My
suggestion was that he spend less time that week with this “technical” team and
pay a visit to the Demand Gen or PMM folks. After all, theirs was a discipline
that for decades had wrestled with the vagaries of human language locked in
struggle with algorithms and search engine optimization.

The following essay was inspired by these recent thoughts and discussions. I am
among those who believe that the line between humanities and hard sciences is
blurring at an accelerating rate, and that the interplay between the two will be
more important in the coming era than ever before. Not only important; I think
that knowledge in philosophy, poetry, psychology, music and many of the
so-called “arts and letters” will be a necessary component to not only
understanding, but building and thriving in the AI age.

The essay is structured in three parts. Part I develops a theoretical account of
the AI transition as a third industrial revolution — one that operates on
cognition rather than energy or information — situated in the longer history of
specialization, commodification, and epistemic opacity. Part II derives from
that account a portable factor matrix: a seven-dimensional rubric for evaluating
where durable value will accrue. Part III applies the matrix as an investment
memo: categorically across the technology stack, vertically across professional
domains, and finally company-by-company, beginning with Sequoia portfolio
companies, proceeding to Thrive Capital's positions, and closing with a few hot
takes and observations about today's buzziest companies and technologies.

Part I — Theoretical Foundations
--------------------------------

### 1. Abstract

The dominant framing of contemporary AI treats it as a labor-saving technology
that automates white-collar work. This is analytically thin and unsatisfying. It
mistakes a surface effect (task displacement) for a structural transformation:
the industrialization of cognitive labor itself. I argue that the present moment
is most accurately understood as the third in a sequence of modern industrial
transitions. The first industrialized physical energy and matter (1760s-1850s),
the second industrialized information and symbols (1940s-2000s), and the third —
now underway — industrializes cognition.

Each transition follows a predictable arc from craft to profession to industrial
system to commodity. Each transition is also mediated by three concurrent
processes: (i) **specialization** (the decomposition of expert work into
discrete operations); (ii) **commodification** (the rendering of those
operations into fungible market inputs); and (iii) **black-boxing** (the
encapsulation of internal complexity behind operational interfaces).

I argue that the AI transition is unique in that it acts not on physical or
symbolic processes but on the *judgment* that previously coordinated them. I
further argue that this acting-upon-judgment generates a distinctive set of
investment heuristics. The essay closes by deriving those heuristics,
formalizing them as a factor matrix, and then applying that matrix to the
contemporary venture-financed AI landscape.

### 2. Introduction: The Industrialization of Cognition

In 1776, Adam Smith opened *An Inquiry into the Nature and Causes of the Wealth
of Nations* with the famous parable of the pin factory. In short, Smith noted
that a single worker, doing all steps alone, might produce only a handful of
pins per day. However, in a small factory where the process is broken into
distinct specialized tasks (drawing out the wire, straightening it, cutting it,
sharpening its point, etc.), a few workers, each focused on a narrow step, could
collectively produce tens of thousands of pins per day.

His point is often read as a homily about productivity or division of labor.
For purposes of this paper, I take it instead as epistemological: the value of
a pin had been decoupled from the knowledge of any one pin-maker. What had once
been a unified craft — the expert judgment of a single artisan, applied across
over a dozen distinct operations that were required to make a pin — had been
redistributed across a system. No worker in the factory could make a pin alone.
The factory, considered as an object, knew how to make pins. The workers,
considered as individuals, did not.

This decoupling between a system's capability and any individual contributor's
expertise is the recurring motif of industrial revolutions. The steam engine
industrialized muscular force: it was not that power became cheaper, but that
power became a separable input, sold by the kilowatt rather than embodied in the
labor of the user. Later, the integrated circuit and its descendants
industrialized symbol manipulation: clerical labor, calculation, transmission,
retrieval, and storage became infrastructure rather than craft. Each transition
produced a class of artisans whose work was first dignified, then routinized,
then dissolved into the substrate. The horseshoer became a wheelwright became a
mechanic, who, in turn, and in the ultimate reduction, becomes a
software-defined service.

The AI transition is structurally homologous but operates at a higher rung on
the cognitive ladder. What is being industrialized is neither physical force nor
symbolic manipulation, but **judgment** — the capacity to weigh, contextualize,
infer, draft, summarize, diagnose, advise, defend, model, and decide that has,
since the bureaucratic revolutions of the late nineteenth century, defined the
white-collar professions.

The operational claim of this essay is that *expert judgment is now becoming a
separable input*, in much the same way that mechanical power and symbol
manipulation became separable inputs in the prior two transitions. It will be
sold by the inference, embedded in workflows, and increasingly governed by
service-level agreements rather than by, say,  professional ethics.

This is not a forecast. It is a description of what foundation models, agentic
systems, vertical AI applications, and inference infrastructure are presently
doing, in production, at the scale of trillions of tokens per day. Our attention
here is foward-looking: where, in such a transition, does value accrue?

### 3. Three Industrial Transitions: A Periodization

It is analytically clarifying to set the three transitions side-by-side. The
lineage from craft to system to commodity is the same in all three; what differs
is the layer of human capability being abstracted.

| Transition | Period | What is industrialized | Characteristic input | Characteristic infrastructure | Characteristic commodity |
| --- | --- | --- | --- | --- | --- |
| **First** | c. 1760–1850 | Physical force | Coal, water, steam | Mills, foundries, railways | Pig iron, textiles, kilowatts |
| **Second** | c. 1940–2010 | Symbol manipulation | Silicon, bandwidth | Mainframes, internet, cloud | CPU cycles, packets, storage |
| **Third** | c. 2017– | Cognitive judgment | GPUs, training data | Foundation labs, agent fabric | Tokens, inferences, decisions |

Several observations follow from this periodization. These aren’t unique to me
or this paper, though they do compound in novel ways once combined.

The most important of them is that **each transition's commodity is the prior
transition's craft.** The blacksmith was a respected artisan in 1750. By 1880,
his work had been absorbed into the foundry and his role had been narrowed to
operating a single part of someone else's process. Likewise, the bookkeeper of
1920 was a skilled professional whose practice had been built up over years of
formal training. By 1990, most of what a bookkeeper did had become a ten-line macro
inside an Excel sheet maintained by a junior staffer.

We are now watching the same compression happen to the associate attorney, the
radiologist working through routine reads, the financial analyst building
comparable-company books, the consultant assembling industry primers, the
engineer writing infrastructure boilerplate. My point is descriptive, and not
meant to be pejorative. Each prior cycle was painful for the artisan caught in
it but net welfare-positive once the dislocation resolved (at least on a macro
scale, and within what we might call capitalist or  non-leftist ideological
frameworks). There is reason to expect the same arc here, and perhaps on roughly
the same timeline.

A second observation is that **each transition produces a control layer that did
not exist before it.** The factory and the joint-stock corporation are the first
transition's institutional inventions. The platform and the API are the
second's. The third is currently producing — under various names, none yet
settled — what I will call in Part II the **cognition systems**: the
infrastructure that sits between human intent and machine reasoning and governs
what gets translated, when, and under what conditions. Wherever Microsoft, AWS,
and Google sit in the architecture of the second transition, the equivalent
position in the third will be occupied by whoever owns this layer. Identifying
the layer is most of what the rest of this essay is about.

The third observation is uglier. Every prior industrial transition has come
bundled with its own characteristic anxieties. These anxieties are usually
initially dismissed by partisans of the new order as nostalgia. However, they
often turn out, years and often decades later, to have been pointing at
something real all along. Romanticism, the Luddite movement, and Marx's account
of alienation were the first transition's version. The cybernetic-era worries
about surveillance, depersonalization, and bureaucratic capture that I grew up
with, were the second's. The current version, which is everywhere in the present
discourse, is the **black box** — the worry that consequential decisions are
being made by systems whose internal reasoning cannot, even in principle, be
inspected. The temptation among technologists is to treat this as confused or
transitional. I think that is wrong, and Section 6 will make the case for why
the opacity is not a temporary engineering deficit. I argue that it is
structural to the technology, and a non-trivial fraction of the value capture in
the cycle will go to firms that build the apparatus by which institutions can
deploy black-box cognition in settings where its outputs matter.

### 4. Specialization: The Smithian and Durkheimian Lineages

Specialization is the precondition for industrial transitions. Smith's pin
factory is the canonical example, but the deeper analysis appears in Durkheim's
*The Division of Labor in Society* (1893). Durkheim observed that specialization
is not merely an efficiency mechanism but a **social-structural** one: it
transforms the kind of solidarity that holds a society together from
*mechanical* (resemblance among similarly skilled persons) to *organic*
(interdependence among specialists).

The implication for our purposes is that specialization is doing two things
simultaneously. It is decomposing complex tasks into discrete operations
susceptible to optimization (the Smithian effect), and it is producing new forms
of social coordination among the resulting specialists (the Durkheimian effect).
Both effects are operating in the AI transition. Foundation model labs,
inference providers, agent orchestrators, and vertical applications are emerging
as a *system* of specialists, each of which depends on the others for the larger
product (general-purpose cognition delivered into a workflow).

Harry Braverman's *Labor and Monopoly Capital* (1974) extended this analysis
with the concept of **deskilling**: the process by which tacit, experience-based
judgment is extracted from skilled labor, codified into procedures, and
re-embedded in capital equipment, thereby reducing the bargaining power and
remuneration of the worker. Braverman's case study was the machinist in
twentieth-century manufacturing, but the structure of his argument generalizes
cleanly. The associate attorney drafting a routine motion, the radiologist
reading a chest x-ray, the accountant preparing a Schedule K-1, the junior
consultant building a comparable-company analysis: these are the machinist's
positions in the third transition. Their tacit judgment is presently being
extracted, codified into model weights and prompt scaffolds, and re-embedded in
software products that are, by design, sold not to them but to their employers.

The Polanyi brothers — Karl on the disembedding of markets (*The Great
Transformation*, 1944), and Michael on tacit knowledge (*Personal Knowledge*,
1958) — frame the limit case. Michael Polanyi famously observed that "we know
more than we can tell"; his interest was the residual of expert judgment that
resists explicit codification. The AI transition is, in part, an empirical test
of how much of "what we know but cannot tell" can in fact be told once large
enough models are trained on enough demonstrated behavior. Early returns suggest
the residual is smaller than mid-twentieth-century philosophy of science
assumed. This has direct economic consequences: domains that were thought to be
insulated from automation by virtue of their tacit-knowledge intensity
(medicine, law, design, scientific intuition) are precisely the domains where
the most aggressive vertical applications of AI are presently emerging.

### 5. Commodification: From Marx to the API (or, from craft to cruft)

**Commodification** describes the process by which a previously embedded,
particular, qualitatively distinctive activity becomes a fungible, exchangeable
input traded in markets. Marx's analysis of the commodity in *Capital* (Volume
I, Chapter 1) emphasized that the commodity-form abstracts away from the
concrete labor that produced it. The commodity is interchangeable with any other
instance of itself. Karl Polanyi's later analysis in *The Great Transformation*
extended this to argue that the commodification of land, labor, and money — none
of which are produced for sale in the manner of ordinary goods — was the
constitutive transformation of the modern market economy.

The AI transition is producing a new fictitious commodity, comparable in
significance to land, labor, and money: cognition itself. Inference, considered
as a service, is now sold in the same form as electricity. It is metered (per
token, per call), it is fungible across providers (with switching costs and
quality differentials), it is delivered via standardized interfaces (APIs), and
its underlying production process is opaque to the buyer. The economic structure
of the foundation model market — falling unit prices, capacity constraints in
upstream compute, differentiation along quality and latency dimensions — is
recognizably the economic structure of an industrializing commodity, not of a
craft.

Three downstream effects of this commodification are of direct investment
relevance.

**First, commodification compresses producer margins.** The foundation model
layer, considered in isolation, is moving toward cost-plus economics on
inference, with quality differentials concentrated at the frontier. The unit
economics of a model lab look more like those of a fab than those of a software
company: very high fixed costs, rapidly declining marginal cost, quality-tiered
pricing, capacity constraints determining short-run rents. This is a partial
answer to the question of why foundation labs are valued as they are despite
negative free cash flow at scale: they are being valued as future utilities, not
as present software businesses.

**Second, commodification transfers value to complements.** The classic result
in the economics of complementary goods is that when one input commodifies,
value flows to the complementary inputs that remain scarce.[^2] In the second
transition, the commodification of computation transferred value to operating
systems, applications, content, and brand. In the third transition, the
commodification of inference will transfer value to whatever remains scarce
*given* abundant cognition: proprietary data, distribution into regulated
workflows, trust and auditability, integration into systems of record and
systems of action. This is the central architectural claim of the essay, and it
organizes Part II.

[^2]: *See*, *e.g.*, Arrow (1962) and Shapiro & Varian (1998)

**Third, commodification produces a particular kind of strategic
vulnerability.** A company whose product is a thin presentation layer over a
commodifying input — a "wrapper" — captures none of the rents from the input's
commoditization and is exposed to disintermediation by both the input provider
(which can move down the stack) and by competitors (which can replicate the
layer). The history of the second transition is full of such companies: search
engines that wrapped search APIs, e-commerce front-ends that wrapped logistics
APIs, content sites that wrapped CMS APIs. Most went to zero. The investment
heuristic that follows is straightforward: a commodifying input is not a moat;
it is an opportunity to build a moat *adjacent* to it.

### 6. The Black Box: Epistemic Opacity as a Structural Feature

The next concept is the most philosophically delicate. **Black-boxing**, in
Bruno Latour's formulation (*Pandora's Hope*, 1999), is the process by which a
working assemblage of practices, components, and judgments becomes opaque to its
users — a single object that takes inputs and produces outputs, with the
internal mechanism rendered functionally invisible. Latour was describing all
functioning technical systems: the user of a microscope does not need to
understand its optics, the user of a car does not need to understand its
powertrain. Black-boxing is, in Latour's analysis, the *condition of usability*
of complex systems. It is what allows a system to be deployed by users who did
not build it.

The black box becomes problematic only at the boundary where its outputs are
consequential and its reasoning is contestable. A microscope that reports the
wrong magnification produces a measurement error. A diagnostic AI that
recommends the wrong treatment produces a clinical injury. A legal AI that
drafts a flawed motion produces a malpractice claim. A credit-scoring AI that
denies a loan to a qualified applicant produces a civil rights violation. In
each of these cases, the black-box property of the system is not a peripheral
inconvenience; it is constitutive of the system's risk profile.

Frank Pasquale's *The Black Box Society* (2015) and Jenna Burrell's "How the
machine 'thinks'" (Big Data & Society, 2016) offered the canonical taxonomy of
opacity in algorithmic systems: opacity by design (intentional concealment for
commercial reasons), opacity by technical complexity (the system's reasoning is
in principle inspectable but in practice illegible), and opacity by deep
architecture (the system's reasoning is, given current methods, irreducibly
inaccessible — the case of high-dimensional learned representations).
**Foundation models exhibit all three forms simultaneously**. They are
commercially closed, computationally complex, and architecturally inscrutable.
This is not a failure of contemporary AI; it is, on present technical
understanding, a fundamental property of the technology.

The structural argument I want to advance is the following. **The black-box
property of foundation models is not a temporary engineering inconvenience that
will be solved in a future release. It is a permanent feature of the cognitive
industrialization, exactly as the opacity of the factory was a permanent feature
of the first industrial revolution.**

The pin factory was a black box to its workers — none of them could account for
the production of the pin. The AWS data center is a black box to its tenants —
they cannot inspect the physical reality of their compute. The foundation model
is and will remain a black box to its users — they cannot inspect the chain of
inference that produced its output. In each case, the black-box property is the
*condition* of the system's economic utility, because it is what permits the
system to be sold without the buyer having to acquire the seller's expertise.

This observation reframes the so-called "interpretability problem" from a
technical research agenda into a market structure. **Interpretability,
auditability, traceability, and verifiability are not the absence of the black
box; they are products that wrap the black box and make it deployable in
contexts where its outputs are consequential.** Every regulated industry, every
fiduciary relationship, every audited workflow, every contestable decision —
these are markets for inspection and trust products that sit *over* the
foundation model layer. The companies that build these products are not solving
the black box; they are profiting from its permanence.

This is the second central architectural claim of the memo, and it pairs with
the first. Commodification of cognition transfers value to scarce complements.
The most undersupplied complement is **epistemic trust**: the apparatus of
inspection, audit, verification, citation, traceability, and governance that
allows institutions to deploy black-box cognition in consequential settings. The
companies that own this apparatus will be among the most durable winners of the
cycle.

### 7. Synthesis: The Three Phases of the AI Transition

Specialization, commodification, and black-boxing are the axes along which the
AI transition is reconfiguring cognitive labor. They are interdependent rather
than orthogonal. For instance, work has to be decomposed into operations before
those operations can be priced as fungible inputs, and that resulting capability
has to be wrapped in an interface that hides its complexity before institutional
buyers (“enterprises”) will adopt it at scale. The combined motion is the same
craft-to-system-to-commodity arc that has defined every prior industrial
revolution. What is new is the layer the arc operates on.

For our purposes, the arc, when applied to cognition, runs roughly as:

tacit expert judgment → codified operational procedure → model-mediated workflow
→ system of record / system of action → commoditized output

[turn into flow chart?]

The artisan sits at the left of this chain. Here, we should imagine the senior
partner who has read every relevant case in her practice area, the senior
physician who has seen every relevant presentation in his subspecialty, or the
senior engineer who has debugged every relevant failure mode in her stack.

The commodity sits at the right. For instance, consider the lawyer’s draft
motion, a differential diagnosis, or an engineer's pull request on GitHub. These
are available on demand at marginal costs that approach the cost of inference.
The interesting question is what happens between those two poles. I believe that
whoever owns the work that gets done between them captures the rents from
everything downstream.

Several positions along the chain are unusually defensible. I want to call out
three explicitly because they carry most of the present-cycle investment
opportunity and because they organize the heuristic developed in the next
section.

The first position is the **system layer**. Codifying expertise into operational
procedures requires infrastructure for capturing, organizing, executing,
updating, and evaluating those procedures over time. This is the cognitive
analogue of the factory floor — and crucially, it is not the source of the raw
cognition. The foundation model is the source of raw cognition; the system layer
is the architecture inside which raw cognition gets composed into useful work.
Firms that own this layer — agent fabrics, orchestration runtimes, evaluation
infrastructure, developer tooling for cognitive systems — earn rents analogous
to those that operating systems earned in the second transition.

The second position is the **trust layer**. Deploying black-box cognition into
consequential settings requires an apparatus of inspection: observability for
agentic systems, audit trails for AI-mediated decisions, citation and
traceability infrastructure, governance and compliance products. The deeper the
regulatory or fiduciary intensity of the workflow being supported, the more
value the trust apparatus captures. Most institutional buyers in healthcare,
financial services, and legal cannot deploy AI-mediated decision-making without
this apparatus, and they procure it separately from the model.

The third position is the **vertical layer**. Some professional domains will
never be served well by a generic system, no matter how capable the underlying
model becomes. Legal practice, clinical workflow, claims adjudication, and
customer service involve enough institutional knowledge, regulatory
authorization, distribution relationship, and workflow specificity that the
right product is shaped end-to-end around the domain. The current vertical
winners — Harvey in legal, Abridge in healthcare, EvenUp in personal injury,
Sierra in customer experience — earn rents that scale with the budget gravity of
their verticals and with the difficulty of replicating the institutional
integration they have built.

These positions are not exhaustive, and the specific firms occupying them will
rotate over the cycle. I do believe that they are structurally privileged,
however, and they form the spine of the investment heuristic that Part II
develops.

### 8. Three More Concepts (yes, really)

Before formalizing the heuristic, three concepts cut across my analysis that I
have not yet introduced and so warrant explicit naming. These have less to do
with my academic interests than with my lived experience as a tech operator at
scale.

**Cognitive externalization.** By this, I mean work that previously required an
expert but that is now encoded into a system that does not require that expert.
This is the third-transition analogue of mechanization (first transition) and
digitization (second transition). The investment-relevant signal is the strength
and durability of the externalization. A thin chatbot externalizes nothing. On
the other hand, a system that learns from every transaction, accumulates
institutional context, and returns ever-more-targeted outputs externalizes
deeply.

**Workflow ownership.** This is the degree to which a system has become the
daily, recurring, depended-upon substrate of work in a domain, rather than a
one-off generative tool consulted occasionally. Workflow ownership is closer to
the operating system than to the application: it is what users return to, what
other systems plug into, and what the institution accidentally builds its
institutional memory inside. This was critical to our success at GitHub.

**Budget gravity.** It is easy in this new era to forget fundamentals from the
last, or to rush to dismiss them as irrelevant. But every tech founder — or
leader of any firm, for that matter — knows that their product or service must
attach to a corresponding budget within their customer’s business. Budget
gravity refers to the size and durability of the budget category to which a
product attaches. Software for legal research attaches to the legal services
budget, which is large, durable, and price-inelastic. Software for one-off image
generation attaches to a discretionary creative budget that I see as a dead-end.
Budget gravity is the unfashionable but reliable predictor of revenue scale, and
it is and will be the variable that most often separates the AI companies that
grow into durable firms from the ones that grow rapidly and then plateau.

These three concepts — externalization, workflow ownership, and budget gravity —
together with the structural analysis above, generate the seven-factor matrix to
which we next turn.

Part II — From Theory to Heuristic: The Factor Matrix
-----------------------------------------------------

Until now, I’ve argued that the AI transition is the third industrial
revolution, that it operates on cognitive judgment, and that its dynamics are
governed by specialization, commodification, and black-boxing. This is all well
and good, but very academic. And I am not academic. I am business operator. So,
here in Part II, I seek to operationalize the theory from Part I.

The seven factors below are the variables by which a given firm can be scored
against the structural model.

### The Seven Factors

**Factor 1 — Cognitive Externalization.**

We begin at the heart of my thesis. The operative question: *Does the product
encode expert work into repeatable systems?*

This is a direct measurement of the depth of the deskilling-to-system
trajectory. A high score means the product turns tacit judgment into software. A
low score means the product is a generic interface to a foundation model that
adds no structural capture of expertise. There are many, many companies and
technologies creating technologies that appear to externalize cognition, but
that are in fact simply thin wrappers around foundational models. These will
fail, be copied, or consumed.

**Factor 2 — Workflow Ownership.**

*Does the product sit inside recurring work, or is it a one-off generation?*

High scores here indicate that the product has become the substrate of a
habitual professional process. Low scores indicate it is an occasional novelty.
This factor is the proxy for net retention and the leading indicator of lasting
ARR and revenue durability.

**Factor 3 — Epistemic Trust and Auditability.**

*Can users inspect, verify, cite, trace, or govern outputs?*

High scores indicate that the product has solved the black-box risk for its
target context or else wraps the black box in a way that does.  Low scores
indicate exposure to regulatory, fiduciary, or reputational shutoff. This factor
is, as argued in Section 6, a permanent rather than transient source of value.

**Factor 4 — System-of-Action Potential.**

*Can the product execute, not just recommend?*

High scores indicate the system can transact, write to systems of record, take
actions in external systems, or close loops without a human in the middle. Low
scores indicate the product is a recommender that is consumed by a human who
then takes the action.

**Factor 5 — Data and Feedback Loop.**

*Does usage improve the product or create proprietary training data?*

High scores indicate compounding moat — the product gets better with use in ways
competitors cannot easily replicate. Low scores indicate the product's quality
is bounded by the underlying foundation model's quality.

**Factor 6 — Commoditization Resistance.**

*Is the product structurally hard for OpenAI, Anthropic, Microsoft, or Google to
compress?*

High scores indicate distribution, regulation, data, integration, or
institutional moats that are not within easy reach of the platform layer. Low
scores indicate the product is a feature, not a company.

**Factor 7 — Budget Gravity.**

*Does the product attach to large, durable, existing budget categories?*

High scores indicate easy paths to revenue scale through professional-services
budgets, IT budgets, or category-specific operating budgets. Low scores indicate
dependency on novel or discretionary spend.  

### Scoring Rubric

Each factor is scored on a 1–5 scale, with the following interpretive anchors:

| Score | Meaning |
| --- | --- |
| 1 | Factor is absent or actively negative |
| 2 | Factor is weakly present; mostly aspirational |
| 3 | Factor is credibly present; competitive with peers |
| 4 | Factor is a structural strength; differentiated |
| 5 | Factor is a category-defining moat |

The aggregate score (sum across seven factors, max 35) is interpretable as a
single number, but the *shape* of the score matters more than the magnitude. A
28 with 5s on workflow ownership, externalization, and budget gravity but a 2 on
commoditization resistance is a fundamentally different investment from a 28
with 5s on commoditization resistance and budget gravity but a 2 on
system-of-action potential.

### The Investor's Reformulation

For simplicity (too late?), the seven-factor matrix may be collapsed into a
single working heuristic:

**A strong AI investment captures an expensive cognitive workflow, gets embedded
into the system of record or the system of action of the institution that runs
that workflow, compounds through proprietary feedback, and carries enough
epistemic trust that regulated or fiduciary buyers can adopt it without
exposure.**

A weak AI investment is the inverse: a generic presentation layer wrapped around
a frontier model, producing outputs that are substitutable across vendors and
that decay in unit economics every time the underlying model layer cuts pricing.
Most of the casualty list of the prior cycle's AI cohort fits this description,
and most of the casualty list of the present cycle will too.

Practically, the heuristic resolves into a small number of structural pathways.
The most attractive in the present cycle is owning the system layer — the
runtime, fabric, or workbench inside which cognition gets composed into useful
work. This is the OS-position of the third transition, and a firm that occupies
it inherits the leverage that Microsoft and AWS inherited in the second.

The second pathway, and the one I think is most undervalued at this moment, is
owning the trust apparatus that wraps the black box: observability, evaluation,
audit, citation, governance, and policy enforcement around cognitive systems.
The argument for this pathway runs through Section 6 — the opacity of foundation
models is permanent, the buyers of consequential applications have no choice but
to procure inspection separately, and the firms that supply that inspection have
been mispriced as developer-tools companies when they should be priced as
financial-services software companies.

The third pathway is vertical. Find a professional domain in which judgment is
expensive, regulated, and workflow-bound; build the cognitive system that owns
that domain end-to-end; capture the institutional integration that makes the
position hard to replicate. The vertical winners in legal, healthcare, customer
experience, and clinical workflow are the present cycle's clearest expressions
of this pathway.

A pathway worth flagging negatively: the company whose pitch is "GPT for
[profession]" without a serious answer to workflow ownership, audit posture, or
institutional integration. These firms are exposed on every axis of the matrix
at once and have no obvious path to a defensible position.

Part III — Application to Existing Investments
----------------------------------------------

This final section of the paper seeks to apply my framework to existing
investments.

I begin by organizing the technology landscape into eight common categories:

1.  Foundation Model Labs

2.  AI Infrastructure

3.  Agent Infrastructure

4.  Vertical Expert Systems (Legal, Health, Finance)

5.  Coding and software creation

6.  Creative production and media

7.  Scientific discovery, bio, agro, material sciences

8.  Customer services, sales, and GTM agents

#### A. Foundation Model Labs

*The new industrial foundries of cognition.* These firms encode general
reasoning capacity and sell it as infrastructure. The economic structure is
fab-like: very high fixed costs, fast-declining marginal cost, quality-tiered
pricing, and capacity constraints determining short-run rents. The category
includes OpenAI, Anthropic, xAI, Mistral, Cohere, DeepSeek, Reka, Reflection AI,
Thinking Machines, Poolside, Magic, Adept, AI21 Labs, Inflection, Character.AI,
Aleph Alpha, Stability AI, Black Forest Labs, Midjourney, and Runway (the last
two and Black Forest Labs being modality-specific frontier labs in image and
video).

*Matrix read.* Externalization 5, workflow ownership 3, trust 2–3,
system-of-action 3, feedback loop 5, commoditization resistance 5 at the
frontier and 2 below it, budget gravity 5. The bifurcation between frontier and
sub-frontier labs is structural rather than transitory: only frontier labs have
the capital to fund the next generation of training, and only the next
generation of training will sustain their economic structure.

*VC read.* These are Bell Labs plus electric utilities plus Zeiss. Massive value
capture is plausible but capital intensity is brutal and the winners-take-most
dynamic is severe. Generally, I believe that that venture capital should
position itself at the frontiers and avoid the middle layers.

#### B. AI Infrastructure: Inference, Compute, Data Plane

*The picks-and-shovels of cognitive industrialization.* This category profits
from the industrialization of cognition without needing to own end-user
judgment. It includes inference providers (Together AI, Fireworks AI, Baseten,
Replicate, Modal), compute clouds (CoreWeave, Lambda, Crusoe, Foundry, RunPod),
specialized hardware (Groq, Cerebras, Celestial AI, TensorWave, Modular,
SambaNova, Tenstorrent), data infrastructure (Vast Data, Weka, Pinecone,
Weaviate, Qdrant, Chroma, Turbopuffer), data labeling and human evaluation
(Scale AI, Surge, Mercor, Invisible Technologies, Snorkel AI, Turing), and the
model-distribution and developer hub layer (Hugging Face).

*Matrix read.* Externalization 3, workflow ownership 3, trust 2,
system-of-action 2, feedback loop 3, commoditization resistance 3–5 depending on
whether the firm has a real hardware, supply, or latency moat, budget gravity 5.
The category bifurcates between firms with structural supply constraints (Groq,
Cerebras, CoreWeave during the GPU shortage) and firms that risk becoming
margin-compressed cloud resellers.

*VC read.* Excellent if the firm has a real constraint to monetize. Dangerous if
the firm is a thin layer between commodifying compute and a customer that will
eventually buy direct.

#### C. Agent Infrastructure: Browsers, Web Agents, Orchestration

*The execution layer for cognitive labor.* This is where reasoning becomes
action over external systems. The category includes web-and-browser
infrastructure for agents (Parallel, Browserbase, Tavily, Exa, MultiOn, Lindy,
Adept), orchestration frameworks (LangChain, LlamaIndex, Dust, CrewAI, Vellum,
Humanloop), evaluation and observability for agentic systems (Langfuse,
Braintrust, Galileo, Patronus AI, Arize, WhyLabs), workflow automation that has
pivoted toward agent execution (Zapier, Gumloop, Relevance AI), and the emerging
agent-payments and trust rails.

*Matrix read.* Externalization 4, workflow ownership 4, trust 3,
system-of-action 5, feedback loop 4, commoditization resistance 3–4, budget
gravity 4. The category's risk is absorption — by browsers (OS-level agentic
capabilities), by foundation labs (built-in agent loops), and by hyperscalers
(managed agent runtimes). The opportunity is becoming the Visa network or the
Lambda runtime of agentic work — the layer that no single platform can absorb
because it is multi-tenant, cross-cloud, and policy-governed.

*VC read.* High-conviction, high-variance category. The matrix favors firms that
own a piece of the agent stack that is *not* a commodity — payments, identity,
browser context, evaluation, audit — over firms that are SDK-thin orchestration
layers on top of foundation models.

#### D. Vertical Expert Systems: Legal, Health, Finance

*The cleanest expression of the thesis.* These firms take expensive professional
judgment and make it workflow-native. Legal: Harvey, EvenUp, Eudia, Legora,
Robin AI, Spellbook, Norm AI, Casetext / CoCounsel (now Thomson Reuters),
Ironclad, Lexion, Klarity, Lawhive, Paxton AI, Supio, Alexi, DraftWise, Crosby,
Eve Legal. Healthcare: Abridge, Ambience Healthcare, Hippocratic AI,
OpenEvidence, Tennr, Nabla, Suki, Corti, Freed, Regard, Commure, Innovaccer,
Tempus, Owkin, Viz.ai, PathAI, Qventus, Aidoc, Rad AI, SmarterDx. Finance /
accounting / tax: Hebbia, AlphaSense, FiscalNote, Pylon, Numeric, Klarity,
Basis, Truewind. Field operations and skilled trades: Tennr, Eilla, Field AI,
blue-collar agents — an emerging set.

*Matrix read.* Externalization 5, workflow ownership 5, trust 4 if the product
takes the regulatory commitment seriously, system-of-action 4, feedback loop 4,
commoditization resistance 4, budget gravity 5. This is the category with the
most uniformly high scores in the matrix.

*VC read.* Best near-term commercial category. The winners will not be "ChatGPT
for lawyers,” but systems that own documents, workflows, approvals, liability
boundaries, and institutional memory. The moat is institutional integration and
regulatory positioning, not model quality.

#### E. Coding and Software Creation

*The most obvious craft-to-system transition.* Software development was one of
the last high-status artisanal knowledge crafts; it is being industrialized in
real time. The category includes AI-native IDEs (Cursor / Anysphere, Windsurf /
Codeium, Replit, Lovable, Bolt / StackBlitz), autonomous engineering agents
(Cognition / Devin, Factory, Augment, Magic, Poolside), incumbent assistants
(GitHub Copilot, JetBrains AI, Tabnine, Sourcegraph Cody, Continue, Supermaven),
the code-review and PR layer (CodeRabbit, Graphite, Greptile), and
developer-workflow surfaces (Warp, Zed AI).

*Matrix read.* Externalization 5, workflow ownership 5, trust 3,
system-of-action 5, feedback loop 5, commoditization resistance 3–5, budget
gravity 5. The category is uniformly high on capture, variable on defensibility.

*VC read.* Enormous and crowded. The enduring wedge is not code generation; it
is owning the developer workbench, repository context, runtime, testing loop,
deployment path, and organizational memory. Every developer-tools company that
has won a generational position has done so by becoming the place developers
spend their day, not by being the best at one task. Cursor's ascent in 2025 is
the clearest demonstration; whether Cognition's autonomous-agent thesis or
Cursor's IDE-native thesis prevails is the most important architectural debate
in the category.

#### F. Creative Production and Media

*The industrialization of creative craft.* Voice, video, image, editing, music,
and brand content are being remade. The category includes Runway, Luma, Pika,
Black Forest Labs, Midjourney, Ideogram, Krea, Leonardo, Scenario, Photoroom,
Captions, HeyGen, Synthesia, Descript, Suno, Udio, ElevenLabs, Fal, Tavus,
Higgsfield, and the brand-content tooling (Typeface, Jasper, Writer, Copy.ai,
Tome, Gamma).

*Matrix read.* Externalization 4, workflow ownership 3, trust 2,
system-of-action 3, feedback loop 4, commoditization resistance 2–4, budget
gravity 4.

*VC read.* Explosive demand, brutal commoditization risk. The structural fork is
between firms that own a workflow (Runway, Synthesia, ElevenLabs in their
respective verticals) and firms that own a model (Black Forest Labs, Suno) — the
latter face the same fab-economics as foundation labs but in narrower
modalities. Avoid the middle: thin generators with no workflow and no
proprietary model.

#### G. Scientific Discovery, Bio, Materials

*AI applied to frontier epistemic production, not productivity.* This category
collapses the loop between hypothesis, simulation, experiment, and
commercialization. Examples: Lila Sciences, Periodic Labs, Insilico Medicine,
SandboxAQ, Isomorphic Labs, Recursion, Xaira, Genesis Therapeutics,
EvolutionaryScale, Cradle, CuspAI, Chai Discovery, Nabla Bio, Valence Labs,
Atomwise, Deep Genomics, Generate:Biomedicines, Terray, TetraScience, Benchling,
Schrödinger.

*Matrix read.* Externalization 5, workflow ownership 4, trust 5,
system-of-action 4, feedback loop 5, commoditization resistance 5, budget
gravity 5.

*VC read.* Potentially enormous, but long-cycle. The best companies do not sell
"AI to pharma"; they *are* pharma companies (or materials companies) with
AI-native discovery pipelines. The investable distinction is between *tool* and
*platform-with-asset* — the former is sold to pharma at single-digit multiples
on services revenue, the latter accumulates royalty streams and equity in
clinical assets.

#### H. Customer Service, Sales, and GTM Agents

*The most aggressive end-to-end commercial deployment of AI agents.* Examples:
Sierra, Decagon, Parloa, Ada, Forethought, Cresta, Kore.ai, Uniphore, PolyAI,
Qualified, Regie.ai, Clay, 11x, Artisan, Attention, ElevenLabs (agents product),
Gong, Clari, Outreach, Salesloft. Adjacent: enterprise-knowledge surfaces that
increasingly take action — Glean, Hebbia, Moveworks, Sana, Dust.

*Matrix read.* Externalization 5 in CX, 3–4 in sales, workflow ownership 5 in
CX, 3 in outbound, trust 3, system-of-action 5 in CX, feedback loop 5,
commoditization resistance 4 if the firm has incumbent integrations, budget
gravity 5.

*VC read.* CX is the tightest fit to the thesis: the workflow is well-defined,
the budget is large, the unit economics replace human FTE cost
dollar-for-dollar, and the ROI is measurable in weeks. Outbound sales is a
lower-conviction subsegment because the product's externality is borne by the
recipient, not the buyer; deliverability and trust dynamics will eventually
constrain the category. The CX winners are emerging clearly (Sierra, Decagon,
Parloa); the outbound category will see consolidation.

### 13. Vertical Decomposition

Categories are the technology axis; verticals are the demand axis. The matrix is
most usefully applied at the intersection of a category and a vertical. The
verticals where the matrix scores are highest, in declining order of
present-cycle attractiveness:

1.  **Legal services.** High budget gravity (\$350B+ globally), regulated
    workflows, document-intensive, fiduciary trust requirements. Vertical
    winners (Harvey, EvenUp, Norm AI, Eudia, Robin AI, Legora) score 30+ on the
    seven-factor matrix.

2.  **Healthcare administration and clinical workflow.** The largest budget
    category in the developed world, the most regulated, the most
    workflow-bound. Winners: Abridge, Ambience, Hippocratic AI, OpenEvidence,
    Tennr, Commure, Innovaccer.

3.  **Software development.** Largest discretionary technical budget,
    well-instrumented, fast feedback loop. Winners: Cursor / Anysphere,
    Cognition, Replit, Windsurf / Codeium, Lovable, Magic, Poolside.

4.  **Customer experience / contact centers.** Direct FTE replacement,
    measurable ROI, large budget. Winners: Sierra, Decagon, Parloa, Ada, Cresta,
    PolyAI.

5.  **Financial services research and analysis.** Hebbia, AlphaSense, Numeric,
    Truewind. Constrained by the slow procurement cycles of large financial
    institutions but highly defensible once integrated.

6.  **Scientific R&D.** Long-cycle but structurally privileged: see Section 12G.

7.  **Knowledge work in the enterprise (search, retrieval, productivity).**
    Glean, Notion AI, Sana, Moveworks, Writer, Dust. The danger is the platform
    overhang from Microsoft Copilot and Google's equivalent; the winners will be
    those who become workflow infrastructure rather than enterprise
    search-with-chat.

8.  **Creative and brand production.** High demand, high commoditization risk
    (see Section 12F).

9.  **Robotics and embodied intelligence.** Figure AI, Physical Intelligence,
    Skild AI, Apptronik, 1X, Wayve, Waabi, Applied Intuition, Anduril, Shield
    AI, Gecko Robotics. Long-cycle, capital-intensive, with the highest variance
    distribution of any category.

The ordering above is the *cycle-relevant* ordering. The decadal ordering (i.e.,
where the largest absolute value will accrue) likely promotes scientific R&D and
embodied intelligence considerably. That may be taken up in a later work.

### 14. The Open Layer: Why It Demands Its Own Treatment
