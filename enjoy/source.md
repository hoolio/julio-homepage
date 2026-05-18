*Draft · May 18, 2026*

# A Marxist Guide to Getting Rich in AI: A Theoretical Reconstruction of the AI Transition and Operating Framework for Evaluating Future Value in the Space

### Introduction

Last month, I was lucky to have attended Sequoia Capital's AI Ascent conference. Talks and presentations were given by many of the most interesting founders and operators working in AI today.

As a non-engineer in the tech industry, I've looked for opportunities to leverage my operational, structural, and "non-technical" interests and skills to bring new perspectives to bear on old and new challenges. As I reflected on my conversations at AI Ascent, I was struck by how many of them seemed to hinge on topics and subject matter that did not immediately read as technical.

Many of these talks thematically paralleled discussions that I've been having at work. For instance, at a recent Observable All Hands, an engineer discussed his work writing evals and skills for AI use. He kept using phrases like "stochastic" or "non-deterministic" to describe the new challenges posed by a machine whose outputs could not necessarily be predicted by its inputs. He described edits he had made to his prompts, how the system seemed to prefer the use of this or that word over some traditional engineering nomenclature, or how even the emotional tone of a prompt would impact its success.

What I heard being described sounded less like engineering and more like the work of a product marketer or political strategist, struggling to find language that would best engage, convince, and activate his audience. My suggestion was that he spend less time that week with this "technical" team and pay a visit to the Demand Gen or PMM folks. After all, theirs was a discipline that for decades had wrestled with the vagaries of human language locked in struggle with algorithms and search engine optimization.

The following essay was inspired by these recent thoughts and discussions. I am among those who believe that the line between humanities and hard sciences is blurring at an accelerating rate, and that the interplay between the two will be more important in the coming era than ever before. Not only important; I think that knowledge in philosophy, poetry, psychology, music and many of the so-called "arts and letters" will be a necessary component to not only understanding, but building and thriving in the AI age.

Moreover, as a company CEO and operator who has led and grown businesses and product-led organizations from seed stage to hypergrowth to multinational, multi-billion-dollar scale, I am on the search for practical frameworks and heuristics that help me and my peers to make better decisions, not simply theoretically interesting but ultimately untestable hypotheses.

The essay is structured in four parts. Part I develops a theoretical account of the AI transition as a third industrial revolution — one that operates on cognition rather than energy or information — situated in the longer history of specialization, commodification, and epistemic opacity. Part II derives from that account a portable diagnostic: five questions, asymmetrically weighted, that together constitute the investment case for any AI company. Part III applies the diagnostic as a field test: a representative sample of companies from Sequoia and Thrive portfolios, chosen not to flatter the framework but to see whether the theory survives contact with what serious investors are actually funding. I close with a section on the real economy — the AI-ification of existing businesses — which I think is where the largest absolute value of the cycle will ultimately be created, and which the current venture conversation has barely begun to address.

Part I — Theoretical Foundations
--------------------------------

### Abstract

The dominant framing of contemporary AI treats it as a labor-saving technology that automates white-collar work. This is analytically thin and unsatisfying. It mistakes a surface effect (task displacement) for a structural transformation: the industrialization of cognitive labor itself. I argue that the present moment is most accurately understood as the third in a sequence of modern industrial transitions. The first industrialized physical energy and matter (1760s–1850s), the second industrialized information and symbols (1940s–2000s), and the third — now underway — industrializes cognition.

Each transition follows a predictable arc from craft to profession to industrial system to commodity. Each transition is also mediated by three concurrent processes: (i) **specialization** (the decomposition of expert work into discrete operations); (ii) **commodification** (the rendering of those operations into fungible market inputs); and (iii) **black-boxing** (the encapsulation of internal complexity behind operational interfaces).

I argue that the AI transition is unique in that it acts not on physical or symbolic processes but on the *judgment* that previously coordinated them. I further argue that this acting-upon-judgment generates a distinctive set of investment heuristics. The essay closes by deriving those heuristics, formalizing them as a five-question diagnostic, and then applying that diagnostic to the contemporary investment landscape — including the real economy of existing businesses that AI is beginning to structurally reshape.

### The Industrialization of Cognition

