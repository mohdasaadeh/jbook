import ControlBar from "./ControlBar";
import Code from "./Code";
import TextEditor from "./TextEditor";
import InsertBar from "./InsertBar";
import { Cell } from "../redux";

interface CellItemProps {
  cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  let CellComponent: React.FC;

  const { id, type } = cell;

  if (type === "code") {
    CellComponent = Code;
  } else {
    CellComponent = TextEditor;
  }

  return (
    <div>
      <ControlBar cell={cell} />
      <CellComponent />
      <InsertBar id={id} />
    </div>
  );
};

export default CellItem;
