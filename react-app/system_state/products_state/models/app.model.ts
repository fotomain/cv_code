import {TJSONValue} from "./global_types";

export interface IAppState {
  title: string;

  //APP_ACTION_STEP_4
  memo_data?:TJSONValue,
  yesno_window_data?:TJSONValue,
  yesno_dialog_opened?:boolean,
  progress_dialog_opened?:boolean,
  progress_dialog_closed?:boolean,

  progress_linear?: TJSONValue;
  progress_circlular?: TJSONValue;
}

