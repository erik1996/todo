import { FC, useMemo } from "react";
import { IItem, StatusEnum } from "../../type";
import "./index.css";

interface ItemProps extends IItem {
  handleRemove: (id: number) => void;
  handleUpdate: (id: number, status: StatusEnum) => void;
}

export const Item: FC<ItemProps> = ({
  title,
  status,
  id,
  handleRemove,
  handleUpdate,
}) => {
  const bgColor = useMemo(() => {
    let bg = "yellow";
    switch (status) {
      case StatusEnum.TO_DO:
        bg = "yellow";
        break;
      case StatusEnum.IN_PROGRESS:
        bg = "blue";
        break;
      case StatusEnum.DONE:
        bg = "green";
        break;
    }
    return bg;
  }, [status]);

  return (
    <li className="item-container" style={{ background: bgColor }}>
      <span>{title}</span>
      <select
        aria-label="status"
        onChange={(e) => handleUpdate(id, e.target.value as StatusEnum)}
      >
        {Object.values(StatusEnum).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button onClick={() => handleRemove(id)}>Remove</button>
    </li>
  );
};
