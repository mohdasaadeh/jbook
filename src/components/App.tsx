import React from "react";
import { Provider } from "react-redux";
import "bulmaswatch/superhero/bulmaswatch.min.css";

// import Code from "./Code";
import TextEditor from "./TextEditor";
import { store } from "../redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TextEditor />
    </Provider>
  );
};

export default App;
