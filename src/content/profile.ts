export type Stat = {
  /** Rendered value; numeric parts count up when `countTo` is set. */
  value: string;
  label: string;
  countTo?: { from: number; to: number; decimals?: number; prefix?: string; suffix?: string };
};

export type Project = {
  name: string;
  role: string;
  domain: string;
  period: string;
  headline: { value: string; label: string };
  accent: "sky" | "amber";
  points: string[];
  chips: string[];
};

export type Partner = {
  name: string;
  role: string;
  period: string;
  points: string[];
};

export type Link = { label: string; href: string };

export const profile = {
  name: "Ahmed Samir",
  title: "Ahmed Samir — AWS Cloud & Serverless Architect",
  description:
    "Ahmed Samir is an AWS Cloud & Serverless architect and fractional platform lead in London. He helps startups ship faster, cut cloud bills and get ready for investors.",
  tag: "AWS Cloud & Serverless · London · Remote",
  headline: { lead: "Every great product starts", accent: "in the cloud." },
  intro:
    "I'm a fractional platform lead. I help startups ship faster, cut cloud bills and get ready for investors, on serverless AWS that scales from day one.",
  email: "ahmedsamir1922@gmail.com",

  nav: [
    { label: "About", href: "#about" },
    { label: "Shipped", href: "#shipped" },
    { label: "Contact", href: "#contact" },
  ] satisfies Link[],

  stats: [
    {
      value: "200K+",
      label: "students on a serverless platform",
      countTo: { from: 0, to: 200, suffix: "K+" },
    },
    {
      value: "1.3%",
      label: "of Germany's power traded",
      countTo: { from: 0, to: 1.3, decimals: 1, suffix: "%" },
    },
    {
      value: "75–78%",
      label: "AWS cost cut on two platforms",
      countTo: { from: 0, to: 78, prefix: "75–", suffix: "%" },
    },
    { value: "2m → 3s", label: "lab launch time" },
  ] satisfies Stat[],

  shippedHeading: "Built in the cloud, shipped at scale",
  projects: [
    {
      name: "Security Blue Team",
      role: "Founding Platform Engineer",
      domain: "Cybersecurity EdTech",
      period: "Oct 2022–Apr 2025",
      headline: { value: "200K+", label: "students trained on BTL1 & BTL2" },
      accent: "sky",
      points: [
        "Fully serverless training platform with multi-region failover",
        "Lab start time cut from 2 minutes to 3 seconds",
        "AWS costs down 75% with lower latency via Global Accelerator",
        "SOC 2-aligned security: Security Hub, GuardDuty, IAM Access Analyzer",
        "AI tutor built on the OpenAI Assistants API",
      ],
      chips: ["Lambda", "DynamoDB", "EventBridge", "Terraform", "Global Accelerator"],
    },
    {
      name: "Suena Energy",
      role: "Senior Platform Engineer",
      domain: "Energy Trading",
      period: "Sep 2024–now",
      headline: { value: "1.3%", label: "of Germany's electricity market" },
      accent: "amber",
      points: [
        "Led the Series A cloud due diligence",
        "Infrastructure costs down 78%",
        "Replaced Confluent Kafka with an in-house event-driven scheduler",
        "Refactored 300+ Lambdas",
        "Built an S3 / Glue / Lake Formation / Athena data lake",
        "Built the observability stack: CloudWatch, Grafana, Sentry",
      ],
      chips: ["Lambda", "GraphQL", "Terraform", "Glue", "Grafana"],
    },
  ] satisfies Project[],

  partnersHeading: "Also shipped — AWS partners",
  partnersIntro:
    "Two AWS partners where I helped many startups build on AWS — from small startups such as Diet on Paper all the way up to Air Canada and large enterprises.",
  partners: [
    {
      name: "Cloudvisor",
      role: "Founding DevOps Engineer, AWS Partner",
      period: "Oct 2021–Apr 2025",
      points: [
        "Built startup infrastructure from scratch with Terraform for blockchain, fintech, e-commerce and food-tech clients",
        "Ran cost reviews across hundreds of customer AWS accounts",
        "Migrated the billing app from EC2 to ECS",
        "Earned GCP Associate Cloud Engineer, helping open a GCP partnership",
        "Raised team delivery to 85% with Scrum",
      ],
    },
    {
      name: "Serverless Guru",
      role: "Senior Cloud Sales Engineer, AWS Partner",
      period: "May 2024–Aug 2025",
      points: [
        "The bridge between engineering and business: worked directly with the CEO and CTO on go-to-market",
        "Built the sales function from the ground up — processes, CRM and playbooks",
        "Engineered AI agents that automated lead generation and follow-ups, building a pipeline of thousands of qualified leads without extra headcount",
        "Represented the company at AWS re:Invent and opened conversations with global enterprises including Hilton and Marriott",
      ],
    },
  ] satisfies Partner[],

  skillsHeading: "Toolbox",
  skills: [
    "AWS (Lambda, ECS, DynamoDB, EventBridge, Step Functions, Glue, Athena…)",
    "GCP",
    "Terraform",
    "Boto3",
    "CI/CD (GitLab, GitHub, Bitbucket)",
    "CloudWatch / Grafana / Sentry",
    "Security Hub / GuardDuty",
    "OpenAI APIs & AI agents",
    "Python",
  ],

  contactHeading: "How to reach me",
  contactTitle: "Building something in the cloud?",
  contactText: "Fractional platform lead, cost reviews, Series A tech due diligence.",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/ahmedsamir22" },
    { label: "GitHub", href: "https://github.com/samir2212" },
    { label: "GitLab", href: "https://gitlab.com/samir2279" },
  ] satisfies Link[],

  footer: "© 2026 Ahmed Samir · London · Remote",

  terminal: {
    command: "$ terraform apply",
    lines: ["✔ Security Blue Team — 200K+ students", "✔ Suena Energy — 1.3% of German power"],
  },
};
