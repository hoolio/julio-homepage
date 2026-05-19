*Draft · May 18, 2026*

# A Marxist Guide to Getting Rich in AI: A Theoretical Reconstruction of the AI Transition and Operating Framework for Evaluating Future Value in the Space

Part I — Theoretical Foundations
--------------------------------

### Introduction

Last month, I was lucky to have attended Sequoia Capital's AI Ascent conference. Talks and presentations were given by many of the most interesting founders and operators working in AI today.

As a non-engineer in the tech industry, I've looked for opportunities to leverage my operational, structural, and "non-technical" interests and skills to bring new perspectives to bear on old and new challenges. As I reflected on my conversations at AI Ascent, I was struck by how many of them seemed to hinge on topics and subject matter that did not immediately read as "technical."

Many of these talks paralleled discussions that I've been having at work.

For instance, at a recent Observable All Hands, an engineer discussed his work writing evals and skills for AI use. He kept using phrases like "stochastic" or "non-deterministic" to describe the new challenges posed by a machine whose outputs could not necessarily be predicted by its inputs. He described edits he had made to his prompts, how the system seemed to prefer the use of this or that word over some traditional engineering nomenclature, or how even the emotional tone of a prompt would impact its success.

What I heard being described sounded less like engineering and more like the work of a product marketer or political strategist, struggling to find language that would best engage, convince, and activate his audience. My suggestion was that he spend less time that week with the "technical" team and pay a visit to the Demand Generation or Product Marketing folks. After all, theirs were disciplines that for decades have wrestled with the vagaries of human language and its intersection with algorithms and search engine optimization.

The following essay was inspired by these recent thoughts and discussions.

I am among those who believe that the line between humanities and hard sciences is blurring at an accelerating rate, and that the interplay between the two will be more important in the coming era than ever before. Not only important; I think that knowledge in philosophy, poetry, psychology, music and many of the so-called "arts and letters" will be a necessary component to not only understanding, but building and thriving in the AI age.

Moreover, as a company CEO and operator who has led and grown businesses and product-led organizations from seed stage to hypergrowth to multinational, multi-billion-dollar scale, I am on the search for practical frameworks and heuristics that help me and my peers make better decisions when it comes to AI — not simply theoretically interesting but ultimately testable hypotheses.

The essay is structured in four parts.

Part I develops a theoretical account of the AI transition as a third industrial revolution — one that operates on cognition rather than energy or information — situated in the longer history of specialization, commodification, and epistemic opacity. Part II derives from that account a portable diagnostic: five questions, asymmetrically weighted, that together constitute the investment case for any AI company. Part III applies the diagnostic as a field test across representative companies from Sequoia and Thrive portfolios. Part IV turns to the real economy — the AI-ification of existing businesses — which I think is where the largest absolute value of the cycle will ultimately be created, and which the current venture conversation has barely begun to address.

### Abstract

The dominant framing of contemporary AI treats it as a labor-saving technology that automates white-collar work. This is analytically thin and unsatisfying. It mistakes a surface effect (task displacement) for a structural transformation: the industrialization of cognitive labor itself. I argue that the present moment is most accurately understood as the third in a sequence of modern industrial transitions. The first industrialized physical energy and matter (1760s–1850s), the second industrialized information and symbols (1940s–2000s), and the third — now underway — industrializes cognition.

Each transition follows a predictable arc from craft to profession to industrial system to commodity. Each transition is also mediated by three concurrent processes: (i) **specialization** (the decomposition of expert work into discrete operations); (ii) **commodification** (the rendering of those operations into fungible market inputs); and (iii) **black-boxing** (the encapsulation of internal complexity behind operational interfaces).

I argue that the AI transition is unique in that it acts not on physical or symbolic processes but on the *judgment* that previously coordinated them. I further argue that this acting-upon-judgment generates a distinctive set of investment heuristics. The essay closes by deriving those heuristics, formalizing them as a five-question diagnostic, and applying that diagnostic to the contemporary investment landscape — including the real economy of existing businesses that AI is beginning to structurally reshape.

### The Industrialization of Cognition

In 1776, Adam Smith opened *An Inquiry into the Nature and Causes of the Wealth of Nations* with the famous parable of the pin factory. Smith noted that a single worker, doing all steps alone, might produce only a handful of pins per day. However, in a small factory where the process is broken into distinct specialized tasks — drawing out the wire, straightening it, cutting it, sharpening its point — a few workers, each focused on a narrow step, could collectively produce tens of thousands of pins per day.

His point is often read as a homily about productivity or division of labor. For purposes of this paper, I take it instead as epistemological: the value of a pin had been decoupled from the knowledge of any one pin-maker. What had once been a unified craft — the expert judgment of a single artisan, applied across over a dozen distinct operations — had been redistributed across a system. No worker in the factory could make a pin alone. The factory, considered as an object, knew how to make pins. The workers, considered as individuals, did not.

This decoupling between a system's capability and any individual contributor's expertise is the recurring motif of industrial revolutions. The steam engine industrialized muscular force: it was not that power became cheaper, but that power became a separable input, sold by the kilowatt rather than embodied in the labor of the user. Later, the integrated circuit and its descendants industrialized symbol manipulation: clerical labor, calculation, transmission, retrieval, and storage became infrastructure rather than craft. Each transition produced a class of artisans whose work was first dignified, then routinized, then dissolved into the substrate. The horseshoer became a wheelwright became a mechanic, who, in turn, and in the ultimate reduction, becomes a software-defined service.

The AI transition is structurally homologous but operates at a higher rung on the cognitive ladder. What is being industrialized is neither physical force nor symbolic manipulation, but *judgment* — the capacity to weigh, contextualize, infer, draft, summarize, diagnose, advise, defend, model, and decide that has, since the bureaucratic revolutions of the late nineteenth century, defined the white-collar professions.

The operational claim of this essay is that expert judgment is now becoming a separable input, in much the same way that mechanical power and symbol manipulation became separable inputs in the prior two transitions. It will be sold by the inference, embedded in workflows, and increasingly governed by service-level agreements rather than by, say, professional ethics.

This is not a forecast. It is a description of what foundation models, agentic systems, vertical AI applications, and inference infrastructure are presently doing, in production, at the scale of trillions of tokens per day. Our attention here is forward-looking: where, in such a transition, does value accrue?

### Three Industrial Transitions: A Periodization

It is analytically clarifying to set the three transitions side-by-side. The lineage from craft to system to commodity is the same in all three; what differs is the layer of human capability being abstracted.

