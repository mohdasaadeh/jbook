import { useActionCreators } from "../hooks";
import "./styles/insert-bar.css";

interface InsertBarProps {
  id: string | null;
  forceVisible?: boolean;
}

const InsertBar: React.FC<InsertBarProps> = ({ id, forceVisible }) => {
  const { insertCell } = useActionCreators();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCell(id, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCell(id, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default InsertBar;
