import { TStoreState } from '../reducers';
import {YESNO_DIALOG_OPEN_ACTION} from "../actions";
import {TJSONValue} from "../models/global_types";

export const getHeaderTitle = (state: TStoreState): string => state.app.title;

//APP_ACTION_STEP_6
export const SEL_MEMO_DATA = (state: TStoreState): TJSONValue =>
    (undefined===state.app.memo_data)?({} as TJSONValue):state.app.memo_data;

export const SEL_PROGRESS_DIALOG_OPEN = (state: TStoreState): boolean =>
    (undefined===state.app.progress_dialog_opened)?false:state.app.progress_dialog_opened;
export const SEL_YESNO_DIALOG_OPENED = (state: TStoreState): boolean =>
    (undefined===state.app.yesno_dialog_opened)?false:state.app.yesno_dialog_opened;

export const SEL_YESNO_WINDOW_DATA = (state: TStoreState): TJSONValue =>
    (undefined===state.app.yesno_window_data)?({} as TJSONValue):state.app.yesno_window_data;