| Transition | Period       | What is industrialized | Characteristic input | Characteristic infrastructure | Characteristic commodity      |
| ---------- | ------------ | ---------------------- | -------------------- | ----------------------------- | ----------------------------- |
| First      | c. 1760–1850 | Physical force         | Coal, water, steam   | Mills, foundries, railways    | Pig iron, textiles, kilowatts |
| Second     | c. 1940–2010 | Symbol manipulation    | Silicon, bandwidth   | Mainframes, internet, cloud   | CPU cycles, packets, storage  |
| Third      | c. 2017–     | Cognitive judgment     | GPUs, training data  | Foundation labs, agent fabric | Tokens, inferences, decisions |

Several observations follow from this periodization. These aren't unique to me or this paper, though they do compound in novel ways once combined.

The most important of them is that each transition's commodity is the prior transition's craft. The blacksmith was a respected artisan in 1750. By 1880, his work had been absorbed into the foundry and his role had been narrowed to operating a single part of someone else's process. Likewise, the bookkeeper of 1920 was a skilled professional whose practice had been built up over years of formal training. By 1990, most of what a bookkeeper did had become a ten-line macro inside an Excel sheet maintained by a junior staffer.

We are now watching the same compression happen to the associate attorney, the radiologist working through routine reads, the financial analyst building comparable-company books, the consultant assembling industry primers, the engineer writing infrastructure boilerplate. My point is descriptive, and not meant to be pejorative. Each prior cycle was painful for the artisan caught in it but net welfare-positive once the dislocation resolved (at least on a macro scale, and within what we might call capitalist or non-leftist ideological frameworks). There is reason to expect the same arc here, and perhaps on roughly the same timeline.

A second observation is that each transition produces a control layer that did not exist before it. The factory and the joint-stock corporation are the first transition's institutional inventions. The platform and the API are the second's. The third is currently producing — under various names, none yet settled — what I will call in Part II the *cognition systems*: the infrastructure that sits between human intent and machine reasoning and governs what gets translated, when, and under what conditions. Wherever Microsoft, AWS, and Google sit in the architecture of the second transition, the equivalent position in the third will be occupied by whoever owns this layer. Identifying the layer is most of what the rest of this essay is about.

The third observation is uglier. Every prior industrial transition has come bundled with its own characteristic anxieties. These anxieties are usually initially dismissed by partisans of the new order as nostalgia. However, they often turn out, years and often decades later, to have been pointing at something real all along. Romanticism, the Luddite movement, and Marx's account of alienation were the first transition's version. The cybernetic-era worries about surveillance, depersonalization, and bureaucratic capture that I grew up with were the second's. The current version is the black box — the worry that consequential decisions are being made by systems whose internal reasoning cannot, even in principle, be inspected. The temptation among technologists is to treat this as confused or transitional. I think that is wrong, and the section below makes the case for why the opacity is not a temporary engineering deficit but a structural feature of the technology.

### Specialization: The Smithian and Durkheimian Lineages

Specialization is the precondition for industrial transitions. Smith's pin factory is the canonical example, but the deeper analysis appears in Durkheim's *The Division of Labor in Society* (1893). Durkheim observed that specialization is not merely an efficiency mechanism but a social-structural one: it transforms the kind of solidarity that holds a society together from *mechanical* (resemblance among similarly skilled persons) to *organic* (interdependence among specialists).

The implication for our purposes is that specialization is doing two things simultaneously. It is decomposing complex tasks into discrete operations susceptible to optimization (the Smithian effect), and it is producing new forms of social coordination among the resulting specialists (the Durkheimian effect). Both effects are operating in the AI transition. Foundation model labs, inference providers, agent orchestrators, and vertical applications are emerging as a system of specialists, each of which depends on the others for the larger product (general-purpose cognition delivered into a workflow).

Harry Braverman's *Labor and Monopoly Capital* (1974) extended this analysis with the concept of *deskilling*: the process by which tacit, experience-based judgment is extracted from skilled labor, codified into procedures, and re-embedded in capital equipment, thereby reducing the bargaining power and remuneration of the worker. Braverman's case study was the machinist in twentieth-century manufacturing, but the structure of his argument generalizes cleanly. The associate attorney drafting a routine motion, the radiologist reading a chest x-ray, the accountant preparing a Schedule K-1, the junior consultant building a comparable-company analysis: these are the machinist's positions in the third transition. Their tacit judgment is presently being extracted, codified into model weights and prompt scaffolds, and re-embedded in software products that are, by design, sold not to them but to their employers.

The Polanyi brothers — Karl on the disembedding of markets (*The Great Transformation*, 1944), and Michael on tacit knowledge (*Personal Knowledge*, 1958) — frame the limit case. Michael Polanyi famously observed that "we know more than we can tell"; his interest was the residual of expert judgment that resists explicit codification. The AI transition is, in part, an empirical test of how much of "what we know but cannot tell" can in fact be told once large enough models are trained on enough demonstrated behavior. Early returns suggest the residual is smaller than mid-twentieth-century philosophy of science assumed. This has direct economic consequences: domains that were thought to be insulated from automation by virtue of their tacit-knowledge intensity — medicine, law, design, scientific intuition — are precisely the domains where the most aggressive vertical applications of AI are presently emerging.

### Commodification: From Marx to the API (or, from craft to cruft)

Commodification describes the process by which a previously embedded, particular, qualitatively distinctive activity becomes a fungible, exchangeable input traded in markets. Marx's analysis of the commodity in *Capital* (Volume I, Chapter 1) emphasized that the commodity-form abstracts away from the concrete labor that produced it. Karl Polanyi's later analysis in *The Great Transformation* extended this to argue that the commodification of land, labor, and money — none of which are produced for sale in the manner of ordinary goods — was the constitutive transformation of the modern market economy.

The AI transition is producing a new fictitious commodity, comparable in significance to land, labor, and money: cognition itself. Inference, considered as a service, is now sold in the same form as electricity. It is metered (per token, per call), it is fungible across providers, it is delivered via standardized interfaces (APIs), and its underlying production process is opaque to the buyer. The economic structure of the foundation model market — falling unit prices, capacity constraints in upstream compute, differentiation along quality and latency dimensions — is recognizably the economic structure of an industrializing commodity, not of a craft.

Three downstream effects of this commodification are of direct investment relevance.

First, commodification compresses producer margins. The foundation model layer, considered in isolation, is moving toward cost-plus economics on inference. The unit economics of a model lab look more like those of a fab than those of a software company: very high fixed costs, rapidly declining marginal cost, quality-tiered pricing. This is a partial answer to the question of why foundation labs are valued as they are despite negative free cash flow at scale: they are being valued as future utilities, not as present software businesses.

