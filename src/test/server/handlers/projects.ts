import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { API_URL } from '@/config';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';

type DiscussionBody = {
  title: string;
  body: string;
};

export const projectsHandlers = [
  rest.get(`${API_URL}/projects`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const result = db.project.findMany({
        where: {
          teamId: {
            equals: user.teamId,
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

  rest.get(`${API_URL}/projects/:projectId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { projectId } = req.params;
      const result = db.project.findFirst({
        where: {
          id: {
            equals: projectId,
          },
          teamId: {
            equals: user.teamId,
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

  rest.post<DiscussionBody>(`${API_URL}/projects`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      requireAdmin(user);
      const result = db.project.create({
        teamId: user.teamId,
        id: nanoid(),
        createdAt: Date.now(),
        ...data,
      });
      persistDb('project');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.patch<DiscussionBody>(`${API_URL}/projects/:projectId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      const { projectId } = req.params;
      requireAdmin(user);
      const result = db.project.update({
        where: {
          teamId: {
            equals: user.teamId,
          },
          id: {
            equals: projectId,
          },
        },
        data,
      });
      persistDb('project');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.delete(`${API_URL}/projects/:projectId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { projectId } = req.params;
      requireAdmin(user);
      const result = db.project.delete({
        where: {
          id: {
            equals: projectId,
          },
        },
      });
      persistDb('project');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
