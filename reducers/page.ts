import { ADD_PAGES, SELECT_PAGE, SET_PAGES } from '@constants';
import { SyncAction } from 'interfaces';

interface PageState {
  pages: { name: string; slug: string }[];
  selectedPage?: { name: string; slug: string };
}

const initialState: PageState = { pages: [] };

const pageReducer = (
  state = initialState,
  { type, payload }: SyncAction<PageState>,
): PageState => {
  switch (type) {
    case SET_PAGES:
      return { ...state, pages: payload?.pages || [] };
    case ADD_PAGES:
      return { ...state, pages: [...state.pages, ...(payload?.pages || [])] };
    case SELECT_PAGE:
      return { ...state, selectedPage: payload?.selectedPage };
    default:
      return state;
  }
};

export default pageReducer;
