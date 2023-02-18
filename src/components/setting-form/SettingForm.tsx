// react modules
import { useState, useEffect } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// Services
import { UserService } from '../../services/UserService';

// State
import { UserState } from '../../models/user';

// Styles
import './SettingForm.css';

// external modules
import axios from 'axios';

const SettingForm = () => {
  const usernameOpts: RegisterOptions = {
    minLength: 6
  };

  const user = useSelector((state: {user: UserState}) => state.user.user);
  const { register, getValues, formState: { errors } } = useForm({mode:'onChange'})
  const dispatch = useDispatch();

  useEffect(()=>{
    let userId = localStorage.getItem('userId');
    console.log(userId);
    dispatch<any>(UserService.retrieve(userId));
  }, []);

  const handleInput = () => {
    const [username, description] = getValues(['username', 'description']);
    let userData: any = {pk: user.pk};
    if (username !== '') {
      userData = {...userData, username};
    }
    if (description !== '') {
      userData = {...userData, description};
    }
    
    if (Object.keys(userData).length !== 0) {
      console.log("hello");
      dispatch<any>(UserService.update(userData));
    }
  }
    
  return (
    <div>
      <div className="profile-form">
        <div className="profile-header-container">
          <img
            className="profile-header-img"
            src={user.profile ? user.profile : "profile.png"}
            alt="user profile"
          />
          <div className="profile-header-username">
            <h1 className="profile-header-username-text">{user.username}</h1>
            <button className="profile-header-username-btn">프로필 사진 바꾸기</button>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            이메일
          </div>
          <div className="profile-input-data">
            <input
              className="profile-input"
              type="text"
              placeholder="이메일"
              defaultValue={user.email}
              disabled
            />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            사용자 이름
          </div>
          <div className="profile-input-data">
            <input
              className="profile-input"
              type="text"
              placeholder="사용자 이름"
              defaultValue={user.username}
              {...register("username", usernameOpts)}
            />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            소개
          </div>
          <div className="profile-input-data">
            <textarea
              className="profile-input profile-textarea"
              placeholder="사용자 소개"
              defaultValue={user.description}
              {...register('description')}
            >
            </textarea>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
          </div>
          <div className="profile-input-data">
            <button className="profile-input-button" type="button" onClick={handleInput}>제출</button>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            이전 비밀번호
          </div>
          <div className="profile-input-data">
            <input
              className="profile-input"
              type="password"
            //              {...register("password", passwordOpts)}
            />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            새 비밀번호
          </div>
          <div className="profile-input-data">
            <input
              className="profile-input"
              type="password"
            //              {...register("new_password", passwordOpts)}
            />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
            새 비밀번호 확인
          </div>
          <div className="profile-input-data">
            <input
              className="profile-input"
              type="password"
            //              {...register("new_password_check", passwordOpts)} 
            />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
          </div>
          <div className="profile-input-data">
            <input
              className="profile-input"
              hidden
              type="file"
              accept="image/*"
            />
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
          </div>
          <div className="profile-input-data">
            <button
              className="profile-input-button"
              type="button"
            >
              비밀번호 변경
            </button>
          </div>
        </div>
        <div className="profile-input-container">
          <div className="profile-input-label">
          </div>
          <div className="profile-input-data">
            <div className="profile-form-error">Error입니다</div>
          </div>
        </div>
      </div>
      <div className={"profile-modal-container"}>
        <div className="profile-modal">
          <div className="profile-modal-title-container">
            <div className="profile-modal-title">
              <div>프로필 사진 바꾸기</div>
            </div>
          </div>
          <div className="profile-modal-content-container">
            <div className="profile-modal-button profile-modal-button-blue">
              <div>
                사진 업로드
              </div>
            </div>
            <div className="profile-modal-button profile-modal-button-red">
              <div>
                현재 사진 삭제
              </div>
            </div>
            <div className="profile-modal-bottom-button">
              <div>
                취소
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingForm;