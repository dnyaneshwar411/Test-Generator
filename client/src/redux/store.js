import { configureStore } from "@reduxjs/toolkit";

const userInitialState = {
  _id: "",
  name: "",
  email: "",
  division: "",
  isLoggedIn: false
}

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case "user/logInUser":
      return {
        _id: action.payload._id || "",
        name: action.payload.name || "",
        email: action.payload.email || "",
        division: action.payload.division || "",
        isLoggedIn: true
      }

    case "user/logout":
      return { ...userInitialState };

    case "user/null":
      return state;

    default:
      return state;
  }
}

const createTestInitialState = {
  questions: [],
  passingScore: null,
  totalScore: null,

}

function createTestReducer(state = createTestInitialState, action) {
  switch (action.type) {
    case "createTest/":
      break;

    default:
      break;
  }
}

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export function checkIfUserLoggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return { type: "user/null" }
  return { type: "user/logInUser", payload: user }
}

export function logout() {
  return async function (dispatch) {
    localStorage.setItem("user", null);
    dispatch({ type: "user/logout" })
  }
}

store.dispatch(checkIfUserLoggedIn());