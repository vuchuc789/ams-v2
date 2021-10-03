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
}) => {
  const dispatch = useDispatch<SyncDispatch>();

  const { isSelected, dom } = useNode((node) => ({
    isSelected: node.events.selected,
    dom: node.dom,
  }));

  useEffect(() => {
    if (!isSelected || !dom) {
      return;
    }

    const { x, y, width, height } = dom.getBoundingClientRect();

    dispatch({ type: SET_EDITOR_INDICATOR, payload: { x, y, width, height } });

    return () => {
      dispatch({ type: RESET_EDITOR_INDICATOR });
    };
  }, [isSelected, dom, dispatch]);

  return <>{render}</>;
};
