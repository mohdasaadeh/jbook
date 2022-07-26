import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../redux";

export const useActionCreators = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
