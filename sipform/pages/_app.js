import "../styles/globals.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../Store/reducers";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log("Others");
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log("Storage errors");
  }
};

const persistedState = loadState();

const store = createStore(
  // persistedState,
  reducer,
  persistedState
);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

function App({ Component, pageProps }) {
  return(
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  );
}
export default App;
