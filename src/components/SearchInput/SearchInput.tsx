//react
import React, { useEffect, useState } from 'react';
//additional
import { setIcon } from "../../features/projects-table";
//styles
import './SearchInput.scss'
import { useAppSelector } from "../../hooks/hooks";
import { iProjectsColumnTypes } from "../../features/projects-table/types/projects-column-types";
import { iProjectTaskTypes } from "../../features/projects-table/types/project-task-types";

const gatherAllTasks = (columns: iProjectsColumnTypes[]): iProjectTaskTypes[] => {
  return columns.map(column => column.projectTasksList).flat()
}

const findTask = (tasksArray: iProjectTaskTypes[], term: string): iProjectTaskTypes[] => {
  return tasksArray.filter(task => task.title.toLowerCase().includes(term.toLowerCase()))
}

const SearchInput: React.FC = () => {
    const {columns} = useAppSelector(state => state.userSlice)
    const [term, setTerm] = useState('')
    const [fondedTasks, setFondedTasks] = useState<iProjectTaskTypes[]>([])

    useEffect(() => {
      if (term.length > 0) {
        setFondedTasks(findTask(gatherAllTasks(columns), term))
      } else {
        setFondedTasks([])
      }
    }, [term])

    return (
      <div className="search-input">
        <input className="search-input__input"
               type="text"
               placeholder="Search"
               value={term}
               onChange={e => setTerm(e.target.value)} />
        <ul className="search-input__list" style={fondedTasks.length > 0 ? {padding: '0.9375rem'} : {}}>
          {
            fondedTasks.map(task => (
              <li className="search-input__item" key={task.id}>
                {setIcon(task.columnType)}
                <p className="search-input__item-info">Status: <span>{task.columnType}</span></p>
                <p className="search-input__item-info">Title: <span>{task.title}</span></p>
                <p className="search-input__item-info">Date created: <span>{task.date}</span></p>
                <p className="search-input__item-info">Date
                  completed: <span>{task.dateCompleted || 'Task is not completed'}</span></p>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
;

export { SearchInput };
