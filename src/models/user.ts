export const AVATARS = [
  'ant',
  'beaver',
  'bee',
  'beetle',
  'bird',
  'black-bird',
  'black-cat',
  'blowfish',
  'boar',
  'buffalo',
  'bull',
  'butterfly',
  'camel',
  'cat',
  'caterpillar',
  'chick-bis',
  'chicken',
  'chipmunk',
  'cow',
  'crab',
  'crocodile',
  'deer',
  'dodo',
  'dog',
  'dolphin',
  'dove',
  'dragon',
  'duck',
  'eagle',
  'elephant',
  'fish',
  'flamingo',
  'fly',
  'ghost',
  'giraffe',
  'goat',
  'goose',
  'gorilla',
  'hatching-chick',
  'hedgehog',
  'hippopotamus',
  'horse',
  'jellyfish',
  'kangaroo',
  'koala',
  'ladybug',
  'leopard',
  'lizard',
  'llama',
  'mammoth',
  'monkey',
  'mouse',
  'octopus',
  'octopus-bis',
  'orangutan',
  'otter',
  'owl',
  'parrot',
  'peacock',
  'penguin',
  'pig',
  'poodle',
  'rabbit',
  'ram',
  'rat',
  'rhinoceros',
  'robot',
  'robot-bis',
  'rooster',
  'sauropod',
  'seal',
  'shark',
  'sheep',
  'shrimp',
  'skunk',
  'sloth',
  'snail',
  'snake',
  'snowman',
  'spider',
  'spouting-whale',
  'swan',
  't-rex',
  'tiger',
  'tropical-fish-bis',
  'turkey',
  'turtle',
  'two-humped-camel',
  'unicorn',
  'whale-bis',
] as const;

export type Avatar = typeof AVATARS[number];

export type UserId = string;

export type Profile = {
  pseudo: string;
  avatar: Avatar;
};

export type User = {
  id: UserId;
  profile?: Profile;
};
