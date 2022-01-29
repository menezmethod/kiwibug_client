import * as faker from 'faker';

type Overrides = Record<string, any>;

export const userGenerator = (overrides?: Overrides) => ({
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  teamId: faker.datatype.uuid(),
  teamName: faker.company.companyName(),
  role: 'ADMIN',
  bio: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const projectGenerator = (overrides?: Overrides) => ({
  id: faker.datatype.uuid(),
  title: faker.company.catchPhrase(),
  body: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const issueGenerator = (overrides?: Overrides) => ({
  id: faker.datatype.uuid(),
  body: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});
