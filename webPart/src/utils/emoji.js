const emojis = ['😀', '😎', '🤓', '🦁', '🐯', '🐼', '🐨', '🐸', '🦊', '🦉']

export const generateRandomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)]
} 