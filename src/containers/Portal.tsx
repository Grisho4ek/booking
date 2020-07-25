import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  id: string;
}

export const Portal: React.FC<Props> = ({ children, id }) => {
  return createPortal(children, document.getElementById(id) as HTMLElement);
};
