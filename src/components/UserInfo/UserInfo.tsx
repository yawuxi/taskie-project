//react
import React, { useEffect, useState } from 'react';
//rtk
import { useAppSelector } from "../../hooks/hooks";
//firebase
import firebaseConfig from "../../firebase/firebase.config";
import { getDownloadURL, ref } from 'firebase/storage';
//styles
import './UserInfo.scss'
import avatarPlaceholder from '../../assets/avatar-placeholder.png'

const UserInfo: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState('')
  const {uuid, avatar, displayPosition, displayName} = useAppSelector(state => state.userSlice)

  useEffect(() => {
    getDownloadURL(ref(firebaseConfig.firebaseSTORAGE, `user-images/${uuid}/avatar`))
      .then(url => {
        setAvatarUrl(url)
      })
  }, [avatar])

  return (
    <div className="user-info">
      <img className="user-info__avatar" src={avatarUrl || avatarPlaceholder} alt="user" />
      <div className="user-info__data">
        <span className="user-info__name">{displayName || 'Please set your name in settings'}</span>
        <span className="user-info__position">{displayPosition || 'Please set your name in settings'}</span>
      </div>
    </div>
  );
};

export { UserInfo };
