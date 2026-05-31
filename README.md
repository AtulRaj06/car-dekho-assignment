# CarAdvisor

A personalized car recommendation tool for Indian buyers. Answer 5 questions, get a ranked shortlist, compare cars side-by-side.

**Live:** [car-dekho-assignment-production.up.railway.app](https://car-dekho-assignment-production.up.railway.app/) &nbsp;·&nbsp; **Deploy guide:** [RAILWAY.md](RAILWAY.md)

---

## What I built and why

Indian car buyers face a genuinely hard problem: there are 50+ options across wildly different segments, prices, and use cases — and most comparison tools just dump specs on you and let you figure it out. CarAdvisor flips that: tell it your budget, how you use the car, how many people you carry, and what you care about most, and it scores every car against those priorities and gives you a ranked list.

The core product is a weighted scoring engine (0–100) that combines five factors: budget fit, segment match for your use case, seating capacity, your top priority (fuel economy / boot space / safety / performance / value), and fuel type preference. The weights aren't arbitrary — budget is 30 pts because going over budget is a hard constraint, priority is 25 pts because it's the most differentiating input, use-case segment fit is 20 pts, and the rest split the remaining 25.

Beyond the quiz, there are car detail pages with real specs and user reviews, a segment browser, and a side-by-side comparison table that highlights the best value in each row.

### What I deliberately cut

- **User accounts / auth.** Every feature works without signup. Reviews are anonymous (just a name field). The friction of a login wall would kill the core use case.
- **Dealer leads / contact forms.** Out of scope. This is a research tool, not a lead-gen product.
- **Real-time pricing.** Prices are hardcoded from the current Indian market. A live pricing API would need a paid data source and adds infra complexity that doesn't serve the assignment.
- **Pagination on results.** Always show the top 10. If the top 10 doesn't have what you want, retake the quiz with different inputs — that's a better UX than infinite scroll on a ranked list.
- **Image uploads for reviews.** Text reviews are sufficient; image storage (S3/Blob) adds setup cost with low payoff.
- **Filtering/sorting on results.** The whole point of the quiz is to do the sorting for you. Adding manual sort-by-price undermines the recommendation concept.

---

## Tech stack and why

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR for the results/detail pages matters — scoring 20 cars and fetching specs should not happen in the browser. App Router's async server components made this clean without custom API routes for every read. |
| Database | SQLite via Prisma 5 | 20 cars, a few hundred reviews. SQLite is zero-infra and fast enough. Prisma gives type-safe queries and a clean migration path to PostgreSQL if scale ever matters. |
| Styling | Tailwind CSS 4 | Fastest way to ship responsive, consistent UI. The segment color system (blue→hatchback, green→SUV, etc.) is a few lines of config. |
| Hosting | Railway | One-command deploy, reads `package.json` scripts, sets PORT automatically. No Dockerfile needed. The build script (`prisma generate && prisma db push && node prisma/seed.js && next build`) runs on every deploy. POST requests work fine and keep changes as it is not same in vercel |

SQLite resets on each Railway deploy because Railway's filesystem is ephemeral. User reviews don't survive a redeploy. That's acceptable for an assignment; swapping in Railway PostgreSQL is a one-line schema change.

---

## What I delegated to AI vs. did manually

**Delegated to AI (Claude):**

- **Seed data.** Generating realistic specs for 20 Indian cars — mileage, BHP, boot space, NCAP ratings, ground clearance, on-road prices — is tedious lookup work. AI got 90% of it right on the first pass; I spot-checked values against CarDekho/CarWale and corrected a few prices and mileage figures that were off.
- **Boilerplate and repetitive structure.** Page scaffolding, the comparison table's row-by-row highlight logic, the `carImages.js` URL map — all generated, then reviewed.
- **Prose for pros/cons.** Writing 3–4 pros and 2–3 cons for each of 20 cars is mechanical. AI produced plausible bullets; I trimmed or rewrote the ones that were generic filler.
- **Scoring algorithm skeleton.** I defined the factors and weights; AI translated them into the initial JavaScript. I rewrote the budget partial-credit logic (the original was too binary) and tuned the use-case segment scoring after testing edge cases.

**Done manually:**

- **Product decisions.** What questions to ask, what weights make sense, what to cut, how the compare flow works.
- **Architecture.** Where SSR vs. client components split, the URL-param approach for quiz state (no DB, no session), the singleton Prisma client pattern.
- **UI layout and hierarchy.** Tailwind classes are fast to write; the actual visual decisions (card layout, score badge placement, comparison table header stickiness) needed iteration that AI can't do without a browser.
- **Debugging Railway deploy.** The build command order (`prisma generate` before `next build`) and the ephemeral filesystem caveat were worked out manually.

### Where AI helped most

Seed data, by a large margin. Getting 20 cars with accurate Indian market specs — including makes and models that are locally relevant (Maruti Suzuki Alto, Tata Punch, Hyundai Creta) rather than US/EU defaults — would have taken 2–3 hours of manual lookup. AI got it done in one prompt plus one correction pass.

The scoring algorithm was also a good fit: once I specified the weights and edge cases clearly (partial credit for 15–30% over budget, EV mileage scaled differently from ICE), the translation to code was straightforward and correct.

### Where they got in the way

**Generic UI suggestions.** When I asked for help with UI, the output tended toward safe, generic patterns (cards with shadows, blue primary buttons) rather than anything that reflected the product's character. The segment color system and the score ring came from manual iteration, not AI output.

**Over-engineered first drafts.** The initial scoring function had too many nested conditionals and intermediate variables. It worked, but was harder to read and modify than it needed to be. I simplified it significantly.

**India-specific accuracy.** A few car specs were confidently wrong — one model's mileage was the international figure, not the ARAI-certified Indian rating; a price was 18 months out of date. AI doesn't know it's wrong in these cases, so the output needs domain verification, not just a quick skim.

---

## If I had another 4 hours

1. **Persistent reviews with PostgreSQL.** Switch the Railway deploy to use Railway's PostgreSQL add-on. One-line Prisma schema change, one env var update. Reviews survive deploys and the product becomes actually useful as a review aggregator.

2. **Score explanation card.** Show the user *why* a car ranked where it did — a small breakdown of its score by category (budget: 28/30, priority: 18/25, etc.). This builds trust in the recommendation and helps users understand the trade-offs.

3. **"Retake with tweak" flow.** After seeing results, let users adjust one parameter (e.g., stretch budget by 2L) without going back to question 1. This is the highest-value UX improvement: most real car shopping is "what if I spend a bit more."

4. **EMI calculator on car detail pages.** Indian car buyers think in monthly EMI, not lakh totals. A simple slider (down payment %, tenure in months, interest rate) that shows estimated EMI would make the detail page practically useful.

5. **Admin seed UI.** Right now, adding a car means editing `seed.js` and redeploying. A protected `/admin` route with a form to add/edit cars would make the data layer maintainable without touching code.

---

## Running locally

```bash
npm install
npx prisma db push
node prisma/seed.js
npm run dev
```

The app runs at `http://localhost:3000`. No external services required — everything runs on the local SQLite file.
