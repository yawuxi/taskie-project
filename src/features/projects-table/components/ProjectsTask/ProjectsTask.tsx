//react
import React from 'react';
//types
import { iProjectTaskTypes } from "../../types/project-task-types";
//styles
import './ProjectsTask.scss'

export function setIcon(columnType: 'new' | 'progress' | 'completed') {
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

const ProjectsTask: React.FC<Omit<iProjectTaskTypes, 'id'>> = ({
                                                                 title,
                                                                 columnType,
                                                                 description,
                                                                 date,
                                                                 providedRef,
                                                                 providedHandleProps,
                                                                 providedDraggableProps,
                                                                 snapshot,
                                                               }) => {
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
      {setIcon(columnType)}
      <h3 className="projects-task__title">{title}</h3>
      <p className="projects-task__description">{description}</p>
      <div className="projects-task__date">{date}</div>
    </li>
  );
};

export { ProjectsTask };
