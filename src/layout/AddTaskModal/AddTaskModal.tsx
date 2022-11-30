//react
import React from 'react';
//rtk
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleAddTasksModal } from "../../app/modal-windows-slice";
//formik+yup
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup'
//components
import Components from "../../components";
//styles
import './AddTaskModal.scss'

const AddTaskModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const {addTasksModal} = useAppSelector(state => state.modalWindowsSlice)
  const displayModalClass = addTasksModal ? 'add-task-modal' : 'add-task-modal add-task-modal--hidden'

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
            console.log(title, description)
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
}
  ;

  export { AddTaskModal };
