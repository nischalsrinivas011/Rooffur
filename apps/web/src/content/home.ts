import {
  Briefcase,
  Cake,
  CalendarCheck,
  CalendarDays,
  CircleCheck,
  CircleHelp,
  Clock,
  Dog,
  Flag,
  Handshake,
  Heart,
  House,
  IndianRupee,
  LifeBuoy,
  Lock,
  MapPin,
  MessageCircle,
  MessagesSquare,
  PawPrint,
  Pill,
  Plane,
  Plus,
  Search,
  SquarePen,
  type LucideIcon,
} from "lucide-react";

/**
 * Approved homepage copy (Epic E1 — WhatsApp community website, as
 * simplified by "E1-S02 — Visual Storytelling & Content Simplification").
 * Change wording only with Product Owner approval.
 *
 * Visual-first rule: if an icon, diagram or illustration already says it,
 * don't repeat it in a paragraph. Detailed explanations live in the FAQs.
 *
 * Content rules: no fake names, profiles, ratings, counts, timestamps or
 * activity; no safety guarantees (police verification, background checks,
 * insurance, certified Hosts, verified homes, guaranteed care).
 */

type IconLabel = { label: string; icon: LucideIcon };
type IconItem = { title: string; caption: string; icon: LucideIcon };

export const hero = {
  eyebrow: "Pet care built around trust",
  heading: "Find people you can trust to care for your pet.",
  supporting: "Meet pet lovers nearby, get to know them, and choose care that feels right.",
  emotionalLine: "Someone you trust, for someone you love.",
  primaryCta: "Find Pet Care",
  secondaryCta: "Become a Host",
  channelNote: "Rooffur currently connects Pet Parents and Hosts through WhatsApp.",
} as const;

export const whatIsRooffur = {
  eyebrow: "What is Rooffur?",
  heading: "People helping people care for pets.",
  petParent: { label: "Pet Parent", caption: "Needs care", icon: PawPrint },
  host: { label: "Pet lover / Host", caption: "Open to helping", icon: House },
  journey: [
    { label: "Talk", icon: MessageCircle },
    { label: "Meet", icon: Handshake },
    { label: "Decide", icon: Heart },
  ] satisfies IconLabel[],
  emphasis: "Rooffur helps you connect. You decide who feels right.",
} as const;

export const howItWorks = {
  eyebrow: "How Rooffur works",
  heading: "Meet before you decide.",
  supporting: "From first hello to feeling comfortable — take it one step at a time.",
  steps: [
    { title: "Join", caption: "Join the community", icon: MessagesSquare },
    { title: "Share", caption: "Tell people what you need", icon: MapPin },
    { title: "Discover", caption: "Find people who may fit", icon: Search },
    { title: "Meet", caption: "Get to know each other", icon: Handshake },
    { title: "Decide", caption: "Move forward only if it feels right", icon: Heart },
  ] satisfies IconItem[],
  /** MEET is emphasised: it is Rooffur's core trust step (talk → meet → decide). */
  featuredStep: "Meet",
  featuredLabel: "Build trust here",
  /** Caption over the closing Meet & Greet photo. */
  photoCaption: "Talk. Meet. Decide together.",
} as const;

export const findPetCare = {
  eyebrow: "For Pet Parents",
  heading: "Need someone to look after your pet?",
  supporting: "Find pet lovers nearby and get to know them before deciding.",
  situationsLabel: "Common situations",
  situations: [
    { label: "Travelling", icon: Plane },
    { label: "Work", icon: Briefcase },
    { label: "Weekend away", icon: CalendarDays },
    { label: "Unexpected plans", icon: LifeBuoy },
    { label: "Occasional help", icon: Clock },
  ] satisfies IconLabel[],
  shareHeading: "Help people understand what your pet needs",
  shareItems: [
    { label: "Pet type & breed", icon: Dog },
    { label: "Age", icon: Cake },
    { label: "General area", icon: MapPin },
    { label: "Dates", icon: CalendarDays },
    { label: "Temperament", icon: Heart },
    { label: "Other-pet compatibility", icon: PawPrint },
    { label: "Food / medication", icon: Pill },
    { label: "Anything important", icon: Plus },
  ] satisfies IconLabel[],
  cta: "Find Pet Care on WhatsApp",
} as const;

export const becomeAHost = {
  eyebrow: "Become a Host",
  heading: "Love having pets around? Open your home to one.",
  supporting: "You choose the pets, the schedule and the arrangement that works for you.",
  benefits: [
    {
      title: "Choose your pets",
      caption: "Species, size and temperament are up to you.",
      icon: PawPrint,
    },
    { title: "Your schedule", caption: "Host only when it works for you.", icon: CalendarCheck },
    { title: "Free or paid", caption: "Help for free or set your own price.", icon: IndianRupee },
    {
      title: "Meet first",
      caption: "Both sides decide before anything is agreed.",
      icon: Handshake,
    },
  ] satisfies IconItem[],
  cta: "Become a Host on WhatsApp",
} as const;

