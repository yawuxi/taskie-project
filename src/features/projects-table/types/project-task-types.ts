import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot
} from "react-beautiful-dnd";

export interface iProjectTaskTypes {
  title: string,
  columnType: 'new' | 'progress' | 'completed',
  description: string,
  date: string,
  dateCompleted: string,
  id: string,
  providedRef?: (element: (HTMLElement | null)) => any,
  providedDraggableProps?: DraggableProvidedDraggableProps,
  providedHandleProps?: DraggableProvidedDragHandleProps,
  snapshot?: DraggableStateSnapshot,
}
