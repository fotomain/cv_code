
export type TJSONAny =
    | string
    | number
    | boolean
    | JSONObjectAny
    | JSONArrayAny
    | any;

interface JSONObjectAny {
    [x: string]: TJSONAny;
}

interface JSONArrayAny extends Array<TJSONAny> { }

// ==================
// ==================
// ==================

//CART_ACTION_STEP_11

export type TJSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;



interface JSONObject {
    [x: string]: TJSONValue;
}

interface JSONArray extends Array<TJSONValue> { }

