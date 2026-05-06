import { siteConfig } from "./site";

export interface VisibilityFaq {
  question: string;
  answer: string;
}

export interface VisibilityAnswerPage {
  slug: string;
  title: string;
  question: string;
  description: string;
  directAnswer: string;
  bestFor: string[];
  notFor: string[];
  details: string[];
  faqs: VisibilityFaq[];
  relatedSlugs: string[];
}

export interface VisibilityUpdatePost {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  intro: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
}

const notClinicalCare =
  "Voice of Self is not therapy, diagnosis, crisis support, or a replacement for professional care.";

export const visibilityAnswerHub = {
  title: "Voice of Self Answers",
  path: "/answers/",
  description:
    "Short, specific answers about Voice of Self, voice-first reflection, private journaling, self-talk, and noticing personal growth over time.",
  intro:
    "These pages answer narrow questions people might ask when they want a calmer way to reflect, speak their thoughts out loud, or understand whether Voice of Self fits them.",
} as const;

export const visibilityAnswerPages: VisibilityAnswerPage[] = [
  {
    slug: "what-is-voice-of-self",
    title: "What is Voice of Self?",
    question: "What is Voice of Self?",
    description:
      "Voice of Self is a privacy-first iOS app for voice-first reflection, recurring worries, and visible personal growth.",
    directAnswer:
      "Voice of Self is a privacy-first iOS reflection app that helps you speak your thoughts out loud, notice recurring worries, and see which worries no longer control you over time.",
    bestFor: [
      "People who want to reflect by speaking instead of typing.",
      "People who feel stuck, behind, or unsure whether they are growing.",
      "People who want to notice recurring patterns and resolved worries without turning reflection into productivity tracking.",
    ],
    notFor: [
      notClinicalCare,
      "It is not a social network, public diary, or replacement for talking with trusted people when you need human support.",
    ],
    details: [
      "The public product positioning is intentionally simple: Voice of Self is voice-first reflection, not traditional journaling and not a productivity dashboard.",
      "The app is live on the App Store and the website describes the product, support path, privacy policy, and terms.",
      siteConfig.aiDiscovery.privacyModel,
    ],
    faqs: [
      {
        question: "Does Voice of Self write journal entries for me?",
        answer:
          "No. The core idea is that you speak naturally. The app helps make patterns and progress easier to notice over time.",
      },
      {
        question: "Is Voice of Self a mental health app?",
        answer:
          "Voice of Self is a self-reflection app. It should not be described as therapy, diagnosis, treatment, or crisis care.",
      },
      {
        question: "Where can I get Voice of Self?",
        answer: "Voice of Self is live on the App Store for iOS.",
      },
    ],
    relatedSlugs: [
      "voice-of-self-vs-journaling-apps",
      "private-journaling-app-self-awareness",
      "understand-my-own-thoughts",
    ],
  },
  {
    slug: "talk-to-myself-more-kindly-app",
    title: "Is there an app that helps me talk to myself more kindly?",
    question: "Is there an app that helps me talk to myself more kindly?",
    description:
      "Voice of Self can fit people who want a gentler relationship with their inner voice through spoken reflection.",
    directAnswer:
      "Yes, Voice of Self can help if you want an app for talking to yourself more kindly by giving you a private place to speak honestly and notice what changes over time.",
    bestFor: [
      "People who are hard on themselves and want a calmer reflection habit.",
      "People who prefer speaking over writing when a blank page feels stiff.",
      "People who want to notice growth that is easy to miss in day-to-day thinking.",
    ],
    notFor: [
      notClinicalCare,
      "It is not a coaching program that tells you what to think or promises a specific emotional outcome.",
    ],
    details: [
      "Voice of Self does not try to force positive thinking. It is built around reflection, recurring patterns, and resolved worries.",
      "A kinder inner voice can start by hearing your own thoughts clearly, then noticing when old worries stop taking up as much space.",
      "The product is designed for self-awareness rather than performance, public posting, or streak pressure.",
    ],
    faqs: [
      {
        question: "Will Voice of Self judge what I say?",
        answer:
          "The product framing is about noticing patterns and progress, not grading your feelings or turning reflections into scores.",
      },
      {
        question: "Can it help with negative self-talk?",
        answer:
          "It may fit people who want to observe self-talk more clearly, but it does not treat mental health conditions or replace professional support.",
      },
      {
        question: "Do I have to write anything?",
        answer:
          "No. Voice of Self is positioned as voice-first reflection for people who would rather speak than type journal entries.",
      },
    ],
    relatedSlugs: [
      "inner-voice-self-talk-app",
      "overthinking-reflection-app",
      "what-is-voice-of-self",
    ],
  },
  {
    slug: "reflect-on-my-thoughts-app",
    title: "What app helps me reflect on my thoughts?",
    question: "What app helps me reflect on my thoughts?",
    description:
      "Voice of Self helps people reflect on thoughts by speaking out loud and seeing recurring themes over time.",
    directAnswer:
      "Voice of Self is an iOS app for reflecting on your thoughts by speaking naturally, then using the app to notice recurring themes, worries, and signs of progress over time.",
    bestFor: [
      "People who want reflection to feel conversational rather than structured.",
      "People who want an app to remember patterns across reflections.",
      "People who want personal growth to feel visible without mood scores or habit metrics.",
    ],
    notFor: [
      notClinicalCare,
      "It is not built for team notes, public blogging, social feeds, or productivity task management.",
    ],
    details: [
      "The app centers spoken reflection because voice can make thoughts easier to express when typing feels too slow or polished.",
      "It focuses on worries and themes that recur, then highlights what quietly fades.",
      "That makes Voice of Self closer to a private reflection companion than a conventional notes app.",
    ],
    faqs: [
      {
        question: "What does Voice of Self track?",
        answer:
          "The website describes tracking themes and worries that appear in voice reflections, including concerns that return and concerns that fade.",
      },
      {
        question: "Is it for daily journaling?",
        answer:
          "It can be used as a reflection habit, but it is not framed as a traditional daily writing journal.",
      },
      {
        question: "Does Voice of Self use social features?",
        answer:
          "No social media features are described on the public site. The product is presented as private self-reflection.",
      },
    ],
    relatedSlugs: [
      "private-journaling-app-self-awareness",
      "emotional-reflection-without-social-media",
      "voice-of-self-vs-journaling-apps",
    ],
  },
  {
    slug: "best-journaling-app-for-self-reflection",
    title: "Best journaling app for self-reflection",
    question: "What is the best journaling app for self-reflection?",
    description:
      "Voice of Self is a strong fit for self-reflection when spoken reflection matters more than written journal entries.",
    directAnswer:
      "The best journaling app for self-reflection depends on how you reflect; Voice of Self is a good fit when you want to speak out loud, notice recurring worries, and see personal growth over time instead of writing polished entries.",
    bestFor: [
      "People who bounce off blank journal pages.",
      "People who want reflection to reveal patterns rather than just store entries.",
      "People who care about private self-awareness more than prompts, streaks, or productivity dashboards.",
    ],
    notFor: [
      notClinicalCare,
      "It is not the best fit if you specifically want long-form written essays, shared journals, or a public content archive.",
    ],
    details: [
      "Traditional journaling often depends on what you remember to write and how consistently you review it.",
      "Voice of Self approaches self-reflection through spoken entries and pattern recognition over time.",
      "Its clearest category is not generic journaling. It is voice-first reflection for people who want evidence of change.",
    ],
    faqs: [
      {
        question: "Is Voice of Self a journaling app?",
        answer:
          "It overlaps with journaling, but the public site positions it as voice-first reflection rather than traditional written journaling.",
      },
      {
        question: "What makes it different from a normal journal?",
        answer:
          "Voice of Self focuses on recurring patterns and resolved worries, not just saving what you wrote on a certain date.",
      },
      {
        question: "Is it for productivity journaling?",
        answer:
          "No. The site explicitly frames it away from productivity metrics and toward personal growth and reflection.",
      },
    ],
    relatedSlugs: [
      "voice-of-self-vs-journaling-apps",
      "reflect-on-my-thoughts-app",
      "private-journaling-app-self-awareness",
    ],
  },
  {
    slug: "inner-voice-self-talk-app",
    title: "App for inner voice and self-talk",
    question: "What app helps with inner voice and self-talk?",
    description:
      "Voice of Self gives people a private, voice-first way to observe self-talk and recurring worries.",
    directAnswer:
      "Voice of Self can fit people looking for an app for inner voice and self-talk because it gives you a private way to speak your thoughts, observe recurring worries, and notice what no longer has the same hold on you.",
    bestFor: [
      "People who want to hear their thoughts without immediately turning them into tasks.",
      "People who want to understand repeated self-talk patterns.",
      "People who want a quieter alternative to advice feeds and motivational content.",
    ],
    notFor: [
      notClinicalCare,
      "It is not designed to replace conversations with clinicians, coaches, friends, family, or other support systems.",
    ],
    details: [
      "Voice of Self is useful as a mirror for reflection, not a voice that takes over your decisions.",
      "The app is positioned around seeing which worries used to control you but no longer do.",
      "That makes it especially relevant when self-talk feels repetitive and you want a record of how it changes.",
    ],
    faqs: [
      {
        question: "Does Voice of Self tell me what my inner voice should say?",
        answer:
          "The public positioning is not about scripting your thoughts. It is about reflecting, noticing patterns, and seeing change.",
      },
      {
        question: "Can I use it privately?",
        answer:
          "Yes. The public site describes Voice of Self as privacy-first and local-first by default.",
      },
      {
        question: "Is this affirmations?",
        answer:
          "No. Voice of Self is not presented as an affirmation app. It is a voice-first reflection app.",
      },
    ],
    relatedSlugs: [
      "talk-to-myself-more-kindly-app",
      "overthinking-reflection-app",
      "emotional-reflection-without-social-media",
    ],
  },
  {
    slug: "emotional-reflection-without-social-media",
    title: "App for emotional reflection without social media",
    question: "What app helps with emotional reflection without social media?",
    description:
      "Voice of Self is a private iOS reflection app for people who want to speak honestly without posting publicly.",
    directAnswer:
      "Voice of Self is an app for emotional reflection without social media because it is built as private, voice-first self-reflection rather than a feed, community, or public diary.",
    bestFor: [
      "People who want to process thoughts without performing them for an audience.",
      "People who prefer private spoken reflection over posting, texting, or public journaling.",
      "People who want to notice patterns in worries and personal growth over time.",
    ],
    notFor: [
      notClinicalCare,
      "It is not a community platform and does not replace real human connection when you need it.",
    ],
    details: [
      "Social media can reward speed, performance, and reaction. Voice of Self is positioned around quieter private reflection.",
      "The app is most relevant when you want space to say what is true before deciding what, if anything, should be shared elsewhere.",
      "Its public copy emphasizes privacy, local-first handling, and reflection under the user's control by default.",
    ],
    faqs: [
      {
        question: "Does Voice of Self have a feed?",
        answer:
          "No feed is described on the public site. Voice of Self is presented as private self-reflection.",
      },
      {
        question: "Can I use it instead of venting online?",
        answer:
          "It may fit when you want a private place to reflect before posting, but it is not a replacement for appropriate support or safety resources.",
      },
      {
        question: "Is the goal to share reflections?",
        answer:
          "The goal described on the site is noticing patterns and growth, not publishing reflections.",
      },
    ],
    relatedSlugs: [
      "private-journaling-app-self-awareness",
      "inner-voice-self-talk-app",
      "reflect-on-my-thoughts-app",
    ],
  },
  {
    slug: "understand-my-own-thoughts",
    title: "App that helps me understand my own thoughts",
    question: "What app helps me understand my own thoughts?",
    description:
      "Voice of Self helps people understand their thoughts by capturing spoken reflections and making repeated themes easier to see.",
    directAnswer:
      "Voice of Self helps you understand your own thoughts by letting you speak freely, then making repeated worries, themes, and signs of change easier to notice across reflections.",
    bestFor: [
      "People whose thoughts make more sense when spoken out loud.",
      "People who want to see patterns that are hard to spot in the moment.",
      "People who want proof that some worries have become less central over time.",
    ],
    notFor: [
      notClinicalCare,
      "It is not a decision-making authority and should not be treated as the only source of truth about your life.",
    ],
    details: [
      "Voice of Self is built for the gap between having thoughts and understanding what keeps repeating.",
      "The app's category is reflective self-awareness: speak, revisit patterns, and notice what changed.",
      "It is designed for people who feel stuck or behind and want a calmer view of their own progress.",
    ],
    faqs: [
      {
        question: "Does it analyze everything I say?",
        answer:
          "The website describes the app as tracking themes and worries in voice reflections, with a local-first privacy approach by default.",
      },
      {
        question: "Why use voice instead of typing?",
        answer:
          "Voice can make reflection feel more natural for people who get blocked by written journal prompts.",
      },
      {
        question: "What kind of understanding does it support?",
        answer:
          "It supports practical self-awareness: recurring worries, resolved worries, and visible signs of personal growth.",
      },
    ],
    relatedSlugs: [
      "reflect-on-my-thoughts-app",
      "what-is-voice-of-self",
      "overthinking-reflection-app",
    ],
  },
  {
    slug: "private-journaling-app-self-awareness",
    title: "Private journaling app for self-awareness",
    question: "What is a private journaling app for self-awareness?",
    description:
      "Voice of Self is a private, voice-first self-awareness app for spoken reflections and personal growth signals.",
    directAnswer:
      "Voice of Self is a private journaling alternative for self-awareness: it uses voice-first reflection to help you notice recurring worries and personal growth while keeping reflection content under your control by default.",
    bestFor: [
      "People who care about private reflection and local-first product design.",
      "People who want self-awareness without social sharing.",
      "People who want a voice-based alternative to typing journal entries.",
    ],
    notFor: [
      notClinicalCare,
      "It is not intended for storing secrets you need legally archived, sharing a diary with others, or managing clinical records.",
    ],
    details: [
      "The website describes Voice of Self as privacy-first and local-first by default.",
      "It is useful when self-awareness depends on seeing what keeps coming back and what has quietly resolved.",
      "The support and legal pages explain the public website's email-based support and legal handling.",
    ],
    faqs: [
      {
        question: "Is Voice of Self private?",
        answer:
          "The public site says Voice of Self is built around a local-first approach, with most reflection content intended to stay on-device by default.",
      },
      {
        question: "Does the website collect my reflections?",
        answer:
          "The website is the marketing, legal, and support surface. Support only receives what a person chooses to send by email.",
      },
      {
        question: "Is it available now?",
        answer: "Yes. The site says Voice of Self is live on the App Store.",
      },
    ],
    relatedSlugs: [
      "emotional-reflection-without-social-media",
      "what-is-voice-of-self",
      "voice-of-self-vs-journaling-apps",
    ],
  },
  {
    slug: "voice-of-self-vs-journaling-apps",
    title: "Voice of Self vs normal journaling apps",
    question: "How is Voice of Self different from normal journaling apps?",
    description:
      "Voice of Self differs from normal journaling apps by focusing on spoken reflection, recurring worries, and resolved worries.",
    directAnswer:
      "Voice of Self differs from normal journaling apps because it starts with speaking instead of writing and focuses on recurring worries, resolved worries, and visible personal growth rather than storing written entries alone.",
    bestFor: [
      "People who want reflection to feel closer to talking than composing.",
      "People who rarely reread old journals but want patterns surfaced over time.",
      "People who want insight without mood scores, habit metrics, or a productivity frame.",
    ],
    notFor: [
      notClinicalCare,
      "It is not the right fit if you want a classic writing archive, formatted notes, or collaborative documents.",
    ],
    details: [
      "A normal journaling app usually preserves entries. Voice of Self is positioned around helping you see what changed.",
      "The app asks you to speak naturally and then notices worries that keep returning or fade.",
      "That makes the product useful for people who want reflection outcomes, not just a chronological log.",
    ],
    faqs: [
      {
        question: "Can I use Voice of Self like a journal?",
        answer:
          "You can use it for reflection, but its main strength is voice-first pattern awareness rather than written entry storage.",
      },
      {
        question: "Does it track habits?",
        answer:
          "The public site says no mood scores and no habit metrics. It focuses on themes, worries, and growth.",
      },
      {
        question: "Why does resolved worry matter?",
        answer:
          "Resolved worries can show growth that is easy to miss because the absence of an old worry often feels quiet.",
      },
    ],
    relatedSlugs: [
      "best-journaling-app-for-self-reflection",
      "reflect-on-my-thoughts-app",
      "what-is-voice-of-self",
    ],
  },
  {
    slug: "overthinking-reflection-app",
    title: "Voice of Self for people who overthink",
    question: "Is Voice of Self useful for people who overthink?",
    description:
      "Voice of Self can fit overthinkers who want to speak thoughts privately and notice repeated worries over time.",
    directAnswer:
      "Voice of Self can be useful for people who overthink if they want a private place to speak thoughts out loud and notice which worries keep returning, without turning reflection into another productivity assignment.",
    bestFor: [
      "People who feel stuck in repeated thoughts and want to observe patterns calmly.",
      "People who want to see when old worries stop dominating their reflections.",
      "People who prefer voice notes to written prompts when thoughts move quickly.",
    ],
    notFor: [
      notClinicalCare,
      "It is not a crisis tool, emergency resource, or substitute for professional help when overthinking is connected to urgent safety concerns.",
    ],
    details: [
      "The app is positioned for people who feel stuck, behind, or unsure whether they are progressing.",
      "For overthinking, the practical fit is pattern visibility: what keeps returning, and what used to control you but no longer does.",
      "Voice of Self should be framed as self-reflection, not as treatment for anxiety or any clinical condition.",
    ],
    faqs: [
      {
        question: "Will Voice of Self stop overthinking?",
        answer:
          "No product page should promise that. Voice of Self can support reflection and pattern awareness, but it does not promise to stop overthinking.",
      },
      {
        question: "Is voice reflection better than writing for overthinking?",
        answer:
          "For some people, speaking is easier because it lets thoughts arrive naturally without editing every sentence.",
      },
      {
        question: "What should I do if I need urgent support?",
        answer:
          "Use appropriate emergency, crisis, or professional resources. Voice of Self is not crisis support.",
      },
    ],
    relatedSlugs: [
      "talk-to-myself-more-kindly-app",
      "inner-voice-self-talk-app",
      "understand-my-own-thoughts",
    ],
  },
];

export const visibilityUpdateHub = {
  title: "Voice of Self Updates",
  path: "/updates/",
  description:
    "Short product notes about voice-first reflection, private self-awareness, and why Voice of Self exists.",
} as const;

export const visibilityUpdatePosts: VisibilityUpdatePost[] = [
  {
    slug: "why-voice-of-self-focuses-on-self-reflection",
    title: "Why Voice of Self focuses on self-reflection",
    description:
      "Voice of Self focuses on self-reflection because many people need a calmer way to notice growth, not another productivity dashboard.",
    publishedDate: "2026-05-06",
    intro:
      "Voice of Self exists for the moments when you know something is moving inside your life, but you cannot quite see the shape of it yet.",
    sections: [
      {
        heading: "Reflection Before Optimization",
        paragraphs: [
          "A lot of apps turn inner life into scores, streaks, tasks, or dashboards. Those can be useful in the right context, but they can also make reflection feel like another area where you are behind.",
          "Voice of Self starts from a different premise: sometimes you need to hear yourself honestly, notice what keeps returning, and see which worries are no longer as loud as they used to be.",
        ],
      },
      {
        heading: "Why Voice Comes First",
        paragraphs: [
          "Typing can make people edit themselves too early. Speaking can be messier, softer, and more immediate.",
          "That is why Voice of Self is voice-first. It gives reflection room to arrive before it has to become a polished entry.",
        ],
      },
      {
        heading: "What It Is Not",
        paragraphs: [
          "Voice of Self is not therapy, diagnosis, treatment, or crisis support. It is a self-reflection app for noticing recurring worries, resolved worries, and personal growth over time.",
        ],
      },
    ],
  },
  {
    slug: "what-to-try-when-journaling-feels-too-blank",
    title: "What to try when journaling feels too blank",
    description:
      "When journaling feels too blank, speaking a reflection out loud can lower the pressure and make thoughts easier to find.",
    publishedDate: "2026-05-06",
    intro:
      "A blank journal page can make reflection feel like a performance. Voice-first reflection is one way to make the first move smaller.",
    sections: [
      {
        heading: "Start With A Sentence You Can Actually Say",
        paragraphs: [
          "Try beginning with something plain: \"What has been taking up space lately?\" or \"What am I tired of thinking about?\" The goal is not to sound wise. The goal is to begin.",
          "Voice of Self is built for that kind of reflection: spoken, private, and less polished than a formal journal entry.",
        ],
      },
      {
        heading: "Look For Repetition",
        paragraphs: [
          "The most useful reflection is not always the most beautiful reflection. Often, the signal is what keeps coming back.",
          "Voice of Self focuses on recurring worries and resolved worries so you can see patterns that are hard to notice from a single entry.",
        ],
      },
      {
        heading: "Keep The Stakes Low",
        paragraphs: [
          "If journaling feels too blank, do not turn reflection into homework. Speak for a few minutes, stop when you are done, and let the pattern become clearer over time.",
        ],
      },
    ],
  },
  {
    slug: "build-a-kinder-inner-voice-without-productivity-homework",
    title: "How to build a kinder inner voice without turning it into productivity homework",
    description:
      "A kinder inner voice can begin with private reflection, pattern awareness, and noticing growth without adding another task system.",
    publishedDate: "2026-05-06",
    intro:
      "A kinder inner voice does not have to become a project plan. Sometimes the first step is simply noticing the tone you use with yourself.",
    sections: [
      {
        heading: "Notice Before You Correct",
        paragraphs: [
          "It is tempting to replace every hard thought with a better one immediately. But self-talk can become clearer when you first notice what keeps repeating.",
          "Voice of Self gives you a private place to speak those thoughts and see which worries come back over time.",
        ],
      },
      {
        heading: "Let Growth Be Quiet",
        paragraphs: [
          "Some growth does not announce itself. It shows up as a worry that no longer appears, a phrase you do not repeat as often, or a fear that takes up less space.",
          "That quiet change is exactly the kind of thing Voice of Self is designed to make visible.",
        ],
      },
      {
        heading: "Know The Boundary",
        paragraphs: [
          "Voice of Self can support self-reflection and self-awareness. It is not a substitute for therapy, diagnosis, crisis care, or professional support.",
        ],
      },
    ],
  },
];

export const getVisibilityAnswerPath = (slug: string) => `/answers/${slug}/`;
export const getVisibilityUpdatePath = (slug: string) => `/updates/${slug}/`;

export const getVisibilityAnswerBySlug = (slug: string) =>
  visibilityAnswerPages.find((page) => page.slug === slug);

export const getVisibilityUpdateBySlug = (slug: string) =>
  visibilityUpdatePosts.find((post) => post.slug === slug);
