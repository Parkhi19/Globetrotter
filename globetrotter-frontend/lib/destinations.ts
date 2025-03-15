import type { Destination } from "./types"

// This is a starter dataset that would be expanded with AI tools
// In a real application, this would be stored in a database
export const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    clues: [
      "This city is known as the 'City of Light'.",
      "A famous iron tower dominates its skyline.",
      "It's home to the Louvre, one of the world's most visited museums.",
    ],
    options: ["Paris", "London", "Rome", "New York"],
    correctAnswer: "Paris",
    facts: [
      "The Eiffel Tower was originally built as a temporary structure for the 1889 World's Fair.",
      "Paris has 130 museums and over 450 parks and gardens.",
      "The Louvre houses over 380,000 objects and displays 35,000 works of art.",
    ],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    clues: [
      "This city is the most populous metropolitan area in the world.",
      "It's famous for its cherry blossom season.",
      "It hosted the Summer Olympics twice, most recently in 2021.",
    ],
    options: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
    correctAnswer: "Tokyo",
    facts: [
      "Tokyo has over 200 Michelin-starred restaurants, more than any other city in the world.",
      "The Tokyo Skytree is the tallest tower in the world at 634 meters.",
      "Tokyo's Tsukiji Fish Market was once the largest wholesale fish market in the world.",
    ],
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    clues: [
      "This city is famous for its giant statue of Christ with outstretched arms.",
      "It hosts one of the world's largest carnival celebrations.",
      "It's known for its beautiful beaches like Copacabana and Ipanema.",
    ],
    options: ["Buenos Aires", "Rio de Janeiro", "Lima", "Santiago"],
    correctAnswer: "Rio de Janeiro",
    facts: [
      "The Christ the Redeemer statue stands 30 meters tall and weighs 635 tons.",
      "Rio's Carnival attracts about 2 million people per day to its streets.",
      "The city was founded by Portuguese colonizers in 1565.",
    ],
  },
  {
    id: "sydney",
    name: "Sydney",
    clues: [
      "This city is known for its iconic opera house with sail-shaped shells.",
      "It's the largest city in Australia.",
      "It hosted the Summer Olympics in 2000.",
    ],
    options: ["Melbourne", "Sydney", "Auckland", "Perth"],
    correctAnswer: "Sydney",
    facts: [
      "The Sydney Opera House took 14 years to build and was completed in 1973.",
      "Sydney Harbour Bridge is the world's largest steel arch bridge.",
      "Sydney's Bondi Beach is one of the most famous beaches in the world.",
    ],
  },
  {
    id: "cairo",
    name: "Cairo",
    clues: [
      "This city is located near some of the world's most famous ancient pyramids.",
      "It's the capital of the most populous country in the Arab world.",
      "The Nile River runs through this ancient metropolis.",
    ],
    options: ["Marrakech", "Dubai", "Cairo", "Istanbul"],
    correctAnswer: "Cairo",
    facts: [
      "Cairo is home to Al-Azhar University, one of the oldest universities in the world, founded in 970 CE.",
      "The Great Pyramid of Giza, located just outside Cairo, is the only surviving structure of the Seven Wonders of the Ancient World.",
      "Cairo's Egyptian Museum contains over 120,000 items, including the treasures of Tutankhamun.",
    ],
  },
  {
    id: "newyork",
    name: "New York City",
    clues: [
      "This city is known as 'The Big Apple'.",
      "It's home to a famous statue that was a gift from France.",
      "Its central park covers over 840 acres.",
    ],
    options: ["Chicago", "New York City", "Los Angeles", "Toronto"],
    correctAnswer: "New York City",
    facts: [
      "More than 800 languages are spoken in New York City, making it the most linguistically diverse city in the world.",
      "The New York City subway system has 472 stations, the most of any subway system in the world.",
      "Wall Street, located in New York City, was originally a wall built by Dutch settlers in 1653 to protect against British and Native American attacks.",
    ],
  },
  {
    id: "venice",
    name: "Venice",
    clues: [
      "This city is built on more than 100 small islands in a lagoon.",
      "Instead of roads, it has canals, including the famous Grand Canal.",
      "It's known for its gondolas, a traditional flat-bottomed rowing boat.",
    ],
    options: ["Amsterdam", "Venice", "Copenhagen", "Stockholm"],
    correctAnswer: "Venice",
    facts: [
      "Venice has approximately 400 bridges connecting its 118 islands.",
      "The city is sinking at a rate of 1-2 millimeters per year.",
      "Venice's carnival tradition dates back to the 12th century and is famous for its elaborate masks.",
    ],
  },
  {
    id: "kyoto",
    name: "Kyoto",
    clues: [
      "This city was the imperial capital of Japan for more than 1,000 years.",
      "It's known for its numerous classical Buddhist temples and gardens.",
      "It was spared from bombing during World War II due to its cultural significance.",
    ],
    options: ["Osaka", "Kyoto", "Hiroshima", "Nagasaki"],
    correctAnswer: "Kyoto",
    facts: [
      "Kyoto has over 1,600 Buddhist temples and 400 Shinto shrines.",
      "The Gion district in Kyoto is famous for geishas, traditional Japanese female entertainers.",
      "Kyoto's Kinkaku-ji (Golden Pavilion) is covered in gold leaf and is one of Japan's most iconic landmarks.",
    ],
  },
  {
    id: "marrakech",
    name: "Marrakech",
    clues: [
      "This city is known for its vibrant red buildings and walls.",
      "Its medina is a UNESCO World Heritage site filled with maze-like alleys.",
      "It features a famous market square called Jemaa el-Fnaa.",
    ],
    options: ["Casablanca", "Marrakech", "Fez", "Tangier"],
    correctAnswer: "Marrakech",
    facts: [
      "Marrakech is known as the 'Red City' due to the color of its buildings and walls.",
      "The Majorelle Garden in Marrakech was owned by fashion designer Yves Saint Laurent.",
      "Marrakech's medina contains the largest traditional Berber market in Morocco.",
    ],
  },
  {
    id: "santorini",
    name: "Santorini",
    clues: [
      "This island destination is known for its white-washed buildings with blue domes.",
      "It was formed by one of the largest volcanic eruptions in recorded history.",
      "It's famous for its stunning sunsets viewed from the village of Oia.",
    ],
    options: ["Mykonos", "Santorini", "Crete", "Rhodes"],
    correctAnswer: "Santorini",
    facts: [
      "Santorini's volcanic eruption around 1600 BCE may have contributed to the legend of Atlantis.",
      "The island's unique architecture was designed to provide protection from the strong winds.",
      "Santorini produces distinctive wine from grapes grown in volcanic soil, with vines trained into basket shapes to protect them from wind.",
    ],
  },
]

