
import { createReducer } from '@reduxjs/toolkit';
import {
    MEMO_DATA_ACTION,
    PROGRESS_DIALOG_OPEN_ACTION,
    setHeaderTitleAction,
    YESNO_DIALOG_OPEN_ACTION,
    YESNO_WINDOW_ACTION,
} from '../actions';
import { IAppState } from '../models/app.model';

export const appInitialState: IAppState = {
    title: 'Product list',
    //APP_ACTION_STEP_3
    memo_data:{},
    yesno_window_data:{},
    yesno_dialog_opened:false,
    progress_dialog_opened:false,
    progress_dialog_closed:false,
};

export default createReducer(appInitialState, (builder) =>
  builder.addCase(setHeaderTitleAction, (state:any, { payload }:any) => ({
    ...state,
    title: payload,
  }))

  .addCase(YESNO_DIALOG_OPEN_ACTION, (state:any, { payload }:any ) => ({
    ...state,
      yesno_dialog_opened: payload.new_value,

  }))
  //APP_ACTION_STEP_2
  .addCase(MEMO_DATA_ACTION, (state:any, { payload }:any ) => ({
    ...state,
      memo_data: {...state.memo_data, ...payload},
  }))
  .addCase(YESNO_WINDOW_ACTION, (state:any, { payload }:any ) => ({
    ...state,
      yesno_window_data: payload.new_value,
  }))
  .addCase(PROGRESS_DIALOG_OPEN_ACTION, (state:any, { payload }:any ) => ({
    ...state,
      progress_dialog_opened: payload.new_value,
      progress_dialog_closed: !payload.new_value,
  }))
    ,
);
