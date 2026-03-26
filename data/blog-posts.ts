export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-know-if-you-are-underpaid",
    title: "How to Know If You Are Underpaid",
    description: "Most people suspect they're underpaid but never verify it. Here's how to find out — and what to do about it.",
    date: "2026-03-01",
    readTime: "5 min read",
    content: `
      <p>Most people have a gut feeling they're underpaid. But gut feelings don't get you a raise. Data does.</p>
      <h2>Start with market data</h2>
      <p>The first step is benchmarking your salary against the market. Use tools like our <a href="/">salary checker</a> to see where you stand relative to others in your role, location, and experience level.</p>
      <h2>Look at the full picture</h2>
      <p>Salary is one number. Total compensation includes bonuses, equity, benefits, and flexibility. But base salary is still the most important lever — it compounds. If you're underpaid by €10,000 today and that compounds over 5 years with promotions, the true cost is far higher.</p>
      <h2>Signs you're underpaid</h2>
      <ul>
        <li>You haven't had a meaningful raise in 2+ years</li>
        <li>New hires in similar roles earn more than you</li>
        <li>You're consistently overperforming but not compensated for it</li>
        <li>Recruiters offer you significantly more than your current salary</li>
        <li>Market tools put you below the 40th percentile</li>
      </ul>
      <h2>What to do next</h2>
      <p>Once you have the data, you have leverage. Book a meeting with your manager. Come with three data points: your market rate, your contributions, and a specific number. Don't ask — propose.</p>
      <p>Check your current position with our <a href="/">free salary tool</a>. It takes 30 seconds.</p>
    `,
  },
  {
    slug: "salary-negotiation-tips",
    title: "7 Salary Negotiation Tips That Actually Work",
    description: "Negotiating your salary is the highest-ROI action you can take. Here are 7 practical tips to get more.",
    date: "2026-03-05",
    readTime: "6 min read",
    content: `
      <p>Negotiating your salary feels uncomfortable. But so does being €10,000 below market for years. Here's how to do it right.</p>
      <h2>1. Know your number before the conversation</h2>
      <p>Never enter a negotiation without data. Use our <a href="/">salary checker</a> to establish your market rate. Come with a specific figure, not a range.</p>
      <h2>2. Let them go first — when possible</h2>
      <p>If asked for your expectation in an interview, try to get the budget range first. "I'd love to understand the range budgeted for this role before sharing my expectation."</p>
      <h2>3. Anchor high</h2>
      <p>Your first number sets the frame. If you're worth €80,000, ask for €87,000. You'll likely land somewhere in between.</p>
      <h2>4. Don't justify — quantify</h2>
      <p>Don't say "I've been working really hard." Say "I led the project that generated €200k in new revenue last quarter."</p>
      <h2>5. Silence is your friend</h2>
      <p>After you name your number, stop talking. The first person to fill the silence tends to concede ground.</p>
      <h2>6. Negotiate the full package</h2>
      <p>If base salary is fixed, negotiate on bonus, equity, remote days, start date, or a 6-month review with a salary adjustment trigger.</p>
      <h2>7. Get it in writing</h2>
      <p>Verbal agreements disappear. Confirm every negotiated term via email before you sign anything.</p>
      <p>Before your next negotiation, <a href="/">check where you stand in the market</a>. Knowledge is leverage.</p>
    `,
  },
  {
    slug: "average-salaries-europe-2026",
    title: "Average Salaries in Europe 2026",
    description: "A breakdown of average salaries across major European cities for tech, product, marketing, and more.",
    date: "2026-03-10",
    readTime: "7 min read",
    content: `
      <p>Salaries vary wildly across Europe. A software engineer in London earns almost double what their counterpart in Madrid takes home.</p>
      <h2>Software Engineers</h2>
      <p>London leads at an average of £95,000–£120,000 for mid-senior roles. Amsterdam and Dublin follow at €85,000–€105,000. Berlin and Paris sit at €75,000–€95,000. Spain ranges from €45,000–€65,000.</p>
      <h2>Product Managers</h2>
      <p>London: £90,000–£115,000. Amsterdam: €80,000–€100,000. Berlin: €70,000–€90,000. Madrid/Barcelona: €45,000–€65,000.</p>
      <h2>Marketing Managers</h2>
      <p>London: £55,000–£80,000. Paris: €55,000–€75,000. Berlin: €50,000–€65,000. Spain: €35,000–€52,000.</p>
      <h2>Why the gap?</h2>
      <p>Cost of living, tax structures, company density, and local market maturity all drive differences. London has a deep pool of high-paying US-headquartered companies. Spain has a growing startup scene but salaries haven't caught up yet.</p>
      <p><a href="/">Check your salary against the market now</a> — it takes 30 seconds.</p>
    `,
  },
  {
    slug: "how-to-increase-your-salary",
    title: "How to Increase Your Salary (Without Changing Jobs)",
    description: "Switching jobs is the fastest way to a raise. But it's not the only one. Here's how to increase your salary where you are.",
    date: "2026-03-15",
    readTime: "5 min read",
    content: `
      <p>The conventional wisdom is: want more money? Change jobs. And it's true — job switchers often see 15–30% salary jumps. But it's not always the right move.</p>
      <h2>Time your ask right</h2>
      <p>Don't ask for a raise randomly. Time it with: a performance review cycle, after a clear win, after taking on significant new responsibilities, or when you have a competing offer.</p>
      <h2>Build your case over time</h2>
      <p>Start a "wins doc" — a running list of your contributions, projects delivered, and measurable impact. When the time comes, you want to walk in with a portfolio, not a feeling.</p>
      <h2>Get a competing offer</h2>
      <p>This is the most reliable lever. An external offer tells your employer what the market thinks you're worth.</p>
      <h2>Expand your scope</h2>
      <p>More responsibility often precedes more pay. If you're doing the work of a senior, make that visible. Push for the title — the money follows.</p>
      <h2>Ask directly</h2>
      <p>Many managers won't give you a raise unless you ask. It's not their job to monitor your market rate. It's yours.</p>
      <p>Start by understanding where you stand. <a href="/">Use our free tool</a> to check your market rate in under a minute.</p>
    `,
  },
  {
    slug: "remote-work-salary-negotiation",
    title: "How to Negotiate Your Salary as a Remote Worker",
    description: "Remote work changes the rules of salary negotiation. Here's how to navigate location-based pay and global pay scales.",
    date: "2026-03-20",
    readTime: "5 min read",
    content: `
      <p>Remote work opened up global job markets. But it also introduced a new dilemma: should your salary be based on where the company is, or where you are?</p>
      <h2>The location-adjusted pay debate</h2>
      <p>Many companies have moved to "location-adjusted" salaries — paying you less if you live in a lower cost-of-living area. There's no right answer — but there is a negotiation to be had.</p>
      <h2>Know which model the company uses</h2>
      <p>Ask directly in the interview: "How do you handle compensation for remote employees across different locations?"</p>
      <h2>Anchor to the role's value, not your location</h2>
      <p>The work you deliver is worth the same whether you're in Dublin or Madrid. Make that argument explicitly.</p>
      <h2>Use market data for your role, not your city</h2>
      <p>If you're a software engineer working for a US startup from Barcelona, benchmark against what that company pays engineers in similar roles globally.</p>
      <h2>Factor in tax and take-home</h2>
      <p>Gross salary is only part of the picture. Tax rates, social security contributions, and deductions vary significantly across Europe.</p>
      <p><a href="/">Check your market rate</a> and come to your next negotiation with data.</p>
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