Second, commodification transfers value to complements. The classic result in the economics of complementary goods is that when one input commodifies, value flows to the complementary inputs that remain scarce.[1] In the second transition, the commodification of computation transferred value to operating systems, applications, content, and brand. In the third transition, the commodification of inference will transfer value to whatever remains scarce given abundant cognition: proprietary data, distribution into regulated workflows, trust and auditability, integration into systems of record and systems of action. This is the central architectural claim of the essay, and it organizes Part II.

Third, commodification produces a particular kind of strategic vulnerability. A company whose product is a thin presentation layer over a commodifying input — a "wrapper" — captures none of the rents from the input's commoditization and is exposed to disintermediation from both directions. The history of the second transition is full of such companies. Most went to zero. The investment heuristic that follows is straightforward: a commodifying input is not a moat; it is an opportunity to build a moat adjacent to it.

### The Black Box: Epistemic Opacity as a Structural Feature

The next concept is the most philosophically delicate. Black-boxing, in Bruno Latour's formulation (*Pandora's Hope*, 1999), is the process by which a working assemblage of practices, components, and judgments becomes opaque to its users — a single object that takes inputs and produces outputs, with the internal mechanism rendered functionally invisible. Black-boxing is, in Latour's analysis, the condition of *usability* of complex systems. It is what allows a system to be deployed by users who did not build it.

The black box becomes problematic only at the boundary where its outputs are consequential and its reasoning is contestable. A diagnostic AI that recommends the wrong treatment produces a clinical injury. A legal AI that drafts a flawed motion produces a malpractice claim. A credit-scoring AI that denies a loan to a qualified applicant produces a civil rights violation. In each of these cases, the black-box property of the system is not a peripheral inconvenience; it is constitutive of the system's risk profile.

Frank Pasquale's *The Black Box Society* (2015) and Jenna Burrell's "How the machine 'thinks'" (*Big Data & Society*, 2016) offered the canonical taxonomy of opacity in algorithmic systems: opacity by design (intentional concealment for commercial reasons), opacity by technical complexity (the system's reasoning is in principle inspectable but in practice illegible), and opacity by deep architecture (the system's reasoning is, given current methods, irreducibly inaccessible). Foundation models exhibit all three forms simultaneously. They are commercially closed, computationally complex, and architecturally inscrutable. This is not a failure of contemporary AI; it is, on present technical understanding, a fundamental property of the technology.

The structural argument I want to advance is the following. The black-box property of foundation models is not a temporary engineering inconvenience that will be solved in a future release. It is a permanent feature of the cognitive industrialization, exactly as the opacity of the factory was a permanent feature of the first industrial revolution.

The pin factory was a black box to its workers — none of them could account for the production of the pin. The AWS data center is a black box to its tenants — they cannot inspect the physical reality of their compute. The foundation model is and will remain a black box to its users — they cannot inspect the chain of inference that produced its output. In each case, the black-box property is the condition of the system's economic utility, because it is what permits the system to be sold without the buyer having to acquire the seller's expertise.

This observation reframes the "interpretability problem" from a technical research agenda into a market structure. Interpretability, auditability, traceability, and verifiability are not the absence of the black box; they are *products that wrap the black box and make it deployable* in contexts where its outputs are consequential. The companies that build these products are not solving the black box; they are profiting from its permanence.

This pairs with the commodification claim. The most undersupplied complement is epistemic trust: the apparatus of inspection, audit, verification, citation, traceability, and governance that allows institutions to deploy black-box cognition in consequential settings. The companies that own this apparatus will be among the most durable winners of the cycle.

### Synthesis: The Three Positions Along the Chain

Specialization, commodification, and black-boxing are the axes along which the AI transition is reconfiguring cognitive labor. They are interdependent rather than orthogonal. Work has to be decomposed into operations before those operations can be priced as fungible inputs, and that resulting capability has to be wrapped in an interface that hides its complexity before institutional buyers will adopt it at scale. The combined motion is the same craft-to-system-to-commodity arc that has defined every prior industrial revolution. What is new is the layer the arc operates on.

For our purposes, the arc, when applied to cognition, runs as follows:

<figure class="chain" role="img" aria-label="tacit expert judgment to codified operational procedure to model-mediated workflow to system of record or system of action to commoditized output">
  <span class="chain-node">tacit expert judgment</span>
  <svg class="chain-arrow" viewBox="0 0 24 10" aria-hidden="true"><path d="M0 5 H20 M15 1 L20 5 L15 9" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <span class="chain-node">codified operational procedure</span>
  <svg class="chain-arrow" viewBox="0 0 24 10" aria-hidden="true"><path d="M0 5 H20 M15 1 L20 5 L15 9" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <span class="chain-node">model-mediated workflow</span>
  <svg class="chain-arrow" viewBox="0 0 24 10" aria-hidden="true"><path d="M0 5 H20 M15 1 L20 5 L15 9" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <span class="chain-node">system of record / system of action</span>
  <svg class="chain-arrow" viewBox="0 0 24 10" aria-hidden="true"><path d="M0 5 H20 M15 1 L20 5 L15 9" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <span class="chain-node">commoditized output</span>
</figure>

The artisan sits at the left of this chain — the partner who has read every relevant case in her practice area, the physician who has seen every presentation in his subspecialty, the engineer who has debugged every failure mode in her stack. The commodity sits at the right: the lawyer's draft motion, the differential diagnosis, the pull request — available on demand at marginal costs that approach the cost of inference. Whoever owns the work done between those two poles captures the value from everything downstream.

Three positions along the chain are unusually defensible. The first is the **system layer**: the infrastructure for capturing, organizing, executing, and evaluating codified procedures over time — the cognitive analogue of the factory floor. Firms that own this layer earn positions analogous to those operating systems earned in the second transition. The second is the **trust layer**: the apparatus of inspection that makes black-box cognition deployable in consequential, regulated settings — the most undersupplied complement in the current market. The third is the **vertical layer**: end-to-end products shaped around the specific institutional knowledge, regulatory authorization, and workflow specificity of a single domain. These three positions are not exhaustive, but they form the spine of the diagnostic developed in Part II.

### Three More Concepts (yes, really)

Before formalizing the heuristic, three concepts from my experience as a tech operator at scale warrant explicit naming.

*Cognitive externalization.* Work that previously required an expert but is now encoded into a system that does not require that expert. The investment-relevant signal is the strength and durability of the externalization. A thin chatbot externalizes nothing. A system that learns from every transaction, accumulates institutional context, and returns ever-more-targeted outputs externalizes deeply.

