import React, {useState, useEffect , useRef, useContext} from 'react'; 
import {NavLink } from 'react-router-dom'
import profileImage from '../images/profile.webp' 
import {UserContext } from '../userContext'

const Chat = ({ user, allMessages }) => {
  if(!user) return null; 

	const scrollRef = useRef(null); 
  const {profile } = useContext(UserContext); 

	const getTime = (val) => {
        const presentYear = new Date().toString().split(' ')[3];
        const time = new Date(val).toString().split(' ');
        const values = time[4].split(':')
        return `${time[2]}-${time[1]}${time[3]==presentYear?'':'-'+time[3]} ${values[0]}:${values[1]}`;
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [allMessages]);

	return (<> 
            {/* -----------Active user profile------------------ */}
              <div className="flex justify-between cursor-pointer gap-4 items-center p-3 rounded-b-sm rounded-tr-lg bg-gray-700">
                <div className="flex cursor-pointer gap-4 items-center">
                  <NavLink to={`/profile/${user?._id}`} className="border border-gray-700 bg-gray-800 h-8 w-8 text-white flex items-center justify-center text-lg font-semibold rounded-full">
                  	{user.name[0]}
                  </NavLink>
                  <NavLink to={`/profile/${user?._id}`} className="flex flex-col justify-center">
                    <span className="text-gray-200 font-semibold text-md">
                      {user?.name}
                    </span>
                    <span className="text-gray-200 -mt-1 text-xs opacity-80">
                      {Math.floor(Math.random() * 10) + 1} Mins ago
                    </span>
                  </NavLink>
                </div>

                <div>
                  <NavLink to={`/profile/${profile?._id}`}>
                    <img src={`${profile.profileImage || profileImage}`}
                      className="h-10 w-10 object-cover rounded-full opacity-80"
                      alt=""/>
                  </NavLink>
                </div>

            </div>

            {/* --------------Message section-------------------- */}
            <div className="flex-grow p-4 flex flex-col overflow-y-auto" style={{ maxHeight: 'calc(100vh - 5rem)' }}>
              {allMessages.length > 0 &&
                allMessages.map((msg, index) => (
                  <div
                    key={index}
                    className="text-sm backdrop-brightness-150"
                    ref={index === allMessages.length - 1 ? scrollRef : null}
                  >
                    {msg.by === user?._id ? (
                      <div className="flex justify-start">
                        <div className="flex flex-col border border-sky-100 bg-sky-100 px-1 py-2 my-1 text-gray-900 rounded-3xl rounded-tl-none max-w-[50%] break-words">
   						          {msg.photos && (
                          <div className="grid grid-cols-2 lg:grid-cols-3 p-2">
                              {msg.photos.length > 0 && msg.photos.map((photo, idx) => (
                                <NavLink to={photo} target="_blank"> 
                                  <img src={photo} 
                                    className="border h-32 w-32 object-cover rounded-md"
                                    alt=""/>
                                </NavLink>
                              ))}
                            </div>
                          )}
                          <span className="px-2 py-1 text-gray-900"
                          	>{msg.text}
                          </span>
                          <span className="text-gray-600 flex justify-end px-3 text-xs font-extralight">{getTime(msg.createdAt)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="flex flex-col border border-gray-200 bg-gray-200 px-1 py-2 my-1 text-gray-900 rounded-3xl rounded-tr-none max-w-[50%] break-words">
       						      {msg.photos && (
       						  	    <div className="grid grid-cols-2 lg:grid-cols-3 p-2">
	                          	{msg.photos.length > 0 && msg.photos.map((photo, idx) => (
	                          		<NavLink to={photo} target="_blank"> 
	                          			<img src={photo} 
	                          				className="border h-32 w-32 object-cover rounded-md"
	                          				alt=""/>
	                          		</NavLink>
	                          	))}
                          	</div>
                          )}
                          <span className="px-2 py-1 text-gray-900"
                          	>{msg.text}
                          </span>
                          <span className="text-gray-600 flex justify-end px-3 text-xs font-extralight">{getTime(msg.createdAt)}</span>
                        </div>
                      </div>
                    ) } 
                  </div>
                ))}
            </div>
	</>)
}


export default Chat; 