In 1776, Adam Smith opened *An Inquiry into the Nature and Causes of the Wealth of Nations* with the famous parable of the pin factory. In short, Smith noted that a single worker, doing all steps alone, might produce only a handful of pins per day. However, in a small factory where the process is broken into distinct specialized tasks (drawing out the wire, straightening it, cutting it, sharpening its point, etc.), a few workers, each focused on a narrow step, could collectively produce tens of thousands of pins per day.

His point is often read as a homily about productivity or division of labor. For purposes of this paper, I take it instead as epistemological: the value of a pin had been decoupled from the knowledge of any one pin-maker. What had once been a unified craft — the expert judgment of a single artisan, applied across over a dozen distinct operations that were required to make a pin — had been redistributed across a system. No worker in the factory could make a pin alone. The factory, considered as an object, knew how to make pins. The workers, considered as individuals, did not.

This decoupling between a system's capability and any individual contributor's expertise is the recurring motif of industrial revolutions. The steam engine industrialized muscular force: it was not that power became cheaper, but that power became a separable input, sold by the kilowatt rather than embodied in the labor of the user. Later, the integrated circuit and its descendants industrialized symbol manipulation: clerical labor, calculation, transmission, retrieval, and storage became infrastructure rather than craft. Each transition produced a class of artisans whose work was first dignified, then routinized, then dissolved into the substrate. The horseshoer became a wheelwright became a mechanic, who, in turn, and in the ultimate reduction, becomes a software-defined service.

The AI transition is structurally homologous but operates at a higher rung on the cognitive ladder. What is being industrialized is neither physical force nor symbolic manipulation, but **judgment** — the capacity to weigh, contextualize, infer, draft, summarize, diagnose, advise, defend, model, and decide that has, since the bureaucratic revolutions of the late nineteenth century, defined the white-collar professions.

The operational claim of this essay is that *expert judgment is now becoming a separable input*, in much the same way that mechanical power and symbol manipulation became separable inputs in the prior two transitions. It will be sold by the inference, embedded in workflows, and increasingly governed by service-level agreements rather than by, say, professional ethics.

This is not a forecast. It is a description of what foundation models, agentic systems, vertical AI applications, and inference infrastructure are presently doing, in production, at the scale of trillions of tokens per day. Our attention here is forward-looking: where, in such a transition, does value accrue?

### Three Industrial Transitions: A Periodization

It is analytically clarifying to set the three transitions side-by-side. The lineage from craft to system to commodity is the same in all three; what differs is the layer of human capability being abstracted.

| Transition | Period | What is industrialized | Characteristic input | Characteristic infrastructure | Characteristic commodity |
| --- | --- | --- | --- | --- | --- |
| **First** | c. 1760–1850 | Physical force | Coal, water, steam | Mills, foundries, railways | Pig iron, textiles, kilowatts |
| **Second** | c. 1940–2010 | Symbol manipulation | Silicon, bandwidth | Mainframes, internet, cloud | CPU cycles, packets, storage |
| **Third** | c. 2017– | Cognitive judgment | GPUs, training data | Foundation labs, agent fabric | Tokens, inferences, decisions |

Several observations follow from this periodization. These aren't unique to me or this paper, though they do compound in novel ways once combined.

The most important of them is that **each transition's commodity is the prior transition's craft.** The blacksmith was a respected artisan in 1750. By 1880, his work had been absorbed into the foundry and his role had been narrowed to operating a single part of someone else's process. Likewise, the bookkeeper of 1920 was a skilled professional whose practice had been built up over years of formal training. By 1990, most of what a bookkeeper did had become a ten-line macro inside an Excel sheet maintained by a junior staffer.

We are now watching the same compression happen to the associate attorney, the radiologist working through routine reads, the financial analyst building comparable-company books, the consultant assembling industry primers, the engineer writing infrastructure boilerplate. My point is descriptive, and not meant to be pejorative. Each prior cycle was painful for the artisan caught in it but net welfare-positive once the dislocation resolved (at least on a macro scale, and within what we might call capitalist or non-leftist ideological frameworks). There is reason to expect the same arc here, and perhaps on roughly the same timeline.

A second observation is that **each transition produces a control layer that did not exist before it.** The factory and the joint-stock corporation are the first transition's institutional inventions. The platform and the API are the second's. The third is currently producing — under various names, none yet settled — what I will call in Part II the **cognition systems**: the infrastructure that sits between human intent and machine reasoning and governs what gets translated, when, and under what conditions. Wherever Microsoft, AWS, and Google sit in the architecture of the second transition, the equivalent position in the third will be occupied by whoever owns this layer. Identifying the layer is most of what the rest of this essay is about.