*Workflow ownership.* The degree to which a system has become the daily, recurring, depended-upon substrate of work in a domain. Workflow ownership is closer to the operating system than to the application: it is what users return to, what other systems plug into, and what the institution accidentally builds its institutional memory inside. This was the single most reliable predictor of durability that I observed at GitHub.

*Budget gravity.* Software for legal research attaches to the legal services budget, which is large, durable, and price-inelastic. Software for one-off image generation attaches to a discretionary creative budget that I see as a dead-end. Budget gravity is the unfashionable but reliable predictor of revenue scale, and it is the variable that most often separates the AI companies that grow into durable firms from the ones that grow rapidly and then plateau.

These three concepts — externalization, workflow ownership, and budget gravity — together with the structural analysis above, generate the five-question diagnostic to which we now turn.

Part II — From Theory to Heuristic: Five Questions
--------------------------------------------------

This is all well and good, but very academic. And I'm a business operator, not an academic.

So here in Part II, I want to take the structural argument of Part I and do something with it. The point of building a theory is to use it as a lens — one that changes what you look for, sharpens what you see, and disciplines the conclusions you're willing to draw. What I want from the framework that follows is the discipline to ask the right questions of every AI company I look at, in the right order, and to treat the answers, taken together, as the real case for or against.

The framework is five questions. They come directly from the three structural processes of Part I — specialization, commodification, black-boxing — plus the two anchoring concepts introduced above (workflow ownership and budget gravity). The first asks what expert craft is being industrialized. The second asks what the company holds that the foundation model labs cannot easily replicate. The third asks how the company makes AI-generated outputs trustworthy enough to use in settings where being wrong actually matters. The fourth asks whether the company has become the substrate of work people do every day. The fifth asks which budget pays for all of this, and whether the timing is right.

A company that answers all five clearly is worth a serious conversation. A company that deflects on any one of them — a vague answer, a future-tense answer, "we're working on that" — is not, no matter how polished the deck.

One important thing about what this is not. I've deliberately avoided turning these five questions into a scoring rubric. The argument of Part I is not symmetric. The black-box problem is more permanent and more underpriced than the budget problem. The commodification dynamic is more aggressive than the specialization dynamic. Workflow ownership compounds in a way that budget gravity does not. Treating these with the same weight would quietly undo the argument they're supposed to express. The questions are asymmetric on purpose. The order matters. The first vague answer ends the inquiry.

### Question 1 — Specialization: What expert craft is being industrialized, and how deeply?

This is the question every founder will answer confidently and most will get wrong. "We use AI to automate X" is not an answer. The real answer names a specific, decomposable unit of cognitive labor: the contract redlines a senior associate has internalized over a decade of practice, the pattern recognition it takes a radiology resident eighteen months to develop, the heuristics a seasoned underwriter applies when she's looking at a flood-zone risk assessment. Vague answers come from founders who haven't really decided which expert they're replacing. Sharp answers come from founders who have.

Behind the naming test is the depth test. Once the craft is named, how much of it lives inside the system, accumulating with use? A system that re-derives its knowledge on every call has externalized nothing — it is a presentation layer on the model, and the model owns the value. A system that has absorbed ten thousand transactions of institutional context and gets better from each one has externalized a great deal, and that externalization compounds. The companies worth taking seriously are the ones whose externalization is compounding at a rate no competitor can easily match.

The trap is the answer that sounds sharp but doesn't survive a follow-up. A founder who says "we're AI for medical coding" has named a craft. The real question is: which specific coding decisions, in which clinical specialty, with what payer mix, against what version of the coding standard? The gap between a crisp first answer and an equally crisp second answer is exactly the gap between a company that has decomposed the work and one that is still gesturing at it.

### Question 2 — Commodification: What does this company hold that the model labs cannot easily take?

This is the question at the center of the whole argument. Foundation models are commodifying — inference is becoming a utility, priced per token, available from multiple providers, delivered through standard interfaces. When that happens, value flows to whatever remains scarce. The investment question is not whether the company has a moat. It is which specific thing they hold, today, that OpenAI or Anthropic or Google cannot simply build into their next product release.

The list of things that actually qualify is shorter than most founders assume. Proprietary data earned through real operational integration — not scraped from the open web, but accumulated through years of working inside a specific institutional workflow with permissioned access. Distribution into a regulated or fiduciary context that a hyperscaler simply cannot replicate in a product sprint, because the regulation, the procurement cycle, or the institutional relationship is genuinely hard to fake. Systems of record that the company has been embedded in long enough that the customer's own institutional memory lives inside the product.

What does not qualify: "we will build proprietary data through usage." That is an intention, not a complement. "We have the largest permissioned dataset of redlined contracts from AmLaw 100 firms, accumulated over thirty months of production deployment" — that is a complement. The vague version leaves you exposed from both directions: the model lab moves down-stack, the copycat moves up-stack, and you get compressed from both sides simultaneously.

### Question 3 — Black-Boxing: How does this company make AI outputs trustworthy enough to use in settings where being wrong matters?

The opacity of foundation models is widely misunderstood. It is not a temporary engineering problem. It is a permanent structural feature — a condition of the technology's utility, not a defect in it. The foundation model is a black box to its users for the same reason the AWS data center is a black box to its tenants: the opacity is what makes it deployable. You don't need to understand it to use it. You just need it to work.

The problem is that "just works" is not good enough in settings where being wrong produces a clinical injury, a malpractice claim, a civil rights violation, or a material misstatement in a regulatory filing. In those settings — healthcare, legal, financial services, any regulated workflow — institutions cannot deploy AI without some separate apparatus that makes the outputs inspectable, contestable, and auditable.

This means the trust apparatus is not a feature — it is a category of product. And the companies that build it are not solving the black box. They are profiting from its permanence. **The most undervalued category in the current market, in my view, is the company whose investors think of it as a developer tools company when it should be priced like trust infrastructure in a regulated industry.** Those are very different multiples.

### Question 4 — Workflow: Has this company become the substrate of work people do every day?

The difference between a system consulted occasionally and one that is the substrate of daily professional work is not a product distinction. It is a structural one. The occasional-use system is a tab. The daily-use substrate compounds.

Compounding is what produces the operating-system position of a technology cycle. Microsoft didn't win the second transition because Word was the best word processor (it often wasn't). It won because Office became the environment inside which work happened — the thing every other system assumed, every user returned to, and where institutional memory quietly accumulated without anyone making a deliberate decision to put it there. The same dynamic is running now, at the layer above code, across every professional craft simultaneously.

The test I use has three parts. Does the user come back the next morning without being prompted? Do other systems plug into this company's product because that's where the workflow lives now? Has institutional memory started to accumulate inside the product without anyone explicitly architecting it? At GitHub, this was the single most reliable predictor of which developer tools survived the next platform shift. The survivors weren't necessarily the technically superior ones. They were the ones that had become infrastructure — the thing everything else assumed.

