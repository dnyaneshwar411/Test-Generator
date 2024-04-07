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

const liveTestInitialState = {
  testDuration: -1,
  questions: [],
  activeQuestionNo: -1,
  activeQuestion: {},
  userResponses: []
}

function liveTestReducer(state = liveTestInitialState, action) {
  switch (action.type) {
    case "liveTest/fetch-test":
      return { ...state, ...action.payload };

    case "liveTest/set-currentQuestion":
      return { ...state, activeQuestionNo: action.payload, activeQuestion: state.questions[action.payload - 1] }
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    liveTest: liveTestReducer
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

// function for test reducer
export function fetchTest(id) {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3000/test/gettest/${id}`);
    const data = await response.json()
    dispatch({ type: "liveTest/fetch-test", payload: data.test })
  }
}

export function setCurrentQuestion(id) {
  return { type: "liveTest/set-currentQuestion", payload: id }
}

// created store

store.dispatch(checkIfUserLoggedIn());