export const whatsappModel = {
  eyebrow: "Rooffur on WhatsApp",
  heading: "Rooffur lives where conversations already happen.",
  supporting: "Join the community, share what you need, and connect directly.",
  /** Illustrative only: no names, photos, timestamps, read receipts or counts. */
  example: {
    label: "Example conversation",
    chatTitle: "Rooffur — Find Pet Care",
    request: "Looking for someone to care for my Labrador from 25–28 Oct.",
    area: "Indiranagar",
    replies: ["I may be able to help.", "Happy to meet you both first!"],
  },
  steps: [
    { title: "Join", caption: "Enter the community", icon: MessageCircle },
    { title: "Share", caption: "Tell people what you need", icon: SquarePen },
    {
      title: "Connect",
      caption: "Continue privately when it feels relevant",
      icon: Handshake,
    },
  ] satisfies IconItem[],
  cta: "Join Rooffur on WhatsApp",
} as const;

export const freeOrPaid = {
  heading: "Hosting can be free or paid.",
  options: [
    {
      amount: "₹0",
      title: "Host for the love of pets",
      caption: "Some Hosts simply enjoy having pets around.",
      icon: Heart,
    },
    {
      amount: "₹ You decide",
      title: "Set your own price",
      caption: "Hosts and Pet Parents agree directly.",
      icon: IndianRupee,
    },
  ],
  commission: "Rooffur commission: ₹0",
  clarification: "Rooffur does not currently process payments.",
} as const;

export const community = {
  eyebrow: "Rooffur Community",
  heading: "Pet people helping pet people.",
  supporting: "Care, questions, recommendations and everything in between.",
  examplesLabel: "Example community conversations",
  examples: [
    { text: "What should I ask someone before leaving my dog with them?", icon: CircleHelp },
    { text: "Any good pet-friendly places around here?", icon: MapPin },
    { text: "My dog gets anxious when I travel. What has helped yours?", icon: Heart },
    { text: "Anyone interested in a weekend dog meetup?", icon: Dog },
  ],
  cta: "Join the Rooffur Community",
} as const;

export const trust = {
  eyebrow: "Trust & Safety",
  heading: "Trust is built before the stay begins.",
  supporting: "Take the time to talk, meet and decide together.",
  principles: [
    { title: "Meet first", caption: "Get comfortable before agreeing.", icon: Handshake },
    {
      title: "Ask questions",
      caption: "Talk about routines, behaviour and care.",
      icon: MessageCircle,
    },
    {
      title: "Both sides choose",
      caption: "Either person can decide not to proceed.",
      icon: CircleCheck,
    },
    {
      title: "Protect your information",
      caption: "Keep sensitive details out of public conversations.",
      icon: Lock,
    },
    {
      title: "Report concerns",
      caption: "Stop and report anything that feels inappropriate.",
      icon: Flag,
    },
  ] satisfies IconItem[],
  notice:
    "Rooffur helps people discover and connect. Pet Parents and Hosts are responsible for deciding whether an arrangement is right for them.",
} as const;

/** FAQs stay text-led: this is where detailed explanations live. */
export const faqs = {
  eyebrow: "FAQs",
  heading: "Questions people often ask.",
  items: [
    {
      question: "What is Rooffur?",
      answer:
        "Rooffur is a community that brings Pet Parents and pet lovers together to build trusted care relationships. You can discover people who may be able to care for your pet, get to know them, arrange a Meet & Greet, and move forward only when both sides feel comfortable.",
    },
    {
      question: "How do I find someone to care for my pet?",
      answer:
        "Join the Rooffur WhatsApp community, share what kind of care you're looking for and connect with people who may be a good fit. We encourage you to talk and meet before deciding.",
    },
    {
      question: "Who can become a Host?",
      answer:
        "Rooffur is designed for pet lovers who are comfortable caring for someone else's pet. You decide which pets you're comfortable with and when you're available.",
    },
    {
      question: "Do Hosts have to charge money?",
      answer: "No. A Host can care for a pet for free or agree on a price with the Pet Parent.",
    },
    {
      question: "Does Rooffur take a commission?",
      answer:
        "Not currently. Rooffur does not process payments or take a commission from care arrangements.",
    },
    {
      question: "Does Rooffur handle the booking or payment?",
      answer:
        "No. Rooffur currently focuses on helping people discover and connect. Any care arrangement or payment is agreed directly between the Pet Parent and Host.",
    },
    {
      question: "Should I meet someone before leaving my pet with them?",
      answer:
        "Yes. We strongly encourage Pet Parents and Hosts to arrange a Meet & Greet and discuss the pet's needs before making a decision.",
    },
    {
      question: "What should I do if something feels wrong?",
      answer:
        "Do not proceed with an arrangement you are uncomfortable with. Stop the conversation when necessary and report concerning behaviour to Rooffur.",
    },
    {
      question: "Do I need a Rooffur account?",
      answer:
        "No. Rooffur does not currently require an account. The community currently connects through WhatsApp.",
    },
    {
      question: "Can I join even if I don't currently need pet care?",
      answer:
        "Yes. Pet lovers are welcome to join the community, share experiences, ask questions and get to know other members.",
    },
  ],
} as const;

export const finalCta = {
  heading: "Pet care works better when you know the people around you.",
  supporting: "Join Pet Parents and pet lovers on Rooffur.",
  cta: "Join Rooffur on WhatsApp",
  secondaryLink: "See how Rooffur works",
} as const;
