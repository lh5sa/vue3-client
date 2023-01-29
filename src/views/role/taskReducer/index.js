"use strict";

import { useReducer } from "@/shared";
import initState from "./state";
import actions from "./actions";

export * from "./actionTypes";
export const taskReducer = useReducer(initState, actions);
export { initState, actions };
