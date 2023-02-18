// React modules
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Components
import PasswordForm from "../components/password-form/PasswordForm";

const Password = () => {
  const [cookies] = useCookies();
  const nav = useNavigate();

  useEffect(()=>{
    if(cookies.csrftoken) {
      nav('/', {replace: true});
    }
  });

  return (
    <div className="center">
      <PasswordForm />
    </div>
  )
}

export default Password;