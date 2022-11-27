//react
import React, { useEffect, useState } from 'react';
//rtk
import { useAppSelector } from "../../hooks/hooks";
//firebase
import firebaseConfig from "../../firebase/firebase.config";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { getDownloadURL, ref } from 'firebase/storage';
//styles
import './UserInfo.scss'
import avatarPlaceholder from '../../assets/avatar-placeholder.png'

const UserInfo: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState('')
  const {uuid, avatar} = useAppSelector(state => state.userSlice)
  const [data, dataLoading, dataError] = useDocumentData(doc(firebaseConfig.firestoreDB, 'users', uuid))

useEffect(()=>{
  getDownloadURL(ref(firebaseConfig.firebaseSTORAGE, `user-images/${uuid}/avatar`))
    .then(url => {
      setAvatarUrl(url)
    })
},[avatar])

  return (
    <div className="user-info">
      <img className="user-info__avatar" src={avatarUrl || avatarPlaceholder} alt="user" />
      <div className="user-info__data">
        <span className="user-info__name">{data?.displayName}</span>
        <span className="user-info__position">{data?.displayPosition}</span>
      </div>
    </div>
  );
};

export { UserInfo };
