import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import socketIO from 'socket.io-client';
import Input from '../components/Input';
import Button from '../components/Button';
import { TitleDefault } from '../Elements/RootElements';

const socket = socketIO.connect(`http://localhost:5000`);

const Chat = () => {
   const [cookies, setCookie, removeCookie] = useCookies();
   const navigate = useNavigate();

   const [messages, setMessages] = useState([]);
   const [users, setUsers] = useState([]);
   const [messageValue, setMessageValue] = useState('');

   const [status, setStatus] = useState('');

   const userData = cookies.user;

   const isTyping = () => socket.emit('typing', `${userData.name} печатает...`);

   const handleLeave = () => {
      removeCookie('user');
      navigate('/auth');
   };

   const handleSend = () => {
      if (!messageValue) return;

      socket.emit('message', {
         text: messageValue,
         user: cookies.user,
         id: Date.now(),
         socketID: socket.id,
      });

      setMessageValue('');
   };

   useEffect(() => {
      if (!userData) {
         navigate('/auth');
      }
      socket.emit('newUser', {
         user: userData,
         socketID: socket.id,
      });

      socket.on('response', data => {
         setMessages(prev => [...prev, data]);
      });

      socket.on('responseNewUser', data => {
         setUsers(
            data.filter((item, index) => {
               return index === data.findIndex(t => t.user.phone === item.user.phone);
            })
         );
      });
      socket.on('responseTyping', data => {
         console.log(data);
         setStatus(data);
         setTimeout(() => {
            setStatus('');
         }, 1000);
      });
   }, []);

   return (
      <div className="h-screen py-4 flex flex-col gap-6">
         <div className="flex justify-end">
            <Button className="!bg-red-500 !h-8 !px-4 !text-xs" onClick={handleLeave}>
               Покинуть чат
            </Button>
         </div>
         <div className="grid grid-cols-[220px_1fr] flex-grow">
            <div>
               <TitleDefault className="mb-2">Пользователи</TitleDefault>
               <div className="flex flex-col gap-2">
                  {users.map((item, index) => (
                     <div className="flex items-center gap-2" key={index}>
                        {Boolean(item.user.avatar) && <img src={item.user.avatar} width={42} height={42} className="rounded-full" />}
                        <div className="flex flex-col gap-0.5 text-sm">
                           <span>{item.user.name}</span>
                           <span>{item.user.phone}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="flex flex-col gap-8">
               <div className="flex-grow messages">
                  {messages.map((item, index) => {
                     if (item.user.phone === cookies.user.phone) {
                        return (
                           <div className="message my-message" key={item.id}>
                              <span className="message-name">Вы ({item.user.name})</span>
                              <p className="message-text">{item.text}</p>
                           </div>
                        );
                     } else {
                        return (
                           <div className="message other-message" key={item.id}>
                              <span className="message-name">{item.user.name}</span>
                              <p className="message-text">{item.text}</p>
                           </div>
                        );
                     }
                  })}
               </div>
               {Boolean(status) && <div className="status">{status}...</div>}

               <div className="mt-auto flex items-center gap-2">
                  <Input
                     placeholder="Введите ваше сообщение"
                     className="flex-grow"
                     value={messageValue}
                     onChange={e => setMessageValue(e.target.value)}
                     onKeyDown={isTyping}
                  />
                  <Button className="h-full" onClick={handleSend}>
                     Отправить
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Chat;
