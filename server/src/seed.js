import dotenv from "dotenv";
import mongoose from "mongoose";
import { Cat, Question } from "./index.js";

dotenv.config();

// Placeholder images — swap these `url` values for real, properly licensed
// photos (self-hosted or from a source you have rights to use) before this
// goes anywhere public. Keeping the field populated now means the UI and
// <img> layout can be built and tested immediately, instead of blocked on
// sourcing final art. The previous version of this script left `images: []`
// on every cat, which is why nothing rendered.
function placeholderImage(seed, label) {
  return {
    url: `https://placehold.co/800x600/2c1e13/ede1c4?font=source-serif-pro&text=${encodeURIComponent(
      label
    )}`,
    caption: `${label} — placeholder image, replace with a real photo`,
  };
}

const cats = [
  {
    commonName: "Lion",
    scientificName: "Panthera leo",
    description:
      "The lion is the only big cat that lives in social groups, called prides, usually made up of related females, their cubs, and a small number of resident males. Manes, found only on males, darken and grow fuller with age and testosterone.",
    habitat: "African savanna and grassland, with a small population in India's Gir Forest",
    diet: "Carnivore — zebra, wildebeest, buffalo, and other large grazing animals",
    conservationStatus: "Vulnerable",
    funFacts: [
      "Lions are the only cats that live in social groups called prides.",
      "A lion's roar can be heard from as far as 8 km (5 miles) away.",
      "Cubs are born with spotted coats that fade as they mature.",
    ],
    images: [placeholderImage("lion", "Lion")],
  },
  {
    commonName: "Tiger",
    scientificName: "Panthera tigris",
    description:
      "The tiger is the largest living cat species, recognizable by its orange coat and black stripes. Unlike most cats, tigers are strong swimmers and often cool off in rivers and pools during hot weather.",
    habitat: "Asian forests, mangroves, and grasslands, from the Russian Far East to Sumatra",
    diet: "Carnivore — deer, wild boar, and other large ungulates",
    conservationStatus: "Endangered",
    funFacts: [
      "No two tigers have the same stripe pattern — it's as unique as a fingerprint.",
      "Tigers are powerful swimmers, unlike most other cat species.",
      "A tiger can eat up to 34 kg (75 lb) of meat in a single sitting.",
    ],
    images: [placeholderImage("tiger", "Tiger")],
  },
  {
    commonName: "Jaguar",
    scientificName: "Panthera onca",
    description:
      "The jaguar is the largest cat in the Americas and has the strongest bite force relative to body size of any big cat. It's unusual among cats for regularly killing prey by piercing the skull directly with its canines.",
    habitat: "Central and South American rainforests, wetlands, and swamps",
    diet: "Carnivore — capybara, caiman, turtles, and other prey, often near water",
    conservationStatus: "Near Threatened",
    funFacts: [
      "Jaguars kill prey with a skull-piercing bite, unlike most cats that go for the throat.",
      "They are excellent swimmers and often hunt in water.",
      "Their rosettes have small dots in the center, which distinguishes them from leopards.",
    ],
    images: [placeholderImage("jaguar", "Jaguar")],
  },
  {
    commonName: "Leopard",
    scientificName: "Panthera pardus",
    description:
      "The leopard is the most widely distributed wild cat, found from sub-Saharan Africa to parts of Asia, in habitats ranging from rainforest to desert. It's known for hauling kills into trees, safely out of reach of scavengers.",
    habitat: "Extremely varied — sub-Saharan Africa and parts of Asia, from rainforest to desert",
    diet: "Carnivore — highly opportunistic, preying on whatever is locally available",
    conservationStatus: "Vulnerable",
    funFacts: [
      "A leopard can carry prey twice its own body weight up into a tree.",
      "It is the most widely distributed wild cat species on Earth.",
      "Leopard rosettes lack the central dot found in jaguar rosettes.",
    ],
    images: [placeholderImage("leopard", "Leopard")],
  },
  {
    commonName: "Snow Leopard",
    scientificName: "Panthera uncia",
    description:
      "The snow leopard lives in the high mountains of Central and South Asia, including the Himalayas. Despite belonging to the genus Panthera, it cannot roar — the structure of its hyoid bone only allows a non-threatening chuffing sound.",
    habitat: "High-altitude mountains of Central and South Asia, including the Himalayas",
    diet: "Carnivore — blue sheep (bharal), ibex, and other mountain ungulates",
    conservationStatus: "Vulnerable",
    funFacts: [
      "Snow leopards can leap as far as 15 meters (50 ft) in a single bound.",
      "Their long, thick tail is used for balance and can be wrapped around the body like a blanket.",
      "Unlike other Panthera cats, snow leopards can't roar due to the shape of their hyoid bone.",
    ],
    images: [placeholderImage("snow-leopard", "Snow Leopard")],
  },
  {
    commonName: "Cheetah",
    scientificName: "Acinonyx jubatus",
    description:
      "The cheetah is the fastest land animal, built for short bursts of extreme speed rather than sustained chases. Distinctive black 'tear-track' markings run from the inner corners of its eyes to its mouth.",
    habitat: "African savanna, with a small remnant population in Iran",
    diet: "Carnivore — gazelle, impala, and other small-to-medium antelope",
    conservationStatus: "Vulnerable",
    funFacts: [
      "Cheetahs can accelerate from 0 to 60 mph (97 km/h) in about 3 seconds.",
      "Their claws are semi-retractable, working like track spikes for grip at high speed.",
      "Unlike other big cats, cheetahs can purr but cannot roar.",
    ],
    images: [placeholderImage("cheetah", "Cheetah")],
  },
  {
    commonName: "Cougar",
    scientificName: "Puma concolor",
    description:
      "Also known as the mountain lion, puma, or panther, the cougar has the widest range of any land mammal in the Americas, from the Canadian Yukon to the southern Andes. It is not part of the genus Panthera and cannot roar.",
    habitat: "Extremely broad — from the Canadian Yukon to the southern Andes",
    diet: "Carnivore — primarily deer, but highly adaptable",
    conservationStatus: "Least Concern",
    funFacts: [
      "The cougar holds the record for the most common names of any animal — over 40 in English alone.",
      "It can leap as high as 5.5 meters (18 ft) vertically.",
      "Cougars can't roar, but produce an unsettling, high-pitched scream.",
    ],
    images: [placeholderImage("cougar", "Cougar")],
  },
];

