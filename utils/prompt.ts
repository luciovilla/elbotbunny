export type SongType = { title: string; lyrics: string }[] | undefined;

export function generatePrompt(topic: string, song: SongType) {
  return `Generate lyrics in the style of Bad Bunny about ${topic}${
    song ? ` and base it on this context: ${song[0].lyrics}.` : "."
  }`;
}
