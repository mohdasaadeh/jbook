import { useActionCreators } from "../hooks";
import { Cell } from "../redux";

interface ControlBarProps {
  cell: Cell;
}

const ControlBar: React.FC<ControlBarProps> = ({ cell }) => {
  const { id } = cell;

  const { deleteCell, moveCell } = useActionCreators();

  return (
    <div>
      <button onClick={() => moveCell(id, "up")}>Up</button>
      <button onClick={() => moveCell(id, "down")}>Down</button>
      <button onClick={() => deleteCell(id)}>Close</button>
    </div>
  );
};

export default ControlBar;
