import { ADD_PAGES, SET_PAGES } from '@constants';
import { SyncAction } from 'interfaces';

interface PageState {
  pages: { name: string; slug: string }[];
}

const initialState: PageState = { pages: [] };

const pageReducer = (
  state = initialState,
  { type, payload }: SyncAction<PageState>,
): PageState => {
  switch (type) {
    case SET_PAGES:
      return { ...state, ...payload };
    case ADD_PAGES:
      return { ...state, pages: [...state.pages, ...(payload?.pages || [])] };
    default:
      return state;
  }
};

export default pageReducer;
