//react
import React from 'react';
//types
import { iProjectsColumnTypes } from "../../types/projects-column-types";
import { iProjectTaskTypes } from "../../types/project-task-types";
//styles
import './ProjectsTask.scss'
import { useAppSelector } from "../../../../hooks/hooks";
import { doc, setDoc } from "firebase/firestore";
import FirebaseConfig from "../../../../firebase/firebase.config";

export const setIcon = (columnType: 'new' | 'progress' | 'completed') => {
  switch (columnType) {
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 2H10L8 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V4C20 2.89 19.11 2 18 2ZM17 10H14V13H12V10H9V8H12V5H14V8H17V10Z"
            fill="white" />
        </svg>
      )
    case 'new':
      return (
        <svg width="24" height="24" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 2H10L8 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V4C20 2.89 19.11 2 18 2ZM17 10H14V13H12V10H9V8H12V5H14V8H17V10Z"
            fill="white" />
        </svg>
      )
    case 'progress':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_3_510)">
            <path
              d="M12 6C11.2044 6 10.4413 6.31607 9.87868 6.87868C9.31607 7.44129 9 8.20435 9 9V21C9 21.7956 9.31607 22.5587 9.87868 23.1213C10.4413 23.6839 11.2044 24 12 24C12.7956 24 13.5587 23.6839 14.1213 23.1213C14.6839 22.5587 15 21.7956 15 21V9C15 8.20435 14.6839 7.44129 14.1213 6.87868C13.5587 6.31607 12.7956 6 12 6Z"
              fill="#CC6709" />
            <path
              d="M21 -7.62939e-06C20.2044 -7.62939e-06 19.4413 0.316063 18.8787 0.878672C18.3161 1.44128 18 2.20434 18 2.99999V21C18 21.7956 18.3161 22.5587 18.8787 23.1213C19.4413 23.6839 20.2044 24 21 24C21.7956 24 22.5587 23.6839 23.1213 23.1213C23.6839 22.5587 24 21.7956 24 21V2.99999C24 2.20434 23.6839 1.44128 23.1213 0.878672C22.5587 0.316063 21.7956 -7.62939e-06 21 -7.62939e-06V-7.62939e-06Z"
              fill="#CC6709" />
            <path
              d="M3 12C2.20435 12 1.44129 12.3161 0.87868 12.8787C0.31607 13.4413 0 14.2044 0 15L0 21C0 21.7956 0.31607 22.5587 0.87868 23.1213C1.44129 23.6839 2.20435 24 3 24C3.79565 24 4.55871 23.6839 5.12132 23.1213C5.68393 22.5587 6 21.7956 6 21V15C6 14.2044 5.68393 13.4413 5.12132 12.8787C4.55871 12.3161 3.79565 12 3 12Z"
              fill="#CC6709" />
          </g>
          <defs>
            <clipPath id="clip0_3_510">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    case 'completed':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#37BD6B" />
          <g clipPath="url(#clip0_2_137)">
            <path
              d="M19.7391 6.3233L9.37485 16.6868C9.30516 16.7568 9.22235 16.8123 9.13117 16.8501C9.03998 16.888 8.94221 16.9075 8.84347 16.9075C8.74473 16.9075 8.64696 16.888 8.55578 16.8501C8.46459 16.8123 8.38178 16.7568 8.3121 16.6868L4.3041 12.6751C4.23441 12.6051 4.1516 12.5496 4.06042 12.5117C3.96923 12.4738 3.87146 12.4543 3.77272 12.4543C3.67398 12.4543 3.57621 12.4738 3.48503 12.5117C3.39384 12.5496 3.31103 12.6051 3.24135 12.6751V12.6751C3.17139 12.7447 3.11588 12.8275 3.078 12.9187C3.04013 13.0099 3.02063 13.1077 3.02063 13.2064C3.02063 13.3052 3.04013 13.4029 3.078 13.4941C3.11588 13.5853 3.17139 13.6681 3.24135 13.7378L7.25085 17.7466C7.67381 18.1687 8.24699 18.4058 8.8446 18.4058C9.4422 18.4058 10.0154 18.1687 10.4383 17.7466L20.8018 7.3853C20.8717 7.31563 20.9271 7.23287 20.9649 7.14175C21.0027 7.05063 21.0222 6.95295 21.0222 6.8543C21.0222 6.75565 21.0027 6.65797 20.9649 6.56685C20.9271 6.47573 20.8717 6.39297 20.8018 6.3233C20.7322 6.25334 20.6494 6.19783 20.5582 6.15996C20.467 6.12208 20.3692 6.10258 20.2705 6.10258C20.1717 6.10258 20.074 6.12208 19.9828 6.15996C19.8916 6.19783 19.8088 6.25334 19.7391 6.3233Z"
              fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_2_137">
              <rect width="18" height="18" fill="white" transform="translate(3 3)" />
            </clipPath>
          </defs>
        </svg>

      )
  }
}

const onTaskRemove = (columns: iProjectsColumnTypes[], id: string, uuid: string) => {
  const copyOfColumns = [...JSON.parse(JSON.stringify(columns))]
  const allTasks: iProjectTaskTypes[] = []

  copyOfColumns.map(column => {
    allTasks.push(...column.projectTasksList)
  })

  const removableTask = allTasks.find(task => task.id === id)!;

  copyOfColumns.map(column => {
    if (column.columnType === removableTask.columnType) {
      const taskIndex = column.projectTasksList.indexOf(removableTask)
      column.projectTasksList.splice(taskIndex, 1)
    }
  })

  setDoc(doc(FirebaseConfig.firestoreDB, 'users', uuid), {
    columns: copyOfColumns
  })
}

