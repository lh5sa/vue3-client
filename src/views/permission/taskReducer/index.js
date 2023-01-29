import initState from "./states.js";
import actions from "./actions";
import { useReducer } from "@/shared";

export * from "./actionTypes.js";

export const taskReducer = useReducer(initState, actions);
export { initState, actions };
