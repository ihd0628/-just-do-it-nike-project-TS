import { ReactNode } from 'react';
import reactDom from 'react-dom';

interface PropsTypes {
  children: ReactNode;
}

const ModarlPortalForItemList = ({ children }: PropsTypes) => {
  const el = document.getElementById('modalForItemList');
  return reactDom.createPortal(children, el!);
};

export default ModarlPortalForItemList;