The third observation is uglier. Every prior industrial transition has come bundled with its own characteristic anxieties. These anxieties are usually initially dismissed by partisans of the new order as nostalgia. However, they often turn out, years and often decades later, to have been pointing at something real all along. Romanticism, the Luddite movement, and Marx's account of alienation were the first transition's version. The cybernetic-era worries about surveillance, depersonalization, and bureaucratic capture that I grew up with were the second's. The current version, which is everywhere in the present discourse, is the **black box** — the worry that consequential decisions are being made by systems whose internal reasoning cannot, even in principle, be inspected. The temptation among technologists is to treat this as confused or transitional. I think that is wrong, and a later section will make the case for why the opacity is not a temporary engineering deficit. I argue that it is structural to the technology, and a non-trivial fraction of the value capture in the cycle will go to firms that build the apparatus by which institutions can deploy black-box cognition in settings where its outputs matter.

### Specialization: The Smithian and Durkheimian Lineages

Specialization is the precondition for industrial transitions. Smith's pin factory is the canonical example, but the deeper analysis appears in Durkheim's *The Division of Labor in Society* (1893). Durkheim observed that specialization is not merely an efficiency mechanism but a **social-structural** one: it transforms the kind of solidarity that holds a society together from *mechanical* (resemblance among similarly skilled persons) to *organic* (interdependence among specialists).

The implication for our purposes is that specialization is doing two things simultaneously. It is decomposing complex tasks into discrete operations susceptible to optimization (the Smithian effect), and it is producing new forms of social coordination among the resulting specialists (the Durkheimian effect). Both effects are operating in the AI transition. Foundation model labs, inference providers, agent orchestrators, and vertical applications are emerging as a *system* of specialists, each of which depends on the others for the larger product (general-purpose cognition delivered into a workflow).

Harry Braverman's *Labor and Monopoly Capital* (1974) extended this analysis with the concept of **deskilling**: the process by which tacit, experience-based judgment is extracted from skilled labor, codified into procedures, and re-embedded in capital equipment, thereby reducing the bargaining power and remuneration of the worker. Braverman's case study was the machinist in twentieth-century manufacturing, but the structure of his argument generalizes cleanly. The associate attorney drafting a routine motion, the radiologist reading a chest x-ray, the accountant preparing a Schedule K-1, the junior consultant building a comparable-company analysis: these are the machinist's positions in the third transition. Their tacit judgment is presently being extracted, codified into model weights and prompt scaffolds, and re-embedded in software products that are, by design, sold not to them but to their employers.

The Polanyi brothers — Karl on the disembedding of markets (*The Great Transformation*, 1944), and Michael on tacit knowledge (*Personal Knowledge*, 1958) — frame the limit case. Michael Polanyi famously observed that "we know more than we can tell"; his interest was the residual of expert judgment that resists explicit codification. The AI transition is, in part, an empirical test of how much of "what we know but cannot tell" can in fact be told once large enough models are trained on enough demonstrated behavior. Early returns suggest the residual is smaller than mid-twentieth-century philosophy of science assumed. This has direct economic consequences: domains that were thought to be insulated from automation by virtue of their tacit-knowledge intensity (medicine, law, design, scientific intuition) are precisely the domains where the most aggressive vertical applications of AI are presently emerging.

### Commodification: From Marx to the API (or, from craft to cruft)

**Commodification** describes the process by which a previously embedded, particular, qualitatively distinctive activity becomes a fungible, exchangeable input traded in markets. Marx's analysis of the commodity in *Capital* (Volume I, Chapter 1) emphasized that the commodity-form abstracts away from the concrete labor that produced it. The commodity is interchangeable with any other instance of itself. Karl Polanyi's later analysis in *The Great Transformation* extended this to argue that the commodification of land, labor, and money — none of which are produced for sale in the manner of ordinary goods — was the constitutive transformation of the modern market economy.

