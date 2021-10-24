import { RESET_EDITOR_INDICATOR, SET_EDITOR_INDICATOR } from '@constants';
import { useNode } from '@craftjs/core';
import { debounce } from 'helpers';
import { SyncDispatch } from 'interfaces';
import { useCallback, useEffect } from 'react';
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

  const setIndicators = useCallback(
    (dom: HTMLElement) => {
      const { x, y, width, height } = dom.getBoundingClientRect();

      dispatch({
        type: SET_EDITOR_INDICATOR,
        payload: { x, y, width, height },
      });
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isSelected || !dom) {
      return;
    }

    setIndicators(dom);

    const debounced = debounce(setIndicators, 16);

    const onResize = () => {
      debounced(dom);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      dispatch({ type: RESET_EDITOR_INDICATOR });
    };
  }, [isSelected, dom, dispatch, setIndicators]);

  return <>{render}</>;
};
