import * as React from 'react';

import { Issue } from '@/features/issues';
import { User } from '@/features/users';
import { formatRoleAuth } from '@/utils/format';

import { useAuth } from './auth';

export enum ROLES {
  Admin = 'Admin',
  Manager = 'Manager',
  Lead = 'Lead',
  User = 'User',
}

type RoleTypes = keyof typeof ROLES;

export function isMod(role: string) {
  if (role === 'Admin' || role === 'Manager' || role === 'Lead') {
    return true;
  }
}

export const POLICIES = {
  'issue:delete': (user: User, issue: Issue) => {
    if (user.role === 'Admin') {
      return true;
    } else if (user.role === 'Manager') {
      return true;
    } else if (user.role === 'Lead') {
      return true;
    }

    if (user.role === 'User' && issue.createdBy === user.username) {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user } = useAuth();
  const role = formatRoleAuth(user?.authorities);

  if (!user) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(role);
      }

      return true;
    },
    [role]
  );

  return { checkAccess, role: role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