The AI transition is producing a new fictitious commodity, comparable in significance to land, labor, and money: cognition itself. Inference, considered as a service, is now sold in the same form as electricity. It is metered (per token, per call), it is fungible across providers (with switching costs and quality differentials), it is delivered via standardized interfaces (APIs), and its underlying production process is opaque to the buyer. The economic structure of the foundation model market — falling unit prices, capacity constraints in upstream compute, differentiation along quality and latency dimensions — is recognizably the economic structure of an industrializing commodity, not of a craft.

Three downstream effects of this commodification are of direct investment relevance.

**First, commodification compresses producer margins.** The foundation model layer, considered in isolation, is moving toward cost-plus economics on inference, with quality differentials concentrated at the frontier. The unit economics of a model lab look more like those of a fab than those of a software company: very high fixed costs, rapidly declining marginal cost, quality-tiered pricing, capacity constraints determining short-run rents. This is a partial answer to the question of why foundation labs are valued as they are despite negative free cash flow at scale: they are being valued as future utilities, not as present software businesses.

**Second, commodification transfers value to complements.** The classic result in the economics of complementary goods is that when one input commodifies, value flows to the complementary inputs that remain scarce. In the second transition, the commodification of computation transferred value to operating systems, applications, content, and brand. In the third transition, the commodification of inference will transfer value to whatever remains scarce *given* abundant cognition: proprietary data, distribution into regulated workflows, trust and auditability, integration into systems of record and systems of action. This is the central architectural claim of the essay, and it organizes Part II.

**Third, commodification produces a particular kind of strategic vulnerability.** A company whose product is a thin presentation layer over a commodifying input — a "wrapper" — captures none of the rents from the input's commoditization and is exposed to disintermediation by both the input provider (which can move down the stack) and by competitors (which can replicate the layer). The history of the second transition is full of such companies: search engines that wrapped search APIs, e-commerce front-ends that wrapped logistics APIs, content sites that wrapped CMS APIs. Most went to zero. The investment heuristic that follows is straightforward: a commodifying input is not a moat; it is an opportunity to build a moat *adjacent* to it.

### The Black Box: Epistemic Opacity as a Structural Feature

The next concept is the most philosophically delicate. **Black-boxing**, in Bruno Latour's formulation (*Pandora's Hope*, 1999), is the process by which a working assemblage of practices, components, and judgments becomes opaque to its users — a single object that takes inputs and produces outputs, with the internal mechanism rendered functionally invisible. Latour was describing all functioning technical systems: the user of a microscope does not need to understand its optics, the user of a car does not need to understand its powertrain. Black-boxing is, in Latour's analysis, the *condition of usability* of complex systems. It is what allows a system to be deployed by users who did not build it.

The black box becomes problematic only at the boundary where its outputs are consequential and its reasoning is contestable. A microscope that reports the wrong magnification produces a measurement error. A diagnostic AI that recommends the wrong treatment produces a clinical injury. A legal AI that drafts a flawed motion produces a malpractice claim. A credit-scoring AI that denies a loan to a qualified applicant produces a civil rights violation. In each of these cases, the black-box property of the system is not a peripheral inconvenience; it is constitutive of the system's risk profile.

Frank Pasquale's *The Black Box Society* (2015) and Jenna Burrell's "How the machine 'thinks'" (Big Data & Society, 2016) offered the canonical taxonomy of opacity in algorithmic systems: opacity by design (intentional concealment for commercial reasons), opacity by technical complexity (the system's reasoning is in principle inspectable but in practice illegible), and opacity by deep architecture (the system's reasoning is, given current methods, irreducibly inaccessible — the case of high-dimensional learned representations). **Foundation models exhibit all three forms simultaneously.** They are commercially closed, computationally complex, and architecturally inscrutable. This is not a failure of contemporary AI; it is, on present technical understanding, a fundamental property of the technology.

The structural argument I want to advance is the following. **The black-box property of foundation models is not a temporary engineering inconvenience that will be solved in a future release. It is a permanent feature of the cognitive industrialization, exactly as the opacity of the factory was a permanent feature of the first industrial revolution.**

The pin factory was a black box to its workers — none of them could account for the production of the pin. The AWS data center is a black box to its tenants — they cannot inspect the physical reality of their compute. The foundation model is and will remain a black box to its users — they cannot inspect the chain of inference that produced its output. In each case, the black-box property is the *condition* of the system's economic utility, because it is what permits the system to be sold without the buyer having to acquire the seller's expertise.

