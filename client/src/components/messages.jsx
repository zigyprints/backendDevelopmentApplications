import axios from 'axios';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import socketIO from 'socket.io-client';
import Image from './image'
import Chat from './chat'

const Messages = () => {
    const navigate = useNavigate();
    const { profile, setProfile, users, setUsers } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [allMessages, setAllMessages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [images, setImages] = useState([])
    const [message, setMessage] = useState('');
    

    const profiles = users.filter(item => item._id.toString() !== profile._id.toString())

    // establishing the connection with the server when this component is rendered
    useEffect(() => {
        const socket = socketIO.connect('http://localhost:4000/');
        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('response', (data) => {
                console.log('Received message:', data);
                // Identify received messages and add them to the state
                setAllMessages((prev) => [...prev, data]);
            });
        }
    }, [socket]);

    const changeUser = async (e, conn) => {
        // console.log({conn})
        e.preventDefault();
        setUser(conn);
        try {
            const response = await axios.post('/user/getMessages', { user: conn, }, { withCredentials: true });

            if (response?.data) {
                setAllMessages(response.data.messages);
                setProfile(response.data.profile);
            }
        } catch (error) {
            console.log({ error: error.message });
        }
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    };

    

    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);

        fileArray.forEach((file) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const image = e.target.result;
                setImagePreviews((prev) => [...prev, { base: image, original: file }])
            };
            reader.readAsDataURL(file);
        });
    };

    
    const handleImageRemove = (index) => {
        setImagePreviews((prevPreviews) =>
            prevPreviews.filter((_, i) => i !== index)
        );
    };

    const handleSend = async() => {
        const data = new FormData(); 
        for (let i = 0; i < imagePreviews.length; i++) {
            data.append('photos', imagePreviews[i].original)
        }

	    try {
	        const uploadResponse = await axios.post('/images/upload', data, {
	            withCredentials: true
	        })

	        const msg = {
	            by: profile ?._id.toString(),
	            to: user ?._id.toString(),
	            text: message,
	            photos : uploadResponse?.data.images, 
	        };
	        console.log({ msgSent: msg })

	        socket.emit('message', msg);
	        setMessage('');
	        setImagePreviews([]); 

	     } catch(error){
	       	console.log({error})
	     }
    };


  return (
    <>
    <div className="flex justify-center items-center">
      <div className="flex h-screen min-w-[400px] w-[90%] max-w-[1280px] border rounded-lg border-gray-100 p-6">
        {/* ------------User-Names list------------ */}
        <div className="w-[28%] overflow-x-hidden border-gray-200 border-l border-b rounded-l-lg">
          {profiles?.map((conn, index) => (
            <button
              key={index}
              onClick={(e) => changeUser(e, conn)}
              className={`flex w-full flex-col px-3 py-2 rounded-b-sm border-b ${
                conn?.username === user?.username ? 'bg-gray-700 justify-end' : 'justify-start'
              }`}
            >
              <div className={`flex gap-2 justify-center items-center py-2`}>
                <div className={`border border-gray-700 bg-gray-800 h-8 w-8 text-white flex items-center justify-center text-lg font-semibold rounded-full`}>
                	{conn.name[0]}
                </div>
                <div className="flex flex-col items-start px-1">
                  <span
                    className={`text-sm font-semibold ${
                      user?.username === conn?.username ? 'text-gray-200' : ''
                    }`}
                  >
                    {conn?.name?.split(' ')[0]}
                  </span>
                  <span
                    className={`text-xs -mt-1 ${
                      user?.username === conn?.username ? ' text-xs text-gray-200' : ''
                    }`}
                  >
                    {Math.floor(Math.random() * 10) + 1} Mins ago
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/*--------------Chat section-----------------*/}
        {user && (
        	<div className="flex flex-col w-[72%] border border-gray-100">
        		<Chat user={user} allMessages={allMessages} />

        		{/*--------Image previews-------------*/}
        		<div className="grid grid-cols-4 gap-1 p-1">
                  {imagePreviews?.length>0 && imagePreviews?.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image.base} alt={`Preview ${index}`}
                        className="h-36 w-36 rounded-lg"
                      />
                      <button onClick={() => handleImageRemove(index)} title = "Remove this image."
                        className="absolute bottom-0 right-0 border-2 rounded-full bg-sky-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#f9fafb" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div> 

              {/*---------Input Section-------------*/}
              <div className="flex bg-white border-gray-300 shadow-gray-200 shadow-xl items-center px-2 border rounded-lg">
	              <label htmlFor="fileInput" className="cursor-pointer" title = "Add images">
	                  <input id="fileInput" type="file"  multiple  className="hidden" 
	                  	onChange={handleFileChange} 
	                  />
	              	 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					   <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
					 </svg>
	              </label>	

	              <textarea
	                className="flex-grow resize-none h-12 rounded-lg px-4 py-2 bg-inherit text-gray-700 focus:outline-none"
	                placeholder="Type a message..."
	                value={message}
	                onChange={handleInputChange}
	              ></textarea>
	              <button
	                title="Send the message"
	                className={`p-1 flex justify-center ${
	                  message.length > 0 ? 'bg-cyan-500 shadow-lg' : 'bg-gray-200'
	                } rounded-lg`}
	                onClick={handleSend}
	              >
	                <svg
	                  xmlns="http://www.w3.org/2000/svg"
	                  viewBox="0 0 24 24"
	                  fill="#0369a1"
	                  className="w-6 h-6"
	                >
	                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
	                </svg>
	              </button>
	            </div>
       		 </div>
        )}

        {!user && (
          <div className="w-[75%] shadow-lg flex flex-col gap-4 items-center text-center justify-center">
            <span className="text-lg">Select an user to start conversation.</span>
            <NavLink to={`/profile/${profile?._id}`} className="flex gap-3 border items-center border-gray-300 bg-slate-200 hover:bg-slate-400 hover:border-gray-200 py-2 px-4 rounded-lg">
              View Profile
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clipRule="evenodd" />
              </svg>
            </NavLink>
          </div>
        )}
        
      </div>
      </div>
    </>
  );
};

export default Messages;