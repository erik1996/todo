import { FC, FormEvent, useState } from "react";
import { Item } from "../../components/Item";
import { IItem, StatusEnum } from "../../type";

export const HomePage: FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [list, setList] = useState<IItem[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    list.push();
    setList([
      ...list,
      { title: inputText, status: StatusEnum.TO_DO, id: ++list.length },
    ]);
    setInputText("");
  };

  const handleRemove = (id: number) => {
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
  };

  const handleUpdate = (id: number, status: StatusEnum) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        item.status = status;
      }
      return item;
    });
    setList(updatedList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="add-item"
          type="text"
          value={inputText}
          pattern=".{3,20}"
          title="3 characters minimum and 20 maximum"
          placeholder="Add New Item "
          required
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {list.map((i) => (
          <Item
            key={i.id}
            title={i.title}
            status={i.status}
            id={i.id}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
        ))}
      </ul>
    </div>
  );
};
