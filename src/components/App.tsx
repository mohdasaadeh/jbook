import React from "react";
import { Provider } from "react-redux";
import "bulmaswatch/superhero/bulmaswatch.min.css";

import CellList from "./CellList";
import { store } from "../redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

export default App;