This observation reframes the so-called "interpretability problem" from a technical research agenda into a market structure. **Interpretability, auditability, traceability, and verifiability are not the absence of the black box; they are products that wrap the black box and make it deployable in contexts where its outputs are consequential.** Every regulated industry, every fiduciary relationship, every audited workflow, every contestable decision — these are markets for inspection and trust products that sit *over* the foundation model layer. The companies that build these products are not solving the black box; they are profiting from its permanence.

This is the second central architectural claim of the memo, and it pairs with the first. Commodification of cognition transfers value to scarce complements. The most undersupplied complement is **epistemic trust**: the apparatus of inspection, audit, verification, citation, traceability, and governance that allows institutions to deploy black-box cognition in consequential settings. The companies that own this apparatus will be among the most durable winners of the cycle.

### Synthesis: The Three Phases of the AI Transition

Specialization, commodification, and black-boxing are the axes along which the AI transition is reconfiguring cognitive labor. They are interdependent rather than orthogonal. For instance, work has to be decomposed into operations before those operations can be priced as fungible inputs, and that resulting capability has to be wrapped in an interface that hides its complexity before institutional buyers ("enterprises") will adopt it at scale. The combined motion is the same craft-to-system-to-commodity arc that has defined every prior industrial revolution. What is new is the layer the arc operates on.

For our purposes, the arc, when applied to cognition, runs roughly as:

tacit expert judgment → codified operational procedure → model-mediated workflow → system of record / system of action → commoditized output

The artisan sits at the left of this chain. Here, we should imagine the senior partner who has read every relevant case in her practice area, the senior physician who has seen every relevant presentation in his subspecialty, or the senior engineer who has debugged every relevant failure mode in her stack.

The commodity sits at the right. For instance, consider the lawyer's draft motion, a differential diagnosis, or an engineer's pull request on GitHub. These are available on demand at marginal costs that approach the cost of inference. The interesting question is what happens between those two poles. I believe that whoever owns the work that gets done between them captures the value from everything downstream.

Several positions along the chain are unusually defensible. I want to call out three explicitly because they carry most of the present-cycle investment opportunity and because they organize the heuristic developed in the next section.

The first position is the **system layer**. Codifying expertise into operational procedures requires infrastructure for capturing, organizing, executing, updating, and evaluating those procedures over time. This is the cognitive analogue of the factory floor — and crucially, it is not the source of the raw cognition. The foundation model is the source of raw cognition; the system layer is the architecture inside which raw cognition gets composed into useful work. Firms that own this layer — agent fabrics, orchestration runtimes, evaluation infrastructure, developer tooling for cognitive systems — earn positions analogous to those that operating systems earned in the second transition.

The second position is the **trust layer**. Deploying black-box cognition into consequential settings requires an apparatus of inspection: observability for agentic systems, audit trails for AI-mediated decisions, citation and traceability infrastructure, governance and compliance products. The deeper the regulatory or fiduciary intensity of the workflow being supported, the more value the trust apparatus captures. Most institutional buyers in healthcare, financial services, and legal cannot deploy AI-mediated decision-making without this apparatus, and they procure it separately from the model.

The third position is the **vertical layer**. Some professional domains will never be served well by a generic system, no matter how capable the underlying model becomes. Legal practice, clinical workflow, claims adjudication, and customer service involve enough institutional knowledge, regulatory authorization, distribution relationship, and workflow specificity that the right product is shaped end-to-end around the domain. The current vertical winners — Harvey in legal, Abridge in healthcare, EvenUp in personal injury, Sierra in customer experience — capture value that scales with the depth of the domains they serve and the difficulty of replicating the institutional integration they have built.

These positions are not exhaustive, and the specific firms occupying them will rotate over the cycle. I do believe that they are structurally privileged, however, and they form the spine of the investment heuristic that Part II develops.

### Three More Concepts (yes, really)

Before formalizing the heuristic, three concepts cut across my analysis that I have not yet introduced and so warrant explicit naming. These have less to do with my academic interests than with my lived experience as a tech operator at scale.

**Cognitive externalization.** By this, I mean work that previously required an expert but that is now encoded into a system that does not require that expert. This is the third-transition analogue of mechanization (first transition) and digitization (second transition). The investment-relevant signal is the strength and durability of the externalization. A thin chatbot externalizes nothing. On the other hand, a system that learns from every transaction, accumulates institutional context, and returns ever-more-targeted outputs externalizes deeply.

