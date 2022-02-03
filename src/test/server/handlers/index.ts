import {authHandlers} from './auth';
import {issuesHandlers} from './issues';
import {projectsHandlers} from './projects';
import {usersHandlers} from './users';

export const handlers = [
    ...authHandlers,
    ...issuesHandlers,
    ...projectsHandlers,
    ...usersHandlers,
];
