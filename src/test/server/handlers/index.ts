import { authHandlers } from './auth';
import { commentsHandlers } from './issues';
import { discussionsHandlers } from './projects';
import { teamsHandlers } from './teams';
import { usersHandlers } from './users';

export const handlers = [
  ...authHandlers,
  ...commentsHandlers,
  ...discussionsHandlers,
  ...teamsHandlers,
  ...usersHandlers,
];