**Workflow ownership.** This is the degree to which a system has become the daily, recurring, depended-upon substrate of work in a domain, rather than a one-off generative tool consulted occasionally. Workflow ownership is closer to the operating system than to the application: it is what users return to, what other systems plug into, and what the institution accidentally builds its institutional memory inside. This was critical to our success at GitHub.

**Budget gravity.** It is easy in this new era to forget fundamentals from the last, or to rush to dismiss them as irrelevant. But every tech founder — or leader of any firm, for that matter — knows that their product or service must attach to a corresponding budget within their customer's business. Budget gravity refers to the size and durability of the budget category to which a product attaches. Software for legal research attaches to the legal services budget, which is large, durable, and price-inelastic. Software for one-off image generation attaches to a discretionary creative budget that I see as a dead-end. Budget gravity is the unfashionable but reliable predictor of revenue scale, and it is and will be the variable that most often separates the AI companies that grow into durable firms from the ones that grow rapidly and then plateau.

These three concepts — externalization, workflow ownership, and budget gravity — together with the structural analysis above, generate the five-question diagnostic to which we next turn.

Part II — From Theory to Heuristic: Five Questions
--------------------------------------------------

This is all well and good, but very academic. And I am not academic. I am a business operator.

So here in Part II, I want to take the structural argument of Part I and do something with it. The point of building a theory is to use it as a lens — one that changes what you look for, sharpens what you see, and disciplines the conclusions you're willing to draw. What I want from the framework that follows is the discipline to ask the right questions of every AI company I look at, in the right order, and to treat the answers, taken together, as the real case for or against.

The framework is five questions. They come directly from the three structural processes of Part I — specialization, commodification, black-boxing — plus the two anchoring concepts I introduced above (workflow ownership and budget gravity). The questions build on each other. The first asks what expert craft is being industrialized. The second asks what the company holds that the foundation model labs cannot easily replicate. The third asks how the company makes AI-generated outputs trustworthy enough to use in settings where being wrong actually matters. The fourth asks whether the company has become the substrate of work people do every day. The fifth asks which budget pays for all of this, and whether the timing is right.

A company that answers all five clearly is worth a serious conversation. A company that deflects on any one of them — a vague answer, a future-tense answer, "we're working on that" — is not, no matter how polished the deck.

One important thing about what this is not. I've deliberately avoided turning these five questions into a scoring rubric. You'll notice I don't assign numbers and add them up. The reason is structural: the argument of Part I is not symmetric. The black-box problem is more permanent and more underpriced than the budget problem. The commodification dynamic is more aggressive than the specialization dynamic. Workflow ownership compounds in a way that budget gravity does not. Treating these with the same weight would quietly undo the argument they're supposed to express. The questions are asymmetric on purpose. The order matters. And the first vague answer genuinely ends the inquiry.

### Question 1 — Specialization: What expert craft is being industrialized, and how deeply?

This is the question every founder will answer confidently and most will get wrong. "We use AI to automate X" is not an answer. The real answer names a specific, decomposable unit of cognitive labor — the contract redlines a senior associate has internalized over a decade of practice, the pattern recognition it takes a radiology resident eighteen months to develop, the heuristics a seasoned underwriter applies when she's looking at a flood-zone risk assessment. Vague answers come from founders who haven't really decided which expert they're replacing. Sharp answers come from founders who have.

Behind the naming test is the depth test. Once the craft is named, how much of it lives inside the system, accumulating with use? Or is the expertise being supplied fresh from the model every time someone opens the app? A system that re-derives its knowledge on every call has externalized nothing — it is a presentation layer on the model, and the model owns the value. A system that has absorbed ten thousand transactions of institutional context and gets better from each one has externalized a great deal, and that externalization compounds. The companies worth taking seriously are the ones whose externalization is compounding at a rate no competitor can easily match — not the ones claiming to have already externalized everything, which is usually overstatement.

The trap here is the answer that sounds sharp but doesn't survive a follow-up. A founder who says "we're AI for medical coding" has named a craft. But the real question is: which specific coding decisions, in which clinical specialty, with what payer mix, against what version of the coding standard? The gap between a crisp first answer and an equally crisp second answer is exactly the gap between a company that has decomposed the work and one that is still gesturing at it.

