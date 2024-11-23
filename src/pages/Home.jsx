import React from 'react';
import { Title } from '../Elements/RootElements';
import Button from '../components/Button';
import { useNavigate } from 'react-router';

const Home = () => {
   const navigate = useNavigate();
   return (
      <div>
         <Title>Добро пожаловать в Chat.wd</Title>
         <Button
            className="mt-4"
            onClick={() => {
               navigate('/auth');
            }}>
            Авторизоваться
         </Button>
      </div>
   );
};

export default Home;
