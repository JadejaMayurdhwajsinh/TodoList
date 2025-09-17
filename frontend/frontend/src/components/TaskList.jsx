import TaskItem from "./TaskItem";

function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;
