import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iProjectsColumnTypes } from "../types/projects-column-types";
import { iProjectTaskTypes } from "../types/project-task-types";

interface iProjectsSlice {
  columns: iProjectsColumnTypes[],
}

const initialState: iProjectsSlice = {
  columns: [
    {
      title: 'New projects',
      columnType: 'new',
      projectTasksList: [],
      id: 'column-1'
    },
    {
      title: 'In Progress',
      columnType: 'progress',
      projectTasksList: [],
      id: 'column-2'
    },
    {
      title: 'Completed',
      columnType: 'completed',
      projectTasksList: [],
      id: 'column-3'
    },
  ],
}

const projectsSlice = createSlice({
  name: 'projects-slice',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<iProjectsColumnTypes[]>) => {
      state.columns = action.payload
    },
    setTasksToColumnTasks: (state, action: PayloadAction<iProjectTaskTypes>) => {
      const index = state.columns.findIndex(column => column.columnType === 'new')
      state.columns[index].projectTasksList.push(action.payload)
    }
  },
})

export const {setColumns, setTasksToColumnTasks} = projectsSlice.actions
export default projectsSlice.reducer
