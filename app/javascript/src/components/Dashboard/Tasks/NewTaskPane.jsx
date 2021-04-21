import React from "react";
import { Pane } from "neetoui";
import NewTaskForm from "./NewTaskForm";

const NewTaskPane = ({ fetchTasks, showNewTaskPane, setShowNewTaskPane }) => {
  const onClose = () => setShowNewTaskPane(false)
  return (
    <Pane
      title="Add new task"
      isOpen={showNewTaskPane}
      onClose={onClose}
    >
      <div className="p-5">
        <NewTaskForm onClose={onClose} refetch={fetchTasks}/>
      </div>
    </Pane>
  );
};

export default NewTaskPane;