### Question 2 — Commodification: What does this company hold that the model labs cannot easily take?

This is the question that sits at the center of the whole argument. The structural claim from Part I is unambiguous: foundation models are commodifying — inference is becoming a utility, priced per token, available from multiple providers, delivered through standard interfaces. When that happens, value flows to whatever remains scarce. The investment question is not whether the company has a moat. It is which specific thing they hold, today, that OpenAI or Anthropic or Google cannot simply build into their next product release.

The list of things that actually qualify is shorter than most founders assume. Proprietary data that was earned through real operational integration — not scraped from the open web, but accumulated through years of working inside a specific institutional workflow with permissioned access. Distribution into a regulated or fiduciary context that a hyperscaler simply cannot replicate in a product sprint, because the regulation, the procurement cycle, or the institutional relationship is genuinely hard to fake. Systems of record that the company has been embedded in long enough that the customer's own institutional memory lives inside the product. Infrastructure positions in identity, payment, or policy that the platform layer cannot absorb because the legal or commercial position is owned elsewhere.

What does not qualify: "we will build proprietary data through usage." That is an intention, not a complement. "We have the largest permissioned dataset of redlined contracts from AmLaw 100 firms, accumulated over thirty months of production deployment" — that is a complement. The vague version leaves you exposed from both directions: the model lab moves down-stack, the copycat moves up-stack, and you get compressed from both sides simultaneously.

### Question 3 — Black-Boxing: How does this company make AI outputs trustworthy enough to use in settings where being wrong matters?

I spent a lot of time on the black box in Part I because I think the opacity of foundation models is widely misunderstood. It is not a temporary engineering problem. It is a permanent structural feature — a condition of the technology's utility, not a defect in it. The foundation model is a black box to its users for the same reason the AWS data center is a black box to its tenants: the opacity is what makes it deployable. You don't need to understand it to use it. You just need it to work.

The problem is that "just works" is not good enough in settings where being wrong produces a clinical injury, a malpractice claim, a civil rights violation, or a material misstatement in a regulatory filing. In those settings — healthcare, legal, financial services, any regulated workflow — institutions cannot deploy AI without some separate apparatus that makes the outputs inspectable, contestable, and auditable. They have to be able to explain, after the fact, what happened. They have to be able to show a regulator the reasoning. They have to be able to defend the decision.

This means the trust apparatus is not a feature — it is a category of product. And the companies that build it are not solving the black box. They are profiting from its permanence.

The diagnostic question here is whether the company's trust apparatus is shaped to the specific consequence structure of the buyer they serve. In legal: citation, conflict-checking, source traceability, human review workflows. In healthcare: clinician override, source attribution, auditability for adverse events. In financial services: model risk documentation, audit trails, explainability for lending decisions. The form is different in every industry. The structural role is the same. The companies worth paying attention to are the ones who have built the trust apparatus specific to the domain they're in — not the ones who have added "safety guardrails" as a feature and called it done.

The most undervalued category in the current market, in my view, is the company whose investors think of it as a developer tools company when it should be priced like trust infrastructure in a regulated industry. Those are very different multiples.

### Question 4 — Workflow: Has this company become the substrate of work people do every day?

The difference between a system consulted occasionally and one that is the substrate of daily professional work is not a product distinction. It is a structural one. The occasional-use system is a tab. The daily-use substrate compounds.

Compounding is what produces the operating-system position of a technology cycle. Microsoft didn't win the second transition because Word was the best word processor (it often wasn't). It won because Office became the environment inside which work happened — the thing every other system assumed, every user returned to, and where institutional memory quietly accumulated without anyone making a deliberate decision to put it there. The same dynamic is running now, at the layer above code, across every professional craft simultaneously.

The test I use has three parts. Does the user come back the next morning without being prompted? Do other systems plug into this company's product because that's where the workflow lives now? And has institutional memory started to accumulate inside the product without anyone explicitly architecting it — the organization's knowledge accreting inside the system because that's just where the work is done? These three things — daily return, third-party plug-in, institutional memory accumulation — are the leading indicators of workflow ownership, and they tend to precede every metric the standard SaaS stack measures.