### Question 5 — Budget and Phase: Which budget pays for this, and is the timing right?

Two questions collapsed into one because they answer together. Every founder bristles at the budget question — it feels too operational, too boring. But the budget category sets the size of the prize, and anchoring to a real, durable, price-inelastic budget is the difference between a company that grows into a durable business and one that grows fast and then plateaus. Budget gravity is unglamorous. It is also among the most reliable predictors I know of which companies are actually building something.

The phase question puts budget gravity on a timeline. The cycle has three rough phases. Phase 1, through roughly 2026, is the land grab: the reward goes to companies that have captured a specific unit of cognitive labor and built workflow substrate deep enough that users don't leave. Phase 2, from 2027 through roughly 2029, is the defense: the foundation labs and hyperscalers arrive with vertical interfaces, and companies without specific structural complements get absorbed into the platform layer. Phase 3, from 2030 onward, is when the regulated and fiduciary spend concentrates: the reward goes to companies that own the trust apparatus in a high-consequence domain. Most of what the current market prices as a Phase 3 business is actually in Phase 1 or early Phase 2. That gap is where most of the mispricing in the current AI investment landscape lives.

### The Decision Rule

A company that answers all five questions well is worth a conversation at any stage. A company that answers four well and has one conditional — a specific, credible path to closing the gap — is also worth it. A deflection on any of the five is not. The discipline is to keep asking until each question has a sharp answer, or until the absence of a sharp answer becomes the answer.

### The Category Question

The five questions score a company's position within its category. They don't score the category. The categories with the best structural fit: vertical AI in regulated industries (legal, healthcare, financial services); autonomous agents in mission-critical operations (SRE, security, revenue operations); scientific discovery platforms with proprietary experimental data. The categories with the worst structural fit: horizontal productivity and AI assistant layers, where the platform overhang from Microsoft and Google makes defensibility structurally difficult; thin inference wrappers in discretionary budget categories; image, video, and audio generation tools without a defended workflow position.

Part III — The Framework in Practice: Sequoia and Thrive
--------------------------------------------------------

The purpose of Part III is not to showcase the cases where the framework produces flattering results. It is to test whether the theory survives contact with reality — specifically, with the reality of where two of the most sophisticated AI investors in the world are currently putting their money. Sequoia and Thrive have access to every deal in the market, relationships with every major founder, and research teams that have been studying this landscape for years. If the framework doesn't hold up against their portfolios, that's a problem with the framework.

What follows is a representative sample from each firm: two companies with more established positions that have already produced meaningful signals about defensibility, and two earlier bets where the questions the framework raises are not yet fully answered by the market. Each company gets a brief description — what it does, how it makes money — before the diagnostic runs.

### A. Sequoia Capital

Sequoia is the firm that defined venture capital in the second transition — present at the founding of Apple, Google, Oracle, Cisco, Yahoo, LinkedIn, Airbnb, Stripe, and dozens of others. In the AI era, Sequoia has been unusually public about its investment thesis, producing the AI Ascent conference series and research reports that lay out the firm's thinking in more detail than most firms manage. It invests at every layer of the stack: foundation models (OpenAI, Anthropic, Mistral), developer tools (Cursor, Replit), vertical AI (Harvey, Sierra, Glean), and increasingly at the early-stage autonomous agent layer. The analyses below sample from the established and emerging layers of that portfolio.

***Harvey (Series D, ~$3B valuation) — Legal AI***

Harvey is an AI platform built for law firms and corporate legal departments. Attorneys use it to research case law, draft contracts, conduct due diligence, analyze regulatory filings, and prepare litigation documents. Revenue comes from enterprise SaaS contracts, typically structured as annual licenses priced per seat or per matter volume.

Q1: Harvey has decomposed the work of a senior associate at a major law firm with unusual precision — not "legal work" generically, but the specific operations of contract review, due diligence analysis, regulatory research, and case law synthesis that define the associate billing hour. The deeper point: Harvey is not just performing these tasks on demand — it is accumulating institutional context across every matter, such that the tenth engagement with a specific client's contract style is handled with more precision than the first. That compounding of externalized expertise is the core of the investment thesis.

Q2: Two complements that reinforce each other. Permissioned matter data accumulated across hundreds of law firm deployments, and the institutional relationships themselves: workflow integrations, IT security clearances, trust relationships with general counsel and managing partners that took years to build. OpenAI could build a legal AI product tomorrow. It cannot acquire Harvey's institutional context without Harvey's history.

Q3: Harvey built citation, source traceability, conflict-checking, and human review workflows as first-class architectural features, not afterthoughts. This was a precondition for any serious law firm deployment — no law firm can deploy AI on consequential work without being able to trace and audit the output. The trust apparatus is the product architecture, not a feature added on top.

Q4 and Q5: At the firms where it is most deeply deployed, attorneys return without prompting, document management systems route specific work types through Harvey automatically, and institutional matter memory is accumulating inside the system. Global legal services is a $350B+ annual market. Budget gravity is high; the cost of legal mistakes dwarfs the cost of legal software. Harvey is in the Phase 1/Phase 2 transition — workflow substrate established at the top of the market, now building institutional integration depth for Phase 2 defensibility.

**Verdict.** The cleanest five-question pass in this analysis. The cognitive externalization is deep and compounding, the complement is real, the trust apparatus is first-class, and the budget is among the most durable available.

***Sierra (Series C, ~$4.5B valuation) — Customer Experience AI***

Sierra is an AI platform for customer experience. Companies deploy it to handle the full range of customer contacts — account management, order status, claims, returns, support, scheduling — across voice, chat, and messaging. Sierra does not produce suggested responses for a human agent to execute. It resolves the interaction itself. Founded by Bret Taylor and Clay Bavor. Revenue model: outcomes-based pricing — customers pay per resolved interaction, not per seat.

Q1: The cognitive work of a skilled customer service resolution specialist: the judgment that distinguishes a policy-compliant resolution from an exception worth making, the de-escalation instinct that retains a frustrated customer.

Q2: The outcomes-based pricing model generates proprietary production performance data — what interaction sequences produce resolution, what exception patterns require escalation — that compounds with every deployment and cannot be replicated by a lab that has never been in production.

Q3: The developing factor. Consequential decisions in regulated settings — healthcare claim denials, financial account restrictions — require inspection infrastructure that Sierra is building but has not yet fully institutionalized.

Q4: Sierra is not augmenting human agents — it is replacing the interaction. Contact center workflows that run on Sierra are daily and mission-critical.

