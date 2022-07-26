import ControlBar from "./ControlBar";
import Code from "./Code";
import TextEditor from "./TextEditor";
import InsertBar from "./InsertBar";
import { Cell } from "../redux";
import "./styles/cell-item.css";

interface CellItemProps {
  cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  let child: JSX.Element;

  const { id, type } = cell;

  if (type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ControlBar cell={cell} />
        </div>
        <Code cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ControlBar cell={cell} />
        </div>
        <TextEditor cell={cell} />
      </>
    );
  }

  return (
    <div className="cell-list-item">
      {child}
      <InsertBar id={id} />
    </div>
  );
};

export default CellItem;
