// DropDown.js
export default function DropDown({ data, onSelect }) {
  return (
    <div className="dropdown">
      {data?.map((val, index) => (
        <div
          className="dropdown-item"
          key={index}
          onClick={() => onSelect(val)}
        >
          {val}
        </div>
      ))}
    </div>
  );
}