Q5: Contact center budgets are large, tied directly to FTE cost reduction measurable quarterly.

**Verdict.** The most architecturally sophisticated CX AI position in the current market. The outcomes-based commercial structure is the right architecture for a system-of-action product. The Q3 conditional is the one to watch.

***Xbow (Seed/Series A) — Autonomous Security Testing***

Xbow builds autonomous penetration testing — AI that functions as a continuous red team for enterprise applications and infrastructure, simulating adversarial attack sequences and finding vulnerabilities creatively rather than by pattern-matching against known CVE databases. Sequoia identified Xbow as among the most compelling early-stage positions in the 2026 AI Ascent cohort.

Q1: The judgment of a senior red team engineer — creative attack-chaining and novel surface discovery. Senior red team engineers command north of $300K and there aren't enough of them at any price.

Q2: Each enterprise environment Xbow tests accumulates data about that specific application's attack surface and novel vulnerabilities. This data cannot be purchased; it is generated through operational access and cannot be replicated without the same production history.

Q3: The trust apparatus is the output: a verified vulnerability with a working exploit chain, not a recommendation. Trust is intrinsic to the product rather than separately procured.

Q4 and Q5: Continuous security testing running on every code deployment is the workflow ownership target. Enterprise security budgets are non-discretionary and growing as AI-generated code introduces new attack surface.

**Verdict.** The Q1 and Q2 answers are the sharpest early-stage complement claims in this analysis. The validation challenge is real — the customers who would pay most are also the most technically sophisticated and most skeptical.

***Traversal (Seed) — AI Site Reliability Engineering***

Traversal builds AI agents that function as on-call SREs: reading logs, tracing errors, correlating signals across infrastructure components, diagnosing root cause, and in some cases remediating autonomously.

Q1: The judgment of an experienced SRE during an incident — pattern recognition that identifies root cause faster than a junior engineer, institutional knowledge of how this specific infrastructure has failed before.

Q2 (strongest answer in the Traversal diagnostic): The proprietary runbook and incident history accumulated inside each enterprise deployment — organizational memory that cannot be purchased and that compounds with every incident handled.

Q3: Graduated autonomy — the agent recommends before it acts and builds a track record before earning expanded authority.

Q4 and Q5: If Traversal becomes the first responder to every infrastructure alert, the substrate is deep. The on-call rotation is one of the most disliked recurring workflows in engineering organizations, which creates genuine pull.

**Verdict.** The Q2 answer — incident history moat — is among the most compelling early-stage complement claims in this analysis. The Q3 conditional is the one to watch.

### B. Thrive Capital

Thrive Capital was founded by Josh Kushner in 2009 and has become one of the defining AI-era investment firms through a strategy of concentrated, long-duration conviction positions. The portfolio is built by getting large and early into a small number of companies that Thrive believes will own the cognitive layer of the next economy, and holding them through the full duration of the transition. The defining positions — OpenAI, Databricks, Stripe, Cursor, Isomorphic Labs — reflect a consistent bet: own the companies most likely to become the infrastructure and the trust apparatus of the AI economy, not just the companies with the best near-term product.

***Databricks (Pre-IPO, ~$43B last private valuation) — Data and AI Platform***

Databricks is the enterprise data platform built on the Lakehouse architecture — a unified system for storing, processing, governing, and analyzing data at scale. The core platform includes Delta Lake, Delta Live Tables, MLflow (now an industry standard for ML experiment tracking), and Unity Catalog (the de facto standard for data governance and lineage in large enterprises). Revenue is consumption-based: customers pay for compute used on the platform.

Q1: Databricks has industrialized data engineering — the expert judgment required to design, build, and optimize the data infrastructure that modern enterprises depend on. The Lakehouse architecture makes accessible to mid-tier engineering teams what previously required Google-caliber talent.

Q2: The enterprise data estate itself: Unity Catalog has become the governance layer for a meaningful fraction of Fortune 500 data estates. Changing the data platform is a multi-year migration project, because the organizational knowledge, pipeline configurations, and model training histories that have accumulated inside the environment cannot be easily moved.

Q3: Unity Catalog provides lineage, access control, audit logging, and compliance documentation for every data asset — the trust apparatus built into the data layer, which is the architecturally correct place to build it.

Q4: The data platform is daily, mission-critical, and the substrate of everything the enterprise's data and AI teams do.

Q5: IT infrastructure is the most durable enterprise budget category. Databricks is firmly in Phase 3.

**Verdict.** The highest-confidence five-question pass in this analysis. The risk is cyclical, not competitive: an enterprise technology downturn would hit the consumption model faster than a subscription model would absorb it.

***Stripe (~$107B last private market valuation) — Financial Infrastructure***

Stripe is the financial infrastructure platform for internet commerce — payment processing, fraud detection, revenue recognition, billing, invoicing, tax, and business banking. It processes hundreds of billions of dollars annually across 50+ countries. Stripe belongs in this analysis because its structural position becomes more valuable as AI agents proliferate and machine-initiated financial transactions grow as a share of total economic activity.

Q1: Stripe's externalization is infrastructure-level: the expertise required to navigate payment rails, fraud patterns, regulatory compliance, and banking partner relationships across global markets. It is unusual in this analysis because the externalization is institutional rather than cognitive, which makes it more durable than most of what surrounds it.

Q2: Stripe holds the payment rails, the compliance infrastructure, and the regulatory authorizations in every major market it operates in. No AI company, no hyperscaler, and no well-funded startup is plausibly going to replicate this position on a ten-year horizon.

Q3: Stripe is the trust apparatus for financial transactions on the internet — not procuring trust separately, but being the trust layer itself.

Q4 and Q5: Every transaction-dependent business runs on Stripe. Changing payment processors is one of the highest-friction infrastructure migrations a company can undertake. Financial operations budgets are 5 on budget gravity.

**Verdict.** The cleanest single five-question profile in this analysis. Stripe is the financial infrastructure bet on the AI economy, and it gets more valuable as the economy becomes more AI-driven.

***Anysphere / Cursor (~$29B valuation, ~$500M ARR) — AI Coding Environment***

Cursor is an AI-native code editor — a fork of VS Code rebuilt around AI-first interaction. What distinguishes Cursor from GitHub Copilot is not the underlying model (competitors access the same frontier models) but the depth of codebase context it builds. Cursor crossed $500M ARR faster than almost any software company in history. Revenue: freemium SaaS at $20/month individual, $40/month per seat business.

Q1: The developer in the coding loop: the judgment that knows when to autocomplete versus when to refactor, when a generated suggestion is architecturally sound versus merely syntactically valid.

