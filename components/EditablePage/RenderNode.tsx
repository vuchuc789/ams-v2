import { RESET_EDITOR_INDICATOR, SET_EDITOR_INDICATOR } from '@constants';
import { useNode } from '@craftjs/core';
import { SyncDispatch } from 'interfaces';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface RenderNodeProps {
  render: React.ReactElement;
}

export const RenderNode: React.ComponentType<RenderNodeProps> = ({
  render,
}: RenderNodeProps) => {
  const dispatch = useDispatch<SyncDispatch>();

  const { isHovered, dom } = useNode((node) => ({
    isHovered: node.events.hovered,
    dom: node.dom,
  }));

  useEffect(() => {
    if (!isHovered || !dom) {
      return;
    }

    const { x, y, width, height } = dom.getBoundingClientRect();

    dispatch({ type: SET_EDITOR_INDICATOR, payload: { x, y, width, height } });

    return () => {
      dispatch({ type: RESET_EDITOR_INDICATOR });
    };
  }, [isHovered, dom, dispatch]);

  return <>{render}</>;
};