// relatedCat is resolved to a real ObjectId after cats are inserted (see below).
const questions = [
  // Lion
  {
    relatedCat: "Lion",
    questionText: "What is a group of lions called?",
    options: ["A pack", "A pride", "A clan", "A troop"],
    correctOptionIndex: 1,
    difficulty: "easy",
    explanation: "Lions are the only big cat that lives in social groups, called prides.",
  },
  {
    relatedCat: "Lion",
    questionText: "How far away can a lion's roar be heard?",
    options: ["Up to 1 km", "Up to 8 km", "Up to 25 km", "Up to 50 km"],
    correctOptionIndex: 1,
    difficulty: "medium",
    explanation: "A lion's roar can carry as far as 8 km (about 5 miles).",
  },
  // Tiger
  {
    relatedCat: "Tiger",
    questionText: "Which is the largest living cat species?",
    options: ["Lion", "Jaguar", "Tiger", "Cougar"],
    correctOptionIndex: 2,
    difficulty: "easy",
    explanation: "The tiger is the largest living member of the cat family.",
  },
  {
    relatedCat: "Tiger",
    questionText: "What makes each tiger's stripe pattern unique?",
    options: [
      "It's random and meaningless",
      "It's as unique as a human fingerprint",
      "It changes every year",
      "It's identical within each subspecies",
    ],
    correctOptionIndex: 1,
    difficulty: "medium",
    explanation: "No two tigers share the same stripe pattern — each is unique.",
  },
  // Jaguar
  {
    relatedCat: "Jaguar",
    questionText: "How does a jaguar typically kill its prey?",
    options: [
      "A bite to the throat",
      "A bite through the skull",
      "Suffocation only",
      "A blow from its paw",
    ],
    correctOptionIndex: 1,
    difficulty: "hard",
    explanation:
      "Unlike most cats, jaguars often kill with a bite that pierces the skull directly.",
  },
  {
    relatedCat: "Jaguar",
    questionText: "What tells a jaguar's rosettes apart from a leopard's?",
    options: [
      "Jaguar rosettes have a dot in the center",
      "Jaguar rosettes are always solid black",
      "Jaguars have no rosettes at all",
      "Leopard rosettes are square-shaped",
    ],
    correctOptionIndex: 0,
    difficulty: "hard",
    explanation: "Jaguar rosettes have small dots in the center; leopard rosettes do not.",
  },
  // Leopard
  {
    relatedCat: "Leopard",
    questionText: "What is the leopard known for doing with its kills?",
    options: [
      "Burying them underground",
      "Hauling them up into trees",
      "Sharing them with other leopards",
      "Leaving them in rivers",
    ],
    correctOptionIndex: 1,
    difficulty: "easy",
    explanation: "Leopards often drag prey into trees, keeping it safe from scavengers.",
  },
  {
    relatedCat: "Leopard",
    questionText: "Which big cat has the widest distribution of any wild cat species?",
    options: ["Tiger", "Lion", "Leopard", "Snow Leopard"],
    correctOptionIndex: 2,
    difficulty: "medium",
    explanation:
      "The leopard's range spans sub-Saharan Africa and parts of Asia, wider than any other wild cat.",
  },
  // Snow Leopard
  {
    relatedCat: "Snow Leopard",
    questionText: "Why can't the snow leopard roar, despite being in genus Panthera?",
    options: [
      "It has no vocal cords",
      "The shape of its hyoid bone doesn't allow it",
      "It chooses not to",
      "Only males can roar",
    ],
    correctOptionIndex: 1,
    difficulty: "hard",
    explanation: "The snow leopard's hyoid bone structure means it can only chuff, not roar.",
  },
  {
    relatedCat: "Snow Leopard",
    questionText: "What does a snow leopard use its long tail for?",
    options: [
      "Signaling to other snow leopards only",
      "Balance and as a wrap-around blanket",
      "Digging burrows",
      "Nothing functional — just decoration",
    ],
    correctOptionIndex: 1,
    difficulty: "medium",
    explanation:
      "Its thick tail helps with balance on steep terrain and doubles as insulation when wrapped around the body.",
  },
  // Cheetah
  {
    relatedCat: "Cheetah",
    questionText: "What is the cheetah best known for?",
    options: [
      "Being the strongest big cat",
      "Being the fastest land animal",
      "Being the best swimmer",
      "Being the best climber",
    ],
    correctOptionIndex: 1,
    difficulty: "easy",
    explanation: "The cheetah is the fastest land animal, built for short bursts of speed.",
  },
  {
    relatedCat: "Cheetah",
    questionText: "What can cheetahs do that lions and tigers cannot?",
    options: ["Purr", "Roar", "Retract their claws fully", "Swim"],
    correctOptionIndex: 0,
    difficulty: "hard",
    explanation: "Cheetahs lack the vocal anatomy to roar but, like small cats, can purr.",
  },
  // Cougar
  {
    relatedCat: "Cougar",
    questionText: "Which genus does the cougar belong to?",
    options: ["Panthera", "Felis", "Puma", "Lynx"],
    correctOptionIndex: 2,
    difficulty: "medium",
    explanation: "The cougar belongs to genus Puma, not Panthera, which is why it can't roar.",
  },
  {
    relatedCat: "Cougar",
    questionText: "What is notable about the number of names for the cougar?",
    options: [
      "It has no other names",
      "It has over 40 names in English alone",
      "It only has scientific names",
      "Its name changes based on age",
    ],
    correctOptionIndex: 1,
    difficulty: "hard",
    explanation:
      "The cougar holds the record for the most common names of any animal, including puma, mountain lion, and panther.",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for seeding.");

  await Question.deleteMany({});
  await Cat.deleteMany({});
  console.log("Cleared existing Cat and Question documents.");

  const insertedCats = await Cat.insertMany(cats);
  console.log(`Inserted ${insertedCats.length} cats.`);

  const idByName = new Map(insertedCats.map((cat) => [cat.commonName, cat._id]));

  const questionsWithIds = questions.map((q) => ({
    ...q,
    relatedCat: idByName.get(q.relatedCat),
  }));

  const insertedQuestions = await Question.insertMany(questionsWithIds);
  console.log(`Inserted ${insertedQuestions.length} questions.`);

  await mongoose.disconnect();
  console.log("Done. Disconnected from MongoDB.");
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