Q2: IDE-native codebase context — the accumulated understanding of a specific codebase's architecture, naming conventions, and organizational idioms that develops through months of developer interaction. This grows with time and cannot be replicated without the same usage history.

Q3 (the gap): Independent analysis found approximately 1.7x more issues in AI-coauthored pull requests. Code quality verification and security analysis as first-class product features are what Cursor needs to build to convert Phase 1 workflow capture into Phase 2 defensibility.

Q4 (strongest in the analysis): Cursor is where developers spend their day. IDE-level workflow ownership is the most powerful expression of Q4 in the current developer tools market.

Q5: Phase 1 well advanced. Phase 2 question: does product advantage persist long enough to build switching costs that survive GitHub Copilot closing the quality gap through Microsoft's enterprise distribution?

**Verdict.** Exceptional Phase 1 execution. The Q3 answer and Q2 depth will determine whether the workflow substrate converts into durable defensibility.

***Physical Intelligence / π (Series B, ~$5.6B valuation) — Robotics AI Foundation***

Physical Intelligence is building a general-purpose foundation model for physical systems — robots that can be directed by natural language across different hardware embodiments. The technical thesis: a single model trained on diverse physical interaction data can learn to operate across fundamentally different robot types, generalizing across hardware the way a language model generalizes across domains. Investors include Sequoia, Thrive, Khosla, and OpenAI.

Q1: The sensorimotor judgment of a skilled manufacturing or logistics operator. The cross-embodiment thesis is simultaneously the most ambitious Q1 claim in this analysis: the Braverman deskilling argument applied to physical labor.

Q2: Physical interaction data accumulated across diverse robot types and environments. This data cannot be synthesized, purchased, or shortcut. The cross-embodiment thesis is simultaneously a data-compounding thesis — the more hardware diversity the model trains on, the harder the dataset becomes to replicate.

Q3: Physical systems face the highest trust requirements in this analysis. Physical Intelligence's trust apparatus is being built through demonstrated physical performance — the strongest possible form of Q3, because it cannot be faked.

Q4 and Q5: Manufacturing and logistics operations are daily, mission-critical, and represent the largest unautomated operational budget in the global economy. The commercial product doesn't yet exist at deployable scale.

**Verdict.** The most extreme split of any company in this analysis: if the cross-embodiment thesis holds, this is among the strongest five-question profiles I've seen. If it doesn't, this is a very expensive research program. The framework cannot resolve the binary. It can only name it precisely.

Part IV — The Real Economy: On AI, the American Worker, and What Comes Next
---------------------------------------------------------------------------

I want to be clear about something before I get into the analysis. I am as bullish on AI as anyone you are likely to speak with. I have been building AI-native products for two years, I have written this framework, and I believe the third industrial transition is as consequential as the first two. But I have grown increasingly unsatisfied with the way most of the technology conversation handles what the transition actually means for the people inside it — the accountants, the paralegals, the claims adjusters, the IT technicians, the radiologists reading routine scans. I think this memo, up to this point, has been somewhat glib about this. The prior industrial transitions were, as I noted in Part I, net welfare-positive in the long run. They were also genuinely brutal in the near term. The Luddite movement was not the tantrum of people who couldn't read the future. It was the predictable response of skilled workers watching the value of a lifetime of accumulated expertise get systematically destroyed in front of them. We should be honest about the fact that the third transition will produce the same dynamic — and that intellectual honesty about that fact should change how we think about what to build.

The dominant venture conversation about AI has been almost entirely about new companies built from scratch on AI-native architectures. This makes sense given the institutional logic of venture capital: the asset class is structured around new company formation and early-stage risk. But it has produced a blind spot. The largest cognitive workflows in the economy are not being built by startups. They are already running, today, inside thousands of existing businesses — accounting firms, IT managed services providers, healthcare revenue cycle operators, insurance adjusters, engineering consultancies — employing millions of people whose judgment AI can now industrialize. A conversation about AI that focuses exclusively on new entrants and ignores the existing institutions where the work is being done is missing most of the picture.

I am interested in a different model. Not the do-nothing-ism of hoping AI adoption stays slow enough to protect existing jobs, and not the uncritical accelerationism of letting the market sort it out and accepting whatever dislocation results. What I want is something in between: a deliberate, structured approach to bringing AI into existing service businesses in a way that expands margins, improves service quality, and distributes the resulting gains to the people who have been doing the work — not just to the capital that owns the platforms.

The model I find most compelling — and the one I believe the framework developed in this essay most directly predicts — is the AI-ification of existing service businesses from the inside, by operators who understand both the technology and the industry, using AI to automate the repetitive cognitive work that professionals dislike most, freeing them to do the advisory, relational, and judgment-intensive work that they actually want to do and that their clients actually value. This is not a utopian vision. It is what the data from the early deployments shows is actually happening when AI-ification is done well.

### The Core Thesis

A traditional roll-up creates value by combining financial statements. A Thrive Holdings-style platform creates value by combining data and compounding it into technology that no single firm could build and no competitor can easily replicate. The platform is the substrate. The individual firms are the nodes that feed it and draw from it. The moat is not the size of the platform. It is the proprietary operational data the platform generates by being the substrate of actual work, at scale, over time.

### Why the Five-Question Framework Applies Directly

The same diagnostic I applied to Harvey and Databricks in Part III applies directly to existing service businesses — with one shift in framing. For a startup, the five questions ask: what are you building? For an existing business, they ask: what cognitive workflows are you already performing, and which of them can AI industrialize?

This reframing surfaces the structural advantage that existing businesses have over AI-native entrants. An accounting firm that has been serving the same clients for twenty years holds something that no startup can quickly acquire: decades of proprietary client financial data, regulatory interpretation history, audit trail formats, and industry-specific transaction patterns. That data is the Q2 complement that matters. A startup building accounting AI from scratch does not have it. The existing firm's operational history is the scarce complement, and it is irreplaceable without the same client relationships and the same accumulation of historical work.

Similarly, the trust apparatus (Q3) of a well-run service firm is built over years of regulatory compliance, professional liability coverage, and institutional standing. These are not features that can be shipped in a product release. A licensed CPA firm has earned a relationship with the IRS, state boards of accountancy, and its clients' auditors that represents years of demonstrated reliability. An AI startup cannot acquire that trust through a product launch. It has to be earned. Which means the existing firms that choose to transform have a structural head start over the new entrants that are trying to replace them.

The workflow substrate question (Q4) resolves cleanly for most well-established service businesses. An accounting firm is already the substrate of its clients' financial operations. An IT managed services provider is already embedded in its clients' daily infrastructure. A healthcare revenue cycle management company is already the substrate of a hospital system's billing operations. The workflow ownership exists. What is missing is the AI layer that makes it more efficient, more accurate, and more defensible.

