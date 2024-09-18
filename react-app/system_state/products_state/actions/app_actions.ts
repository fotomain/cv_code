
import { createAction } from '@reduxjs/toolkit';
import {TJSONValue} from "../models/global_types";

const APP_PREFIX = 'APP';

export const setHeaderTitleAction = createAction<string>(
    `APP_${APP_PREFIX}_SET_HEADER_TITLE`,
);

//APP_ACTION_STEP_1
export const MEMO_DATA_ACTION = createAction<TJSONValue>(
    `APP_${APP_PREFIX}MEMO_DATA_ACTION`,
);

export const YESNO_WINDOW_ACTION = createAction<TJSONValue>(
    `APP_${APP_PREFIX}YESNO_WINDOW_ACTION`,
);

export const YESNO_DIALOG_OPEN_ACTION = createAction<TJSONValue>(
    `APP_${APP_PREFIX}YESNO_DIALOG_OPEN_ACTION`,
);
export const PROGRESS_DIALOG_OPEN_ACTION = createAction<TJSONValue>(
    `APP_${APP_PREFIX}PROGRESS_DIALOG_OPEN_ACTION`,
);
