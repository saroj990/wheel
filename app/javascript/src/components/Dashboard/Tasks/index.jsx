import React, { useState, useEffect } from "react";
import notesApi from "apis/notes";
import { PageHeading } from "neetoui/layouts";
import { PageLoader, Button } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import List from "./List";
import NewTaskPane from "./NewTaskPane";


const Tasks = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [showNewTaskPane, setShowNewTaskPane] = useState(false);


    useEffect(() => {
      fetchTasks();
    }, []);

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await notesApi.fetch();
        console.log("reponse :", response.data)
        setTasks(response.data);
      } catch (error) {
        logger.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return <PageLoader />;
    }

    return (
      <>
        <PageHeading
          title="Notes"
          rightButton={() => (
            <Button
              onClick={() => setShowNewTaskPane(true)}
              label="Add new note"
              icon="ri-add-line"
            />
          )}
        />
        {tasks.length? (
          <>
            <List
              tasks={tasks}
              selectedTaskIds={selectedTaskIds}
              setSelectedTaskIds={setSelectedTaskIds}
            />
          </>
        ): (
          <EmptyState
            image={EmptyNotesListImage}
            title="Looks like you don't have any notes!"
            subtitle="Add your notes to send customized emails to them."
            primaryAction={() => setShowNewTaskPane(true)}
            primaryActionLabel="Add new note"
          />
        )}
        <NewTaskPane
          showNewTaskPane={showNewTaskPane}
          setShowNewTaskPane={setShowNewTaskPane}
          fetchTasks={fetchTasks}
        />

      </>
    );
};

export default Tasks;