### How I Would Identify Verticals

The five questions, applied as a screening framework for AI-ifiable service industries, generate a consistent profile. I would look for:

- High fragmentation — thousands of small, founder-led businesses with no dominant platform, creating acquisition opportunity before the market gets competitive.
- Recurring, relationship-based revenue — clients that don't switch providers easily, creating stable cash flows and time to execute the transformation.
- Labor-intensive cognitive workflows — expensive human professionals doing repetitive, well-documented cognitive work. This is the AI target. The more specific and articulable the workflows, the better.
- No dominant technology platform already embedded — if Salesforce, Epic, or a category-specific SaaS already owns the workflow, the AI transformation is more complicated. You want industries where the technology infrastructure is weak and fragmented.
- Regulatory or fiduciary structure that creates trust apparatus requirements — this sounds like a constraint, but it is actually a moat. Regulated industries require trust apparatus that takes years to build; that creates defensibility for incumbents who build it and a barrier to entry for new entrants who don't have it.
- Budget gravity — the clients of these businesses have large, non-discretionary budgets attached to the service. Legal spend, IT spend, accounting spend, healthcare administration spend — these don't get cut in a downturn.

Applying this screen, the candidates I find most compelling at this stage of the cycle:

- healthcare revenue cycle management, which scores strongly on every criterion;
- legal operations and law firm support services, which require careful navigation of unauthorized practice of law restrictions but have strong underlying economics;
- insurance claims administration, which is highly fragmented, highly cognitive, and highly automatable; and engineering and field services, which have received less attention than healthcare and legal but fit the profile well.

### What the Industrialization of Cognition Means Here

The theoretical framework from Part I is not just background context for the company analyses in Part III. It is the direct explanation for why this model works — and why it is different from a conventional private equity roll-up.

In the first industrial transition, the factory didn't just combine financial statements. It built a system in which the tacit knowledge of individual craftspeople was encoded into a productive process that could operate at a scale no individual craftsperson could achieve alone. The factory, considered as an object, knew how to make things that no individual worker within it knew how to make. That encoding of distributed expertise into a shared system is what produced the productivity gains of the first transition.

The Thrive Holdings model is doing the same thing, at the level of cognitive labor, in the third transition. When 40 accounting firms all run their tax preparation workflows through a shared AI system trained on the combined data of all 40 firms' historical client engagements, the resulting system knows how to do accounting work that no individual firm within the platform could do alone. The platform, considered as an object, has industrialized the cognition of the professional services industry. That is not a roll-up. That is the industrialization of collective cognition. The distinction matters because it explains where the value comes from — not from financial engineering, but from the same compounding of distributed expertise that Smith described in the pin factory.

This is the model I want to be part of building. Not because it is the most technically exciting work in AI — it isn't. But it is the most honest answer I have found to the question of how you make the AI transition work for the people inside the economy, not just for the people who own the platforms. The accountant who joined their firm because they like working with clients on complex financial problems does not want to become a prompt engineer. They want to spend less time on tax preparation and more time on the advisory work that their clients actually value. AI-ification, done this way, is not a threat to that outcome. It is the mechanism for achieving it.

I am aware that this is a more optimistic framing than the evidence strictly warrants at this stage of the cycle. The early deployments are promising. The structural logic is sound. Whether the model scales, whether the cultural challenges of founder retention are manageable at 100 acquisitions rather than 20, whether the data compounding actually produces the defensible moat the thesis predicts — these are empirical questions that don't yet have definitive answers. But I am confident in the alternative — letting the AI transition happen to existing service businesses rather than with them — will produce worse outcomes for everyone in the system.

Part V — Conclusions
--------------------

The argument of this essay is, at its core, a simple one, dressed up in a lot of theory. I lay it out here more simply.

Cognitive labor is being industrialized the way physical labor and clerical labor were industrialized before it. The industrialization follows a predictable arc: specialization, commodification, black-boxing. Value concentrates in specific positions along the chain — the ones that own the cognitive equivalent of the factory floor, the trust apparatus, and the vertical workflow. The five questions are the instrument for identifying which companies actually hold those positions and which are dressed up nicely.

The framework holds up against the Sequoia and Thrive portfolios because those portfolios were built by people who understand this transition even if they wouldn't necessarily describe it in these terms. Harvey passes all five questions because the team built a company that owns the document workflow of elite law firms, has accumulated matter-specific context that compounds, and has built the trust apparatus that regulated legal work requires. Databricks passes all five because it has spent a decade becoming the system of record for enterprise data. Cursor passes four and a half because it owns the developer's daily workflow but has not yet built the trust apparatus that Phase 2 defensibility requires. Physical Intelligence is a binary: the cross-embodiment thesis either holds or it doesn't.

The more interesting conclusion is about the real economy. The venture conversation has been so focused on new companies that it has largely missed the fact that the largest cognitive workflows in the economy are not being built by startups — they are already running inside existing businesses. Accounting firms, IT managed services providers, healthcare revenue cycle operators: these businesses perform expensive, repetitive, judgment-intensive cognitive work at scale, have accumulated proprietary data through years of operation, hold regulatory and fiduciary trust that takes years to build, and have established workflow substrate relationships with their clients. The framework predicts that AI-ification of these businesses — done by operators who understand both the technology and the industry — will produce the most durable value capture of the cycle.

Budget gravity is the variable the current market most consistently underweights. Every AI company looks exciting in a demo. The ones that look interesting in ten years are the ones attached to budgets that will still exist in ten years. Legal budgets, healthcare budgets, financial operations budgets, data infrastructure budgets: unglamorous, durable, price-inelastic. The AI companies attached to them are not the most exciting to talk about. They are the ones I would want to own.

Smith's pin factory was not interesting because of the pins. It was interesting because it revealed something about the nature of knowledge — that value could be decoupled from expertise, that a system could know how to do something that no individual within it knew how to do. The AI transition is the same revelation at the level of cognitive judgment rather than physical craft. The investment opportunity in that revelation is not in the revelation itself. It is in the environments, the trust apparatus, and the workflow substrates that determine what the revelation can be deployed to do.

Most of those environments already exist. Most of the businesses that need them already exist. The operators who understand this, and who are willing to do the work of building the trust apparatus and owning the workflow substrate in specific domains, will build the most durable positions of the cycle. Not because they are the most technically ambitious, but because they understand that in a transition economy, the budget is not just the target. It is the foundation.

---

1. See Arrow (1962) and Shapiro & Varian (1998).
