import { ADD_PAGES, SELECT_PAGE, SET_PAGES } from '@constants';
import type { AsyncAction } from 'interfaces';
import { addPage, getPages as getPagesFromApi } from 'services';
import { notifyError } from './notification';

export const createPage =
  (name: string): AsyncAction =>
  async (dispatch, getState) => {
    try {
      const {
        auth: { accessToken, loginType },
      } = getState();

      const createdPage = await addPage(name, accessToken, loginType);

      dispatch({ type: ADD_PAGES, payload: { pages: [createdPage] } });
      dispatch({ type: SELECT_PAGE, payload: { selectedPage: createdPage } });
    } catch (e: any) {
      dispatch(notifyError(e.message || 'Fail to create page'));
    }
  };

export const getPages = (): AsyncAction => async (dispatch, getState) => {
  try {
    const {
      page: { pages, selectedPage },
      auth: { accessToken, loginType },
      userInfo: { name },
    } = getState();

    if (pages.length > 0) {
      if (!selectedPage) {
        dispatch({ type: SELECT_PAGE, payload: { selectedPage: pages[0] } });
      }
      return;
    }

    const resPages = await getPagesFromApi(accessToken, loginType);

    if (resPages.length > 0) {
      dispatch({ type: SET_PAGES, payload: { pages: resPages } });
      dispatch({ type: SELECT_PAGE, payload: { selectedPage: resPages[0] } });
      return;
    }

    dispatch(createPage(name ? `${name} Homepage` : 'Homepage'));
  } catch (e: any) {
    dispatch(notifyError(e.message || 'Fail to get pages'));
  }
};
