declare module '*.svg' {
  import React from 'react';

  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  export default content;
}

// fcl is a js library, so we need to declare it as a module
declare module '@onflow/fcl';
declare module '@onflow/fcl-wc';
