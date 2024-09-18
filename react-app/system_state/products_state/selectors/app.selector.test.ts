import { root_reducer_initial_state, TStoreState } from '../reducers';
import { getHeaderTitle } from './app_selector';

const state: TStoreState = {
  ...root_reducer_initial_state,
  app: {
    title: 'Hello world',
  },
};

describe(`[selectors] ${getHeaderTitle.name}`, () => {
  it(`should return the correct title for the app`, () => {
    expect(getHeaderTitle(state)).toEqual('Hello world');
  });
});
