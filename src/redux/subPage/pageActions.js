import axios from 'axios';
import { getUrl } from '../../utils';
import { setLoading } from '../loading/loadingActions';
import { fetchBooks } from '..';
import { fetchPage } from '../page/pageActions';

export const addSubPage = (book, page, title, slug, filename, content) => {
  return (dispatch) => {
    const data = { title, slug, filename, content };
    dispatch(setLoading(true));
    axios
      .post(getUrl(`/api/book/${book}/page/${page}/sub-page`), data)
      .then(() => {
        dispatch(fetchBooks());
        dispatch(fetchPage(book, page));
        return dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };
};
