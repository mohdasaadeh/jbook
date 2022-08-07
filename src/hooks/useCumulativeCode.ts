import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector(({ cells }) => {
    const orderedCode = cells?.order.map((id) => cells.data[id]);

    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom/client';
    var show = (value) => {
        const root = _ReactDOM.createRoot(
            document.getElementById("root")
            );

        if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
                root.render(value);
            } else {
                root.innerHTML = JSON.stringify(value);
            }
        } else {
            root.innerHTML = value;
        }
    };
  `;
    const showFuncNoOp = "var show = () => {};";

    const cumulativeCode = [];

    if (orderedCode) {
      for (const code of orderedCode) {
        if (code.id === cellId) {
          cumulativeCode.push(showFunc);

          break;
        } else {
          cumulativeCode.push(showFuncNoOp);
        }

        cumulativeCode.push(code.content);
      }
    }

    return cumulativeCode;
  });
};
