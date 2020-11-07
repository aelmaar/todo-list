import { useState, useReducer, useEffect, useRef } from "react";
import Modal from "./Modal";
import Item from "./Item";
import soundJob from "./sound-job.mp3";
import { LinearProgress, Box, Typography } from "@material-ui/core";
import { reducer } from "./reducer";
import "./App.css";

const defaultState = {
  list: [],
  isModalOpen: false,
  modalContent: "",
  color: false,
};

const addToLocalStorage = () => {
  return localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : [];
};

function App() {
  const [toDo, setToDo] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [progress, setProgress] = useState(0);
  const finishTasks = useRef();

  useEffect(() => {
    const items = addToLocalStorage();
    let val = 0;
    items.forEach((item) => {
      if (item.checked) val += item.value;
    });
    setProgress(val);
    dispatch({ type: "load", payload: items });
  }, []);
  useEffect(() => {
    const separValue = 100 / state.list.length;
    const items = addToLocalStorage();
    const addSeparValue = items.map((item) => {
      item.value = separValue;
      return item;
    });
    localStorage.setItem("item", JSON.stringify(addSeparValue));
  }, [state.list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (toDo) {
      dispatch({
        type: "add_item",
        payload: { id: new Date().getTime().toString(), toDo },
      });
      const items = addToLocalStorage();
      items.push({
        id: new Date().getTime().toString(),
        toDo,
        checked: false,
        value: 0,
      });
      localStorage.setItem("item", JSON.stringify(items));
      setToDo("");
    } else dispatch({ type: "no_val" });
  };

  const closeModal = () => {
    dispatch({ type: "close_modal" });
  };
  const handleRemove = (id) => {
    dispatch({ type: "remove_item", payload: id });
    const items = addToLocalStorage();
    const filterItems = items.filter((item) => item.id !== id);
    localStorage.setItem("item", JSON.stringify(filterItems));
  };
  const handleEdit = (id, editName) => {
    dispatch({ type: "edit_item", payload: { id, editName } });
    const items = addToLocalStorage();
    const editItems = items.map((item) => {
      if (item.id === id) item.toDo = editName;
      return item;
    });
    localStorage.setItem("item", JSON.stringify(editItems));
  };
  const handleChecked = (id, checked) => {
    const items = addToLocalStorage();
    const addChecked = items.map((item) => {
      if (item.id === id) item.checked = checked;
      return item;
    });
    let val = 0;
    addChecked.forEach((item) => {
      if (item.checked) val += item.value;
    });
    setProgress(val);
    if (val >= 100) finishTasks.current.play();
    localStorage.setItem("item", JSON.stringify(addChecked));
  };
  const handleClear = () => {
    dispatch({ type: "clear_items" });
    localStorage.removeItem("item");
    setProgress(0);
  };
  const handleValue = () => {
    dispatch({ type: "no_val" });
  };

  return (
    <div className="app">
      <div>
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(
              progress
            )}%`}</Typography>
          </Box>
        </Box>
        <audio src={soundJob} ref={finishTasks}></audio>
        <div className="app__addItem">
          <h1>todo list</h1>
          <div className="app__modal">
            {state.isModalOpen && <Modal {...state} closeModal={closeModal} />}
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="add note (ex:learn science)"
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
            />
            <button type="submit">add</button>
          </form>
        </div>
        <div className={`${state.list.length > 8 && "app__items"}`}>
          {state.list.map((item) => (
            <Item
              key={item.id}
              {...item}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
              handleChecked={handleChecked}
              handleValue={handleValue}
            />
          ))}
        </div>
        <div className="app__clear">
          {state.list.length > 0 && (
            <button className="app__btnClear" onClick={handleClear}>
              Clear Items
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
