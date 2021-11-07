import { ADD_PAGES, DELETE_PAGE, SELECT_PAGE, SET_PAGES } from '@constants';
import type { AsyncAction } from 'interfaces';
import {
  addPage,
  getPages as getPagesFromApi,
  savePage,
  deletePage as deletePageFromApi,
} from 'services';
import { notifyError, notifySuccess } from './notification';

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
      dispatch(notifySuccess('Created successfully'));
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

export const selectPage =
  (slug: string, previousContent?: string): AsyncAction =>
  async (dispatch, getState) => {
    const {
      page: { pages, selectedPage },
      auth: { accessToken, loginType },
    } = getState();
    const newSelectedPage = pages.find((page) => slug === page.slug);

    if (!newSelectedPage) {
      return;
    }

    if (!!previousContent && !!selectedPage) {
      try {
        await savePage(
          selectedPage.slug,
          previousContent,
          accessToken,
          loginType,
        );
      } catch (e) {
        dispatch(notifyError('Fail to save previous page'));
      }
    }

    dispatch({
      type: SELECT_PAGE,
      payload: { selectedPage: newSelectedPage },
    });
  };

export const deletePage = (): AsyncAction => async (dispatch, getState) => {
  try {
    const {
      page: { pages, selectedPage },
      auth: { accessToken, loginType },
      userInfo: { name },
    } = getState();

    if (!selectedPage) {
      return;
    }

    const needToCreateNewPage = pages.length <= 1;

    await deletePageFromApi(selectedPage.slug, accessToken, loginType);

    dispatch({ type: DELETE_PAGE });

    if (needToCreateNewPage) {
      dispatch(createPage(name ? `${name} Homepage` : 'Homepage'));
    }
  } catch (e) {
    dispatch(notifyError('Fail to delete previous page'));
  }
};
