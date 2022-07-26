import { useActionCreators } from "../hooks";

interface InsertBarProps {
  id: string | null;
}

const InsertBar: React.FC<InsertBarProps> = ({ id }) => {
  const { insertCell } = useActionCreators();

  return (
    <div>
      <button onClick={() => insertCell(id, "code")}>Code</button>
      <button onClick={() => insertCell(id, "text")}>Text</button>
    </div>
  );
};

export default InsertBar;
