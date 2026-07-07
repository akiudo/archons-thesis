export const author = {
  displayName: 'Akiudo Suzume',
  lodestoneCharacterId: '42042305',
  portraitUrl: 'img/author/akiudo-portrait.jpg',
  world: 'Lich [Light]',
  githubUrl: 'https://github.com/controvi',
};

export function getLodestoneUrl() {
  if (!author.lodestoneCharacterId) {
    return null;
  }
  return `https://eu.finalfantasyxiv.com/lodestone/character/${author.lodestoneCharacterId}/`;
}
