//react
import React from 'react';
//rtk
import { useAppSelector } from "../../hooks/hooks";
//firebase
import { useDocumentData } from "react-firebase-hooks/firestore";
import FirebaseConfig from "../../firebase/firebase.config";
import { setDoc, doc } from "firebase/firestore";
//additional
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { iProjectsColumnTypes } from "../../features/projects-table/types/projects-column-types";
//components
import { ProjectsColumn } from "../../features/projects-table";
//styles
import './Projects.scss'
import { Loader } from "../../components/Loader/Loader";

//drag and drop algorithm
const onDragEnd = (
  result: DropResult,
  columns: iProjectsColumnTypes[],
  uuid: string,
) => {
  const {source, destination} = result

  if (!destination) {
    return;

  }
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  //*working with same column?
  if (source.droppableId === destination.droppableId) {
    //*Yep. With same
    //getting index and copies of data
    const columnIndex = columns.findIndex(column => column.id === String(source.droppableId))
    const copyOfData = [...columns]
    //deep copy of column
    const copyColumnByIndex = JSON.parse(JSON.stringify(columns[columnIndex]))

    //removing draggable task from old arr
    //and adding removed task to new arr by new index
    const [removed] = copyColumnByIndex.projectTasksList.splice(source.index, 1)
    copyColumnByIndex.projectTasksList.splice(destination.index, 0, removed)

    //replacing old column with new column
    //with new tasks order
    copyOfData[columnIndex] = copyColumnByIndex

    //setting the state
    //dispatch(setColumns(copyOfData))
    setDoc(doc(FirebaseConfig.firestoreDB, 'users', uuid), {
      columns: copyOfData
    }, {merge: true})
  } else {
    //*No. With other
    //getting index and copies of columns
    const startColumnIndex = columns.findIndex(column => column.id === String(source.droppableId))
    const endColumnIndex = columns.findIndex(colum => colum.id === String(destination.droppableId))
    const copyOfData = [...columns]
    //deep copy of column
    const copyStartColumnByIndex = JSON.parse(JSON.stringify(columns[startColumnIndex]))
    const copyEndColumnByIndex = JSON.parse(JSON.stringify(columns[endColumnIndex]))

    //transform from column to column
    const [removed] = copyStartColumnByIndex.projectTasksList.splice(source.index, 1)
    copyEndColumnByIndex.projectTasksList.splice(destination.index, 0, removed)

    //changing old columns by new columns
    copyOfData[startColumnIndex] = copyStartColumnByIndex
    copyOfData[endColumnIndex] = copyEndColumnByIndex

    //settings the state
    // dispatch(setColumns(copyOfData))
    setDoc(doc(FirebaseConfig.firestoreDB, 'users', uuid), {
      columns: copyOfData
    }, {merge: true})
  }
}

const Projects: React.FC = () => {
  const {uuid} = useAppSelector(state => state.userSlice)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(FirebaseConfig.firestoreDB, 'users', uuid))

  if (userDataLoading) {
    return <Loader />
  }

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result, userData?.columns, uuid,)}>
      <div className="projects">
        {
          userData?.columns.map((column: iProjectsColumnTypes) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided, snapshot) => (
                <div
                  style={{
                    background: snapshot?.isDraggingOver ? 'rgba(17,19,21, 0.4)' : '',
                    borderRadius: '0.625rem',
                  }}
                >
                  <ProjectsColumn
                    {...column}
                    providedDroppableProps={provided.droppableProps}
                    providedRef={provided.innerRef}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        }
      </div>
    </DragDropContext>
  );
};

export { Projects };
