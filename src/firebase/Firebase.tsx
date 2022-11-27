//react
import { useEffect } from "react";
//rtk
import { useAppDispatch } from "../hooks/hooks";
import {
  setLoginMethod,
  setRegistrationMethod,
  setSignOutMethod,
  setGenerateTestData,
} from '../features/authentication/slices/auth-methods-slice'
import { iUserSlice } from "../app/user-slice";
import { AuthMethodParams } from '../features/authentication/slices/auth-types'
//firebase
import FirebaseConfig from "./firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseConfig from "./firebase.config";
import { doc, setDoc } from "firebase/firestore";
//additional
import { useSnackbar } from 'notistack'

//fake data
const fakeData: Pick<iUserSlice, 'columns'> = {
  columns: [
    {
      title: 'New projects',
      columnType: 'new',
      projectTasksList: [
        {
          title: 'I am test task 1',
          date: '2022-08-02',
          description: 'Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum',
          dateCompleted: '',
          id: '1',
        },
        {
          title: 'I am test task 2',
          date: '2022-09-02',
          description: 'Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum',
          dateCompleted: '',
          id: '2',
        },
        {
          title: 'I am test task 3',
          date: '2022-09-02',
          description: 'Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum',
          dateCompleted: '',
          id: '3',
        },
      ],
      id: 'column-1'
    },
    {
      title: 'In Progress',
      columnType: 'progress',
      projectTasksList: [
        {
          title: 'I am test task 10',
          date: '2022-08-02',
          description: 'Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum',
          dateCompleted: '',
          id: '4',
        },
        {
          title: 'I am test task 11',
          date: '2022-09-02',
          description: 'Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum',
          dateCompleted: '',
          id: '5',
        },
        {
          title: 'I am test task 12',
          date: '2022-09-02',
          description: 'Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum',
          dateCompleted: '',
          id: '6',
        },
      ],
      id: 'column-2'
    },
    {
      title: 'Completed',
      columnType: 'completed',
      projectTasksList: [
        {
          title: 'I am test task 20',
          date: '2022-08-02',
          description: 'Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum',
          dateCompleted: '2022-11-20',
          id: '7',
        },
        {
          title: 'I am test task 21',
          date: '2022-09-02',
          description: 'Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum',
          dateCompleted: '2022-11-20',
          id: '8',
        },
        {
          title: 'I am test task 22',
          date: '2022-09-02',
          description: 'Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum Lorem ipsum test ipsum',
          dateCompleted: '2022-11-20',
          id: '9',
        },
      ],
      id: 'column-3'
    },
  ],
}

//component
const Firebase = () => {
  const dispatch = useAppDispatch()
  const {enqueueSnackbar} = useSnackbar()

  //when componentDidMount dispatch authentication methods to auth-slices
  //for using in RegistrationForm, LoginFormComponents, also for sign out.
  useEffect(() => {
    dispatch(setRegistrationMethod(registerNewUser))
    dispatch(setLoginMethod(loginUser))
    dispatch(setSignOutMethod(userSignOut))
    dispatch(setGenerateTestData(generateTestData))
  }, [])

  //error handler function
  function handleError({code}: { code: string }): string {
    let message = `Ooops, error :( - \n ${code}`;
    switch (code) {
      default:
        return message;
      case 'auth/email-already-in-use':
        return message = 'That email already in use'
      case 'auth/internal-error':
        return message = 'Internal error'
      case 'auth/wrong-password':
        return message = 'Wrong password'
      case 'auth/user-token-expired':
        return message = 'Unfortunately your token expired'
      case 'auth/too-many-requests':
        return message = 'Too many requests! Wait 5-10 minutes'
      case 'auth/user-not-found':
        return message = 'User not found, please complete registration'
    }
  }

  //create user database structure
  function createUserDatabaseStructure(uid: string, displayName: string = '') {
    setDoc(doc(FirebaseConfig.firestoreDB, 'users', uid), {
      displayName,
      displayPosition: '',
      colorTheme: 'light',
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
    })
      .catch(err => {
        enqueueSnackbar(handleError(err), {variant: 'error'})
      })
  }

  //registration method
  const registerNewUser: AuthMethodParams = (email, password, name) => {
    createUserWithEmailAndPassword(FirebaseConfig.firebaseAUTH, email, password)
      .then(({user: {uid}}) => {
        enqueueSnackbar('Successfully registration', {variant: 'success'})
        //creating db
        createUserDatabaseStructure(uid, name)
      })
      .catch(err => {
        enqueueSnackbar(handleError(err), {variant: 'error'})
      })
  }

  //login method
  const loginUser: AuthMethodParams = (email, password) => {
    signInWithEmailAndPassword(FirebaseConfig.firebaseAUTH, email, password)
      .then(_ => {
        enqueueSnackbar('Successfully logged in', {variant: 'success'})
      })
      .catch(err => {
        console.log(err.code)
        enqueueSnackbar(handleError(err), {variant: 'error'})
      })
  };

  //sign out method
  function userSignOut() {
    signOut(FirebaseConfig.firebaseAUTH)
      .then(_ => {
        enqueueSnackbar('Successfully signed out', {variant: 'success'})
      })
      .catch(err => {
        console.log(err)
        enqueueSnackbar(handleError(err), {variant: 'error'})
      })
  }

  //generating test data
  function generateTestData(uuid: string) {
    setDoc(doc(firebaseConfig.firestoreDB, 'users', uuid), fakeData, {merge: true})
  }

  return null
};

export { Firebase };
