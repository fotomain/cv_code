import { setHeaderTitleAction } from '../actions';
import reducer, { appInitialState } from './app_reducer';

describe(`[reducers] app reducer`, () => {
  it(`reduces ${setHeaderTitleAction.name} correctly`, () => {
    const state = reducer(appInitialState, setHeaderTitleAction('New header'));
    expect(state.title).toEqual('New header');
  });
});