const ProjectsTask: React.FC<iProjectTaskTypes> = ({
                                                     title,
                                                     columnType,
                                                     description,
                                                     date,
                                                     id,
                                                     providedRef,
                                                     providedHandleProps,
                                                     providedDraggableProps,
                                                     snapshot,
                                                   }) => {
  const {uuid, columns} = useAppSelector(state => state.userSlice)

  return (
    <li className="projects-task"
        ref={providedRef}
        {...providedHandleProps}
        {...providedDraggableProps}
        style={{
          ...providedDraggableProps?.style,
          opacity: snapshot?.isDragging ? '0.5' : '1'
        }}
    >
      <div className="projects-task__content">
        <header>
          {setIcon(columnType)}
          <div className="projects-task__controls">
            <button>
              <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M1.54159 3.04159C1.92839 2.6548 2.45299 2.4375 3 2.4375H8.25C8.56066 2.4375 8.8125 2.68934 8.8125 3C8.8125 3.31066 8.56066 3.5625 8.25 3.5625H3C2.75136 3.5625 2.5129 3.66127 2.33709 3.83709C2.16127 4.0129 2.0625 4.25136 2.0625 4.5V15C2.0625 15.2486 2.16127 15.4871 2.33709 15.6629C2.5129 15.8387 2.75136 15.9375 3 15.9375H13.5C13.7486 15.9375 13.9871 15.8387 14.1629 15.6629C14.3387 15.4871 14.4375 15.2486 14.4375 15V9.75C14.4375 9.43934 14.6893 9.1875 15 9.1875C15.3107 9.1875 15.5625 9.43934 15.5625 9.75V15C15.5625 15.547 15.3452 16.0716 14.9584 16.4584C14.5716 16.8452 14.047 17.0625 13.5 17.0625H3C2.45299 17.0625 1.92839 16.8452 1.54159 16.4584C1.1548 16.0716 0.9375 15.547 0.9375 15V4.5C0.9375 3.95299 1.1548 3.42839 1.54159 3.04159Z"
                      fill="#333333" />
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M15 1.97156C14.7272 1.97156 14.4656 2.07992 14.2727 2.2728L7.25791 9.28763L6.77308 11.227L8.71242 10.7421L15.7272 3.7273C15.9201 3.53442 16.0285 3.27282 16.0285 3.00005C16.0285 2.72728 15.9201 2.46568 15.7272 2.2728C15.5344 2.07992 15.2728 1.97156 15 1.97156ZM13.4772 1.4773C13.8811 1.07344 14.4289 0.846558 15 0.846558C15.5711 0.846558 16.1189 1.07344 16.5227 1.4773C16.9266 1.88116 17.1535 2.42891 17.1535 3.00005C17.1535 3.57119 16.9266 4.11894 16.5227 4.5228L9.39774 11.6478C9.32565 11.7199 9.23533 11.771 9.13642 11.7958L6.13642 12.5458C5.94474 12.5937 5.74196 12.5375 5.60225 12.3978C5.46254 12.2581 5.40637 12.0553 5.45429 11.8636L6.20429 8.86362C6.22902 8.76472 6.28016 8.67439 6.35225 8.6023L13.4772 1.4773Z"
                      fill="#333333" />
              </svg>
            </button>
            <button onClick={() => onTaskRemove(columns, id, uuid)}>
              <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M1.6875 4.5C1.6875 4.18934 1.93934 3.9375 2.25 3.9375H15.75C16.0607 3.9375 16.3125 4.18934 16.3125 4.5C16.3125 4.81066 16.0607 5.0625 15.75 5.0625H2.25C1.93934 5.0625 1.6875 4.81066 1.6875 4.5Z"
                      fill="#F05454" />
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M7.5 2.0625C7.25136 2.0625 7.0129 2.16127 6.83709 2.33709C6.66127 2.5129 6.5625 2.75136 6.5625 3V3.9375H11.4375V3C11.4375 2.75136 11.3387 2.5129 11.1629 2.33709C10.9871 2.16127 10.7486 2.0625 10.5 2.0625H7.5ZM12.5625 3.9375V3C12.5625 2.45299 12.3452 1.92839 11.9584 1.54159C11.5716 1.1548 11.047 0.9375 10.5 0.9375H7.5C6.95299 0.9375 6.42839 1.1548 6.04159 1.54159C5.6548 1.92839 5.4375 2.45299 5.4375 3V3.9375H3.75C3.43934 3.9375 3.1875 4.18934 3.1875 4.5V15C3.1875 15.547 3.4048 16.0716 3.79159 16.4584C4.17839 16.8452 4.70299 17.0625 5.25 17.0625H12.75C13.297 17.0625 13.8216 16.8452 14.2084 16.4584C14.5952 16.0716 14.8125 15.547 14.8125 15V4.5C14.8125 4.18934 14.5607 3.9375 14.25 3.9375H12.5625ZM4.3125 5.0625V15C4.3125 15.2486 4.41127 15.4871 4.58709 15.6629C4.7629 15.8387 5.00136 15.9375 5.25 15.9375H12.75C12.9986 15.9375 13.2371 15.8387 13.4129 15.6629C13.5887 15.4871 13.6875 15.2486 13.6875 15V5.0625H4.3125Z"
                      fill="#F05454" />
              </svg>
            </button>
          </div>
        </header>
        <h3 className="projects-task__title">{title}</h3>
        <p className="projects-task__description">{description}</p>
        <div className="projects-task__date">{date}</div>
      </div>
    </li>
  );
};

export { ProjectsTask };
