import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./App.css";
import Calendar from "./components/calendar/Calendar";

function App() {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
}

export default App;
