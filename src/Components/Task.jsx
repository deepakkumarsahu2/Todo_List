import React, { useEffect, useState } from "react";
import logo from "../assets/image.png";
import "../App.css";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";

export default function Task() {
  const getLocalItems = () => {
    let list = localStorage.getItem("lists");
    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [showItem, setShowItems] = useState(null);
  const addItems = () => {
    if (!inputValue) {
      alert(`Input Can't be Empty`);
    } else if (inputValue && !toggleBtn) {
      setItems(
        items.map((elem) => {
          if (elem.id === showItem) {
            return { ...elem, name: inputValue };
          }
          return elem;
        })
      );
      setToggleBtn(true);
      setInputValue("");
      setShowItems(null);
    } else {
      const allData = { id: new Date().getTime().toString(), name: inputValue };
      setItems([...items, allData]);
      setInputValue("");
    }
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  const deleteItem = (ind) => {
    const allData = items.filter((elem) => {
      return ind !== elem.id;
    });
    setItems(allData);
  };
  const allClear = () => {
    setItems([]);
  };
  const editItems = (id) => {
    let editItem = items.find((elem) => {
      return id === elem.id;
    });
    setToggleBtn(false);
    setInputValue(editItem.name);
    setShowItems(id);
  };
  return (
    <>
      <div className="container">
        <div className="child-container">
          <div className="image-section">
            <figure>
              <img src={logo} alt="TodoList Image" />
            </figure>
            <figcaption>Add Your Tasks Here </figcaption>
          </div>

          <div className="input-section">
            <input
              type="text"
              name="text"
              id="text"
              autoComplete="off"
              placeholder="Enter your Task"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            {toggleBtn ? (
              <MdOutlineAddCircleOutline
                className="plus-icon"
                onClick={addItems}
              />
            ) : (
              <MdSaveAlt className="plus-icon" onClick={addItems} />
            )}
          </div>

          {items.map((elem) => {
            return (
              <div className="text-holder" key={elem.id}>
                <input type="checkbox" name="" id="" />
                <div className="text">{elem.name}</div>
                <div
                  className="text-icon1"
                  onClick={() => {
                    editItems(elem.id);
                  }}
                >
                  <FaRegEdit />
                </div>
                <div
                  className="text-icon"
                  onClick={() => {
                    deleteItem(elem.id);
                  }}
                >
                  <ImCross />
                </div>
              </div>
            );
          })}

          <div className="btn">
            <button onClick={allClear}>Clear All</button>
          </div>
        </div>
      </div>
    </>
  );
}
