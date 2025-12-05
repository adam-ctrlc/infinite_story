export const stories = [
  {
    id: 1,
    title: "The Neon City Rain",
    snippet:
      "The rain in Neo-Tokyo never seemed to stop. It washed away the grime of the lower levels but left the neon reflections shimmering on the black pavement like spilled oil. Kaito adjusted his collar...",
    author: "kaito_runner",
    likes: 124,
    comments: 45,
    timestamp: "2h ago",
    category: "Cyberpunk",
    continuations: [
      {
        id: 101,
        author: "glitch_hunter",
        content:
          "The hex codes swirled around me, forming a tunnel. I reached out, my fingers brushing against pure data. It felt cold, like liquid nitrogen.",
        timestamp: "1d ago",
        likes: 45,
      },
      {
        id: 102,
        author: "sys_admin",
        content:
          "I tried to log out, but the command terminal just laughed at me. 'User not found,' it blinked. But I was right here. wasn't I?",
        timestamp: "18h ago",
        likes: 22,
      },
    ],
  },
  {
    id: 2,
    title: "Whispers in the Code",
    snippet:
      "I found the glitch on a Tuesday. It wasn't a syntax error or a missing semicolon. It was a voice. Buried deep within the kernel logs, a sequence of binary that translated to 'Help us'.",
    author: "dev_null",
    likes: 892,
    comments: 120,
    timestamp: "5h ago",
    category: "Mystery",
    continuations: [
      {
        id: 201,
        author: "neon_drifter",
        content:
          "Kaito ignored the cold. He had a job to do. The package was heavy in his pocket, a small drive containing the source code for the city's AI.",
        timestamp: "1h ago",
        likes: 88,
      },
    ],
  },
  {
    id: 3,
    title: "The Last Coffee Shop",
    snippet:
      "In a world of synthetics and replicated nutrients, 'Joe's Brew' was an anomaly. Real beans. Real water. And a real old man behind the counter who claimed to remember the taste of the sun.",
    author: "retro_lover",
    likes: 56,
    comments: 12,
    timestamp: "12h ago",
    category: "Sci-Fi",
  },
  {
    id: 4,
    title: "Orbit 7",
    snippet:
      "Standard patrol. Orbit 7 was supposed to be quiet. Just space junk and satellites. But when the radar pinged a massive shadow passing behind the moon, I knew my shift was about to get interesting.",
    author: "star_gazer",
    likes: 340,
    comments: 89,
    timestamp: "1d ago",
    category: "Sci-Fi",
  },
  {
    id: 5,
    title: "The Forgotten Library",
    snippet:
      "Dust motes danced in the single beam of light. Books, actual paper books, lined the shelves from floor to ceiling. I ran my finger along a spine, feeling the texture of history.",
    author: "book_worm",
    likes: 210,
    comments: 34,
    timestamp: "1d ago",
    category: "Fantasy",
  },
  {
    id: 6,
    title: "Digital Ghost",
    snippet:
      "They say once you upload, you lose your soul. I don't know about that. But I do know that since the transfer, I've started dreaming in hex codes.",
    author: "cyber_ghost",
    likes: 156,
    comments: 28,
    timestamp: "2d ago",
    category: "Horror",
  },
];

export function getStoryById(id) {
  return stories.find((story) => story.id === parseInt(id));
}
