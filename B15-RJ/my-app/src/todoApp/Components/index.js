import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";
const URL = "https://6319968e8e51a64d2be76eed.mockapi.io/todos";

export default function Home() {
  const [todos, setTodos] = useState(null);
  const [error, seterror] = useState(null);
  const [valueName, setvalueName] = useState("");
  const [valueDes, setValueDes] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setisEdit] = useState(null);

  useEffect(() => {
    getListTodo();
  }, []);

  // get list todo from server
  const getListTodo = async () => {
    setLoading(true);
    try {
      const result = await axios.get(URL);
      setLoading(false);
      setTodos(result.data);
    } catch (error) {
      setLoading(false);
      seterror("Có lỗi xảy ra");
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${URL}/${id}`);
      resetData();
    } catch (error) {
      setLoading(false);
      seterror("Có lỗi xảy ra");
    }
  };

  const addItem = async () => {
    try {
      setLoading(true);
      await axios.post(URL, {
        name: valueName,
        isCheck: false,
        description: valueDes,
      });
      resetData();
    } catch (error) {
      setLoading(false);
      seterror("Có lỗi xảy ra");
    }
  };
  const editTodo = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${URL}/${id}`, {
        name: valueName,
        isCheck: false,
        description: valueDes,
      });
      resetData();
    } catch (error) {
      setLoading(false);
      seterror("Có lỗi xảy ra");
    }
  };
  const resetData = () => {
    setLoading(false);
    setvalueName("");
    setValueDes("");
    setisEdit(null);
    getListTodo();
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nhập name</Form.Label>
          <Form.Control
            onChange={(text) => {
              setvalueName(text.target.value);
            }}
            value={valueName}
            type="text"
            placeholder="Nhập name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nhập description</Form.Label>
          <Form.Control
            onChange={(text) => {
              setValueDes(text.target.value);
            }}
            value={valueDes}
            type="text"
            placeholder="Nhập description"
          />
        </Form.Group>

        {isEdit ? (
          <Button onClick={() => editTodo(isEdit)} variant="success">
            Edit
          </Button>
        ) : (
          <Button onClick={addItem} variant="primary">
            Add
          </Button>
        )}
      </Form>
      {loading ? <p>Loading...</p> : null}
      <ul>
        {todos ? (
          todos.map((item, index) => {
            return (
              <li
                onDoubleClick={() => {
                  setvalueName(item.name);
                  setValueDes(item.description);
                  setisEdit(item.id);
                }}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#f8f8f8",
                  margin: "10px",
                  padding: "10px",
                }}
                key={index}
              >
                {isEdit && isEdit === item.id ? (
                  <input value={valueName} type="text" />
                ) : (
                  <div>
                    <p>
                      {item.name} -{" "}
                      <span
                        onClick={() => deleteItem(item.id)}
                        className="deleteData"
                      >
                        Delete
                      </span>
                    </p>
                    <i>{item.description}</i>
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <p>Loading</p>
        )}
      </ul>

      {error && <p>{error}</p>}
    </div>
  );
}
