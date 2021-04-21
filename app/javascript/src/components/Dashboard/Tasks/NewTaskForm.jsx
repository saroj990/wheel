
import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Select } from "neetoui/formik";
import { Button } from "neetoui";
import notesApi from "apis/notes";

export default function NewTaskForm ({ onClose, refetch }) {
  const handleSubmit = async values => {
    try {
      const { title, description, status, priority } = values;
      const note = {
        title,
        description,
      };

      if (status) {
        note.status = status.value;
      }

      if(priority) {
        note.priority = priority.value;
      }

      await notesApi.create(note);
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  const statuses = ["todo", "inprogress", "done"]
  const priorities = ["low", "medium", "high", "critical"];
  const getValues = (values) =>  values.map((value, index) => ({ value: index, label: value.charAt(0).toUpperCase() + value.substring(1)}))
  const taskPriorities = getValues(priorities);
  const defaultTaskPriority = taskPriorities[0];
  const taskStatuses = getValues(statuses);
  const defaultTaskStatus = taskStatuses[0];

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        status: null,
        priority: null
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input label="Title" name="title" className="mb-3" />
          <Input label="Description" name="description"  className="mb-3"/>
          <Select
            label="Status"
            name="status"
            placeholder="Select an Option"
            options={taskStatuses}
            defaultValue={{ value: 'todo',  label:"Todo" }}
          />
          <Select
            label="Priority"
            name="priority"
            placeholder="Select an Option"
            options={taskPriorities}
            defaultValue={{ value: 'low',  label:"Low" }}
          />
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
