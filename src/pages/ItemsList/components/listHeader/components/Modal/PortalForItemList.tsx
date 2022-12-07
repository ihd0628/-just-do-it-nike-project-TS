import { ReactNode } from 'react';
import reactDom from 'react-dom';

interface propsTypes {
  children: ReactNode;
}

const ModarlPortalForItemList = ({ children }: propsTypes) => {
  const el = document.getElementById('modalForItemList');
  return reactDom.createPortal(children, el!);
};

export default ModarlPortalForItemList;
