import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import axios from "axios";
import Swal from "sweetalert2";

import Layout from "../components/Layout";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { TodoType } from "../utils/types/todos";

import Header from "../components/Header";
import { useTitle } from "../utils/hooks/title";
import { Modal } from "../components/Modal";

const Homepage = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [inputTask, setInputTask] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [idTask, setIdtask] = useState<number>();
  useTitle("Home - Todo List App");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("https://api.todoist.com/rest/v2/tasks", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  function handleAddTask(e: any) {
    const body = {
      content: inputTask,
    };
    e.preventDefault();
    axios
      .post("https://api.todoist.com/rest/v2/tasks", body, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then(() => {
        alert("Berhasil menambahkan todo");
        navigate(0);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed add new task",
        });
      });
  }

  function handleEditTask(id: number) {
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks/${id}`,
        {
          content: editContent,
        },
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TODO_API}` },
        }
      )
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Update task successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed update task",
        });
      });
  }

  function handleDeleteTask(id: number) {
    axios
      .delete(`https://api.todoist.com/rest/v2/tasks/${id}`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Delete task successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed delete task",
        });
      });
  }

  function onClickDetail(id: number) {
    navigate(`/detail/${id}`);
  }

  return (
    <Layout>
      <div className="rounded-2xl w-full flex flex-col p-6 bg-white  shadow-xl mb-3 font-sans font-semibold">
        <Header />
        <form action="" onSubmit={(e) => handleAddTask(e)}>
          <Input
            id="input-task"
            label="Insert a new task"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
          />
          <Button label="Add Task" className="bg-white text-black w-[10%]" />
        </form>
      </div>
      <div className="mt-5 flex justify-center w-full">
        <div className="flex flex-col w-3/4 ">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-orange-200">
                  <thead className="bg-orange-600">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-bold text-left text-white  w-[40%]"
                      >
                        Tasks
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-bold text-left text-white  w-[40%]"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-bold text-center text-white  w-[10%]"
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-bold text-center text-white  w-[10%]"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  {todos ? (
                    todos.map((item) => {
                      return (
                        <>
                          <tbody className="divide-y divide-orange-200">
                            <tr>
                              <td
                                className="px-6 py-4 text-sm font-medium text-black whitespace-nowrap w-[40%]"
                                onClick={() => onClickDetail(item.id)}
                              >
                                {item.content.substring(0, 45)}
                              </td>
                              <td
                                className="px-6 py-4 text-sm text-black whitespace-nowrap w-[40%]"
                                onClick={() => onClickDetail(item.id)}
                              >
                                {item.is_completed === false ? (
                                  <p>Not Complete</p>
                                ) : (
                                  <p>Complete</p>
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap w-[10%]">
                                <label
                                  htmlFor={`my-modal-2`}
                                  className={`normal-case text-pink-airbnb bg-transparent`}
                                  onClick={() => setIdtask(item.id)}
                                >
                                  <div className="flex flex-col items-center justify-center cursor-pointer">
                                    <BiEditAlt
                                      size={20}
                                      className="text-black"
                                    />
                                  </div>
                                </label>
                                <Modal
                                  label="Content"
                                  no={2}
                                  titleModal={"Update Todo"}
                                  input1={
                                    <Input
                                      id="edit-task"
                                      className="text-black mt-5"
                                      onChange={(e) =>
                                        setEditContent(e.target.value)
                                      }
                                      placeholder={`Edit Content`}
                                      label={""}
                                    />
                                  }
                                  tombol1={"Cancel"}
                                  tombol2={"Save"}
                                  onClick={() =>
                                    handleEditTask(idTask ? idTask : item.id)
                                  }
                                  type={"text"}
                                />
                              </td>
                              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap w-[10%]">
                                <div className="flex flex-col items-center justify-center cursor-pointer">
                                  <MdDeleteForever
                                    size={20}
                                    className="text-black"
                                    onClick={() => handleDeleteTask(item.id)}
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
