export const reducer = (state, action) => {
  if (action.type === "load") {
    return { ...state, list: action.payload };
  } else if (action.type === "add_item") {
    return {
      ...state,
      list: [...state.list, action.payload],
      isModalOpen: true,
      modalContent: "Added Successfully",
      color: true,
    };
  } else if (action.type === "no_val") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Please Enter Value",
      color: false,
    };
  } else if (action.type === "close_modal") {
    return { ...state, isModalOpen: false };
  } else if (action.type === "remove_item") {
    return {
      ...state,
      list: state.list.filter((item) => item.id !== action.payload),
      isModalOpen: true,
      modalContent: "Removed Successfully",
      color: true,
    };
  } else if (action.type === "edit_item") {
    return {
      ...state,
      list: state.list.map((item) => {
        if (item.id === action.payload.id) item.toDo = action.payload.editName;
        return item;
      }),
      isModalOpen: true,
      modalContent: "Updated Successfully",
      color: true,
    };
  } else if (action.type === "clear_items") {
    return {
      ...state,
      list: [],
      isModalOpen: true,
      modalContent: "Items Removed",
      color: true,
    };
  }
};