At GitHub, this was the single most reliable predictor of which developer tools survived the next platform shift. The survivors weren't necessarily the technically superior ones. They were the ones that had become infrastructure — the thing everything else assumed. The same survival logic applies now, across every professional domain at once.

### Question 5 — Budget and Phase: Which budget pays for this, and is the timing right?

Two questions collapsed into one because they answer together.

Every founder bristles at the budget question. It feels too operational, too boring, too much like asking a visionary to fill out a procurement form. But the budget category sets the size of the prize, and anchoring to a real, durable, price-inelastic budget is the difference between a company that grows into a durable business and one that grows fast and then plateaus. A company attached to the legal services budget will get to $1B in annual revenue faster than one attached to discretionary creative tooling, regardless of how elegant the product is. Budget gravity is unglamorous. It is also among the most reliable predictors I know of which companies are actually building something.

The phase question is what puts budget gravity on a timeline. The cycle has three rough phases, and what is rewarded in each one is different.

**Phase 1**, through roughly 2026, is the land grab. The reward goes to companies that have answered Questions 1 and 4 well — that have captured a specific unit of cognitive labor and built deep enough workflow substrate that users don't leave. Speed matters more than defensibility in this phase. The companies that win Phase 1 have identified the craft and owned the daily workflow before the market has settled.

**Phase 2**, from 2027 through roughly 2029, is the defense. This is when the foundation labs and the hyperscalers arrive with vertical interfaces, and the companies that haven't built specific structural complements get absorbed into the platform layer. The reward goes to companies that have answered Question 2 well — that have something specific the model lab cannot simply take. The companies that don't have an answer to Question 2 by the time Phase 2 arrives will not survive it.

**Phase 3**, from 2030 onward, is when the regulated and fiduciary spend concentrates. The reward goes to companies that have answered Questions 3 and 5 — that own the trust apparatus in a high-consequence domain and are attached to a budget that compounds as institutions formalize their AI deployments. Most of what the current market is pricing as a Phase 3 business is actually in Phase 1 or early Phase 2. That gap is where most of the mispricing in the current AI investment landscape lives.

### The Decision Rule

A company that answers all five questions well is worth a conversation at any stage, with the valuation calibrated to which phase it will be tested in next. A company that answers four well and has one conditional — a specific, credible path to closing the gap — is also worth it. A deflection on any of the five — vague answer, future-tense answer, "we're working on that" — is not.

The discipline is to keep asking until each question has a sharp answer, or until the absence of a sharp answer becomes the answer.

### The Category Question

One more thing before the company analyses. The five questions score a company's position within its category. They don't score the category. Some categories structurally produce more durable positions than others, regardless of how well any individual company answers the five questions.

The categories with the best structural fit: vertical AI in regulated industries (legal, healthcare, financial services), where the trust and institutional integration requirements create genuine defensibility; autonomous agents in mission-critical operations (SRE, security, revenue operations); and scientific discovery platforms with proprietary experimental data.

The categories with the worst structural fit: horizontal productivity and AI assistant layers, where the platform overhang from Microsoft and Google makes defensibility structurally difficult; thin inference wrappers in discretionary budget categories, which face commoditization from every direction; and image, video, and audio generation tools without a defended workflow position.

A company scoring perfectly on all five questions in horizontal productivity is in the wrong category and should probably know it. A company scoring on three questions in vertical-regulated is in the right category and worth the work to get to five.

Part III — The Framework in Practice: Sequoia, Thrive, and the Real Economy
--------------------------------------------------------------------------

<div class="trail-off">

The purpose of Part III is not to showcase the cases where the framework produces flattering results. It is to test whether the theory survives contact with reality — specifically, with the reality of where two of the most sophisticated AI investors in the world are currently putting their money. Sequoia and Thrive have access to every deal in the market, relationships with every major founder, and research teams that have been studying this landscape for years. If the framework doesn't hold up against their portfolios, that's a problem with the framework.

What follows is a representative sample from each firm: two companies with more established positions that have already produced meaningful signals about defensibility, and two or three earlier bets where the questions the framework raises are not yet fully answered by the market.

</div>

<p class="trail-end">Part III — applying the five questions to Sequoia and Thrive portfolio companies (Harvey, Sierra, Xbow, Traversal, Databricks, Stripe, Cursor, Physical Intelligence) — and Part IV, on the AI-ification of the real economy, are still being written. Full version expected June 2026.</p>
