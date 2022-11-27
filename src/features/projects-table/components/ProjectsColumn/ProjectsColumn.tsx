//react
import React from 'react';
//additional
import { Draggable } from "react-beautiful-dnd";
//components
import { ProjectsTask } from "../ProjectsTask/ProjectsTask";
//types
import { iProjectsColumnTypes } from "../../types/projects-column-types";
//styles
import './ProjectsColumn.scss'

const ProjectsColumn: React.FC<Omit<iProjectsColumnTypes, 'id'>> = ({
                                                                      title,
                                                                      columnType,
                                                                      projectTasksList,
                                                                      providedRef,
                                                                      providedDroppableProps,
                                                                    }) => {

  function setCompletedColor(type: string) {
    if (type === 'new') {
      return 'projects-column__completed-tasks projects-column__completed-tasks--new'
    } else if (type === 'progress') {
      return 'projects-column__completed-tasks projects-column__completed-tasks--progress'
    } else {
      return 'projects-column__completed-tasks projects-column__completed-tasks--completed'
    }
  }

  return (
    <div className="projects-column"
      ref={providedRef}
      {...providedDroppableProps}
    >
      <header>
        <h2 className="projects-column__title">{title}</h2>
        <span className={setCompletedColor(columnType)}>{projectTasksList.length}</span>
      </header>
      <ul className="projects-column__list">
        {
          projectTasksList.map((task, index) => {
            return (
              <Draggable
                draggableId={task.id}
                index={index}
                key={task.id}
              >
                {(provided, snapshot) => (
                  <ProjectsTask
                    {...task}
                    columnType={columnType}
                    providedDraggableProps={provided.draggableProps}
                    providedHandleProps={provided.dragHandleProps}
                    providedRef={provided.innerRef}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            )
          })
        }
      </ul>
    </div>
  );
};

export { ProjectsColumn };
