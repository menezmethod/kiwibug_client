import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { API_URL } from '@/config';

import { db, persistDb } from '../db';
import { requireAuth, delayedResponse } from '../utils';

type CreateIssueBody = {
  body: string;
  issueId: string;
};

export const issuesHandlers = [
  rest.get(`${API_URL}/issues`, (req, res, ctx) => {
    try {
      requireAuth(req);
      const issueId = req.url.searchParams.get('issueId') || '';
      const result = db.issue.findMany({
        where: {
          issueId: {
            equals: issueId,
          },
        },
      });
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.post<CreateIssueBody>(`${API_URL}/issues`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      const result = db.issue.create({
        authorId: user.id,
        id: nanoid(),
        createdAt: Date.now(),
        ...data,
      });
      persistDb('issue');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.delete(`${API_URL}/issues/:issueId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { issueId } = req.params;
      const result = db.issue.delete({
        where: {
          id: {
            equals: issueId,
          },
          ...(user.role === 'USER' && {
            authorId: {
              equals: user.id,
            },
          }),
        },
      });
      persistDb('issue');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
