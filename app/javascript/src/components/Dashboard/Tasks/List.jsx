import React, { useState, useEffect } from 'react';
import { Checkbox, Badge, Button } from "neetoui";
import DeleteTask from './DeleteTask';


const List = ({ tasks, selectedTaskIds, setSelectedTaskIds, setShowDeleteAlert }) => {

  const isSelected = (id) => selectedTaskIds.includes(id);

  const onSelectingTaskCheckbox = (event, id) => {
    event.stopPropagation();
    const index = selectedTaskIds.indexOf(id);

    if (index > -1) {
      setSelectedTaskIds([
        ...selectedTaskIds.slice(0, index),
        ...selectedTaskIds.slice(index + 1),
      ]);
    } else {
      setSelectedTaskIds([...selectedTaskIds, id]);
    }
  };

  const allTasksSelected = () => selectedTaskIds.length === tasks.map(task => task.id).length;

  const toggleAllCheckBoxes = () => {
    const ids = tasks.map(task => task.id);

    if (selectedTaskIds.length === ids.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(ids);
    }
  };

  return (
    <div className="w-full px-5">
      <p className="p-5 rounded-t-sm text-medium">
        {
          tasks.length && (
            <p>
              <span className="text-blue-400 text-lg"> You have </span>
              <Badge color="red">
                {tasks.length}
              </Badge>
              <span className="text-blue-400 text-lg"> tasks left!! hurry up! finish them up to earn a hero badge.</span>
            </p>
          )}
      </p>
      <table className="nui-table nui-table--checkbox">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={allTasksSelected()}
                onClick={() => toggleAllCheckBoxes()}
              />
            </th>
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
            <th className="text-left">Status</th>
            <th className="text-left">Priority</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr
              key={task.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  id={task.id}
                  checked={isSelected(task.id)}
                  onClick={(e) => onSelectingTaskCheckbox(e, task.id)}
                />
              </td>
              <td>
                <div className="flex flex-row items-center justify-start capitalize text-gray-900">
                  {task.title}
                </div>
              </td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td><Button style="icon" icon="ri-delete-bin-line" disabled={!isSelected(task.id)} onClick={() => setShowDeleteAlert(true)} /> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;