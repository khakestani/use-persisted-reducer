import React, { useEffect, useReducer, useRef } from "react";
import Cookies from "universal-cookie";
import SET_FULL_STATE from "./constant";
import middleware from "./middleware";
import storageObject from "./storage";

const usePersistedReducer = (key, reducer, init, _storage = "local", options) => {
  const { step = 1000, ...cookieOption } = options || {};
  console.log("usePersistedReducer -> cookieOption", cookieOption);
  const interval = useRef();
  let storage;
  try {
    switch (_storage) {
      case "local":
        storage = localStorage;
        beark;
      case "session":
        storage = sessionStorage;
        break;
      case "cookie":
        storage = new Cookies();
        break;
    }
  } catch (e) {}

  const [state, dispatch] = useReducer(middleware(reducer), null, () => {
    const d = storageObject.get(key, init, storage);
    console.log("usePersistedReducer -> d", d);
    return d;
  });
  const stateRef = useRef(state);

  useEffect(() => {
    if (_storage === "cookie") {
      interval.current = setInterval(() => {
        if (JSON.stringify(storage.get(key)) !== JSON.stringify(stateRef.current)) {
          dispatch({ type: SET_FULL_STATE, payload: storageObject.get(key, init, storage) });
        }
      }, step);
    } else {
      window.addEventListener("storage", ({ key: evKey, newValue }) => {
        if (evKey === key) {
          dispatch({ type: SET_FULL_STATE, payload: JSON.parse(newValue) });
        }
      });
    }
    () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    stateRef.current = state;
    storageObject.set(key, state, storage, cookieOption);
  }, [state]);

  return [state, dispatch];
};

export default usePersistedReducer;
