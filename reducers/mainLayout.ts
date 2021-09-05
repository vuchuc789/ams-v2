import type { SyncAction } from 'interfaces';
import {
  ADD_TO_DROPDOWN,
  REMOVE_FROM_DROPDOWN,
  TOGGLE_SIDER,
} from '@constants';

interface MainLayoutState {
  siderCollapsed: boolean;
  dropdownMenu: {
    title: string;
    action?: () => void;
  }[];
}

const initialState: MainLayoutState = {
  siderCollapsed: false,
  dropdownMenu: [],
};

const mainLayoutReducer = (
  state = initialState,
  { type, payload }: SyncAction<MainLayoutState>,
): MainLayoutState => {
  switch (type) {
    case TOGGLE_SIDER:
      return {
        ...state,
        siderCollapsed: !state.siderCollapsed,
      };
    case ADD_TO_DROPDOWN:
      if (!payload?.dropdownMenu) {
        return state;
      }
      return {
        ...state,
        dropdownMenu: state.dropdownMenu.length
          ? [...payload.dropdownMenu, { title: '' }, ...state.dropdownMenu] // add split line
          : payload.dropdownMenu,
      };
    // remove previous addition
    case REMOVE_FROM_DROPDOWN:
      const splitLinePosition = state.dropdownMenu.findIndex((item) => {
        return item.title === '';
      });
      return {
        ...state,
        dropdownMenu:
          splitLinePosition >= 0
            ? state.dropdownMenu.slice(splitLinePosition + 1) // remove even split line
            : [],
      };
    default:
      return state;
  }
};

export default mainLayoutReducer;
