import * as React from 'react';

import { Head } from '../Head';
import { MainLayout } from './MainLayout';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  <Head title={title} />;
  return (
    <div>
      {children}
    </div>
  );
};
