import React, { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    inputRef.current && inputRef.current.focus();
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask("");
      saveTasksToLocalStorage(updatedTasks);

      inputRef.current && inputRef.current.focus();
    }
  };

  const handleEditTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const isConfirmed = window.confirm(`Bạn có chắc muốn xóa công việc này?`);
    if (isConfirmed) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
    }
  };

  return (
    <>
      <form className="ListJobs">
        <h1 className="ListJobs-header">Danh sách công việc</h1>
        <div className="Job-input">
          <input
            type="text"
            placeholder="Nhập tên công việc"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            ref={inputRef}
          />
          <button onClick={handleAddTask} className="add">
            Thêm
          </button>
        </div>
        <ul className="job-list">
          {tasks.map((task, index) => (
            <li className="job-item" key={index}>
              <div className="job-content">
                <input type="checkbox" className="job-check" />
                <span className="job-description">{task}</span>
              </div>
              <div className="job-control">
                <EditIcon
                  className="edit"
                  onClick={() => {
                    const updatedTask = prompt("Nhập công việc mới", task);
                    if (updatedTask !== null) {
                      handleEditTask(index, updatedTask);
                    }
                  }}
                />
                <DeleteIcon
                  className="delete"
                  onClick={() => handleDeleteTask(index)}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="jobs-done-container">
          <p className="completed-jobs-text">Công việc đã hoàn thành</p>
        </div>
      </form>
    </>
  );
};

export default TodoList;
