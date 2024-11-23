import React, { useState } from 'react';
import Input from '../components/Input';
import { TitleDefault } from '../Elements/RootElements';
import Button from '../components/Button';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

const Auth = () => {
   const [cookies, setCookie, removeCookie] = useCookies();
   const navigate = useNavigate();

   const [userData, setUserData] = useState({
      name: '',
      userName: '',
      phone: '',
      avatar: '',
   });
   const [isLoading, setIsLoading] = useState(false);

   const onChangeValue = (value, name) => {
      setUserData(prev => {
         return {
            ...prev,
            [name]: value,
         };
      });
   };

   const onSubmit = () => {
      setIsLoading(true);

      setTimeout(() => {
         setCookie('user', userData);
         setIsLoading(false);
         navigate('/chat');
      }, 1000);
   };

   return (
      <div className="flex flex-col w-1/2 mx-auto">
         <TitleDefault className="mb-5">Введите свои данные</TitleDefault>
         <Input title="Ваше имя" value={userData.name} onChange={e => onChangeValue(e.target.value, 'name')} className="mb-4" />
         <Input title="Имя пользователя" value={userData.userName} onChange={e => onChangeValue(e.target.value, 'userName')} className="mb-4" />
         <Input title="Номер телефона" value={userData.phone} onChange={e => onChangeValue(e.target.value, 'phone')} className="mb-4" />
         <Input title="URL-аватарка" value={userData.avatar} onChange={e => onChangeValue(e.target.value, 'avatar')} />
         <Button className="mt-8" onClick={onSubmit} loading={isLoading}>
            Вперёд!
         </Button>
      </div>
   );
};

export default Auth;
