"use strict";

import { useReducer } from "@/shared";
import actions from "./actions.js";
import initState from "./state.js";

export * from "./actionTypes";
export const taskReducer = useReducer(initState, actions);

export { actions, initState };
