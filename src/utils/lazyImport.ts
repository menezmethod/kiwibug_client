import * as React from 'react';

 // eslint-disable-next-line
export function lazyImport<T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I
>({ factory, name }: { factory: () => Promise<I>; name: K; }): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");