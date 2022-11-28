//react
import React, { useEffect } from 'react';
//rtk
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleAddTasksModal } from "../../app/modal-windows-slice";
import { setTasksToColumnTasks } from "../../features/projects-table/slices/projects-slice";
//firebase
import FirebaseConfig from "../../firebase/firebase.config";
import { updateDoc, doc } from 'firebase/firestore'
//formik+yup
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup'
//additional
import { v4 } from 'uuid'
import dayjs from "dayjs";
//components
import Components from "../../components";
//styles
import './AddTaskModal.scss'

const AddTaskModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const {addTasksModal} = useAppSelector(state => state.modalWindowsSlice)
  const {columns} = useAppSelector(state => state.projectsSlice)
  const {uuid} = useAppSelector(state => state.userSlice)
  const displayModalClass = addTasksModal ? 'add-task-modal' : 'add-task-modal add-task-modal--hidden'

  //when columns array is updating
  //update firestore database columns array
  useEffect(() => {
    if (columns[0].projectTasksList.length) {
      updateDoc(doc(FirebaseConfig.firestoreDB, 'users', uuid), {
        columns,
      })
    }
  }, [columns])

  return (
    <div className={displayModalClass}>
      <button
        className="add-task-modal__close"
        onClick={() => dispatch(toggleAddTasksModal())}></button>
      <div className="add-task-modal__content">
        <Formik
          initialValues={{
            title: '',
            description: '',
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().min(5, 'Minimum title length is 5 characters').required('Please enter the task title'),
            description: Yup.string().required('Please enter the task description'),
          })}
          onSubmit={({title, description}) => {
            dispatch(setTasksToColumnTasks({
              title,
              description,
              date: dayjs().format('YYYY-MM-DD'),
              dateCompleted: '',
              columnType: 'new',
              id: v4(),
            }))
            // updateDoc(doc(FirebaseConfig.firestoreDB, 'users', uuid), {
            //   columns,
            // })
          }}
        >
          {({errors, touched}) => (
            <Form>
              {errors.title && touched.title ?
                <div className="authentication-page__error">{errors.title}</div> : null}
              <Field name="title" placeholder="Enter your task..." />
              {errors.description && touched.description ?
                <div className="authentication-page__error">{errors.description}</div> : null}
              <Field name="description" placeholder="Enter your task description..." />
              <Components.Button text="Add task" type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
    ;
};

export { AddTaskModal };
