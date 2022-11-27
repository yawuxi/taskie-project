import { iProjectTaskTypes } from "./project-task-types";
import { DroppableProvidedProps, DroppableStateSnapshot } from "react-beautiful-dnd";

export interface iProjectsColumnTypes {
  title: string,
  columnType: 'new' | 'progress' | 'completed',
  projectTasksList: Array<Omit<iProjectTaskTypes, 'columnType'>>,
  id: string,
  providedRef?: (element: (HTMLElement | null)) => any,
  providedDroppableProps?:  DroppableProvidedProps,
  snapshot?: DroppableStateSnapshot,
}
