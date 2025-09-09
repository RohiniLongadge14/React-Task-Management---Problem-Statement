import { useState } from 'react'
import './App.css'

function App() {
  // define state for single task
  const [task, setTask] = useState({
    taskAssigneeName: "",
    taskName: "",
    taskPriority: "None",
    taskStatus: "None"
  });

  // state for task list
  const [taskList, setTaskList] = useState([]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTask((old) => ({
      ...old,
      [name]: value
    }));
  };

  const [editIndex, setEditIndex] = useState(null);

  const addUpdateTask = (e) => {
    e.preventDefault();
    // add task into list
    if (editIndex === null) {
      setTaskList((oldList) => [...oldList, task]);
    } else {
      const updated = [...taskList]
      updated[editIndex] = task;
      setTaskList(updated);

      setEditIndex(null);
    }

    resetForm();
  };

  const resetForm = () => {
    setTask({
      taskAssigneeName: "",
      taskName: "",
      taskPriority: "None",
      taskStatus: "None"
    });
  };

  const deleteTask = (index) => {
    const updateTaskList = taskList.filter((task, i) => i !== index);
    setTaskList(updateTaskList);
  };

  const showTask = (index) => {
    setTask(taskList[index]);
    setEditIndex(index);
  };


  const priorityCount = {
    Low: taskList.filter((t) => t.taskPriority === "Low").length,
    Medium: taskList.filter((t) => t.taskPriority === "Medium").length,
    High: taskList.filter((t) => t.taskPriority === "High").length,
  };

  const statusCount = {
    Inprogress: taskList.filter((t) => t.taskStatus === "Inprogress").length,
    Done: taskList.filter((t) => t.taskStatus === "Done").length,
  }

  const priorityColors ={
    Low : "green",
    Medium : "yellow",
    High : "red",
  };

  const statusColors ={
    Inprogress : "blue",
    Done : "Green",
  };

  return (
    <>
    <h3>Add/Edit Task</h3>
      <form onSubmit={addUpdateTask}>
        Task Assignee Name :
        <input
          type="text"
          name="taskAssigneeName"
          value={task.taskAssigneeName}
          onChange={inputHandler}
        />
        <br /> <br />

        Task Name :
        <input
          type="text"
          name="taskName"
          value={task.taskName}
          onChange={inputHandler}
        />
        <br /> <br />

        Task Priority :
        <select name='taskPriority' value={task.taskPriority} onChange={inputHandler}>
          <option  value="None">None</option>
          <option style={{color : priorityColors.Low}} value="Low">Low</option>
          <option style={{color : priorityColors.Medium}} value="Medium">Medium</option>
          <option style={{color : priorityColors.High}} value="High">High</option>
        </select>
        <br /> <br />

        Task Status :
        <select name='taskStatus' value={task.taskStatus} onChange={inputHandler}>
          <option value="None">None</option>
          <option style={{color : statusColors.Inprogress}} value="Inprogress">Inprogress</option>
          <option style={{color: statusColors.Done}} value="Done">Done</option>
        </select>
        <br /> <br />

        <button class="add" type="submit">{editIndex === null ? "Add" : "Update"}</button>
      </form>

      < hr />
      {
        taskList.length > 0 ? (
          <table border={1}>
            <thead>
              <tr>
                <th>#</th>
                <th>Task Assignee Name</th>
                <th>Task Name</th>
                <th>Task Priority</th>
                <th>Task Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                taskList.map((tsk, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{tsk.taskAssigneeName}</td>
                    <td>{tsk.taskName}</td>
                    <td style={{color: priorityColors[tsk.taskPriority]}}>{tsk.taskPriority}</td>
                    <td style={{color : statusColors[tsk.taskStatus]}}>{tsk.taskStatus}</td>
                    <td>
                      <button class='delete' onClick={() => deleteTask(index)}> Delete</button>
                      <button class='show' onClick={() => showTask(index)}>Show</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          <p>No task yet.....</p>
        )
      }
<hr />
      <h3>Priority Count</h3>
      <p style={{color : priorityColors.Low}}>Low : {priorityCount.Low}</p>
      <p style={{color : priorityColors.Medium}}>Medium : {priorityCount.Medium}</p>
      <p style={{color : priorityColors.High}}>High : {priorityCount.High}</p>
<hr />
      <h3>Status Count</h3>
      <p style={{ color : statusColors.Inprogress}}>Inprogress : {statusCount.Inprogress}</p>
      <p style={{color : statusColors.Done}}>Done : {statusCount.Done}</p>
    </>
  );
}

export default App
