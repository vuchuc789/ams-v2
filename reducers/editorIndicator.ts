import { SET_EDITOR_INDICATOR, RESET_EDITOR_INDICATOR } from '@constants';
import { SyncAction } from 'interfaces';

interface EditorIndicatorState {
  x: number;
  y: number;
  width: number;
  height: number;
}

const initialState: EditorIndicatorState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const editorIndicatorRefsReducer = (
  state = initialState,
  { type, payload }: SyncAction<EditorIndicatorState>,
): EditorIndicatorState => {
  switch (type) {
    case SET_EDITOR_INDICATOR:
      return { ...state, ...payload };
    case RESET_EDITOR_INDICATOR:
      return initialState;
    default:
      return state;
  }
};

export default editorIndicatorRefsReducer;
