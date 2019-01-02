import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

//action type
const GET_USER = "GET_USER";

const GET_ALL_TOOLS = "GET_ALL_TOOLS";

const ADD_TOOL = "ADD_TOOL";

const REMOVE_TOOL = "REMOVE_TOOL";

//action creator
const gotMe = user => ({
  type: GET_USER,
  user
});

const addTool = newTool => ({
  type: ADD_TOOL,
  newTool
});

const getTools = tools => ({
  type: GET_ALL_TOOLS,
  tools
});

const removeTool = toolId => ({
  type: REMOVE_TOOL,
  toolId
});

//thunks
export const removeToolFromCollection = toolId => dispatch => {
  return axios
    .delete("/api/removeTool", { data: { id: toolId } })
    .then(dispatch(removeTool(toolId)))
    .catch(console.error.bind(console));
};

export const addToolToDB = tool => dispatch => {
  return axios
    .post("/api/addTools", tool)
    .then(dispatch(addTool(tool)))
    .catch(console.error.bind(console));
};

export const getUsersTools = () => dispatch => {
  return axios
    .get("/api/allTools")
    .then(res => res.data.tools)
    .then(tools => dispatch(getTools(tools)))
    .catch(console.error.bind(console));
};

export const getMe = () => dispatch => {
  return axios
    .get("/auth/me")
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export const login = formData => dispatch => {
  return axios
    .put("/auth/login", formData)
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export const logout = () => dispatch => {
  return axios
    .delete("/auth/logout")
    .then(() => dispatch(gotMe(initialState.user)))
    .catch(console.error.bind(console));
};

//initial state
const initialState = {
  user: {},
  tools: []
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user
      };
    case GET_ALL_TOOLS:
      return {
        ...state,
        tools: action.tools
      };
    case ADD_TOOL:
      return {
        ...state,
        tools: [...state.tools, action.newTool]
      };
    case REMOVE_TOOL:
      return {
        ...state,
        tools: state.tools.filter(tool => tool.id !== action.toolId)
      };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
