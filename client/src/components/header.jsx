import React, {useState , useEffect , useContext} from 'react' 
import {NavLink , useNavigate} from 'react-router-dom' 
import {UserContext} from '../userContext'
import axios from 'axios'
import Image from './image'
import profileImage from '../images/profile.webp'


const Header = ({user}) => {
  if(!user) return null; 

  const navigate = useNavigate() 
  const {profile , setProfile } = useContext(UserContext) 

  const isSame = profile?.username === user?.username 
  const [profileImage ,setProfileImage] = useState({}); 
  const [coverImage , setCoverImage] = useState({}) ; 

  const handleImage = async (e , type ) => {
    e.preventDefault() ;
    const image = e.target?.files[0] ,
     preview = URL.createObjectURL(image) 
     console.log({type})
    if(type === 'profile' ) setProfileImage({image , preview}); 
    else if(type === 'cover') setCoverImage({image , preview});
  }
  
  // console.log({profile_:user?.profileImage, cover_:user?.coverImage})

 const logout = async () => {
  const confirmation = window.confirm("Are you sure you want to log out?");

  if (confirmation) {
    try {
      const logoutResponse = await axios.get('/auth/logout', { withCredentials: true });
      if (logoutResponse?.data?.success) {
        setProfile(null); 
        navigate('/');
      }
    } catch (error) {
      console.log({ error });
    }
  }
};


  const cancelChange = async (e , type) => {
    e.preventDefault() ; 
    if(type === 'profile' ) setProfileImage({}); 
    else if(type === 'cover') setCoverImage({});
  }

  const uploadImage = async (e,type) => {
    e.preventDefault() ; 
    try{
      const data = new FormData() ; 
      if(type === 'profile') data.append('photos' , profileImage.image);
      else if(type === 'cover') data.append('photos' , coverImage.image); 

      const response = await axios.post('/images/upload', data , { withCredentials:true }); 
      if(response?.data) {
        const imagePath = response.data.images[0] 
        console.log({response})
        let updatedUser = user 
        if(type === 'profile')updatedUser.profileImage = imagePath 
        else if(type === 'cover') updatedUser.coverImage = imagePath 
        const uploadResponse = await axios.post('/user/update' , {
          user:updatedUser 
        },{withCredentials:true}) ; 

        if(uploadResponse?.data){
          setProfile(uploadResponse.data.user) ; 
          if(type === 'profile' ) setProfileImage({}); 
          else if(type === 'cover') setCoverImage({})
        }
      }
    }
    catch(error){
      console.log({message:error.message})
      if(type === 'profile') setProfileImage({}) ; 
      else if(type === 'cover') setCoverImage({});
    }
  }

  // const profilePic = `http://localhost:4000/uploads/${user.profileImage.name.pad+user.profileImage.name.original}`; 
  // console.log({profilePic})

  return (<> 

      <div className="p-2">
        <div className="relative flex">
            <div className="relative w-full h-64 border rounded-md border-gray-300">
                {coverImage?.image ? (
                    <img className="w-full object-cover h-64 rounded-md"
                      src={coverImage.preview} alt="cover-preview"/>
                  ):(
                    <img src={user?.coverImage}
                      className="w-full object-cover h-64 rounded-md"
                      alt="cover-image"
                      />
                  )}

              {/*--------------camera icon, confirmation and cancellation icon*/}
              {isSame && ( 
                <label onChange={ (e) => handleImage(e,'cover') }
                  htmlFor="coverFileInput" className="cursor-pointer absolute mx-0.5 bottom-0 right-0 text-gray-500 hover:text-white">
                  <input type="file" accept="image/*" id="coverFileInput" className="hidden" />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                </label> 
              )}

              {isSame && coverImage?.image && (
                <div className="absolute flex gap-1.5  mx-auto mb-1 text-sm -bottom-0 right-8 cursor-pointer">
                  <button onClick = {(e) => cancelChange(e,'cover') }
                    className="shadow-md bg-sky-900 text-white rounded-md px-2">Cancel</button>
                  <button onClick={(e) => uploadImage(e,'cover')}
                    className="shadow-md bg-sky-900 text-white rounded-md px-2">Confirm</button>
                </div>
              )}
            </div>
            

              <div className="absolute bottom-0 flex gap-2 justify-between w-full translate-y-[103%]">
                <div className="flex justify-between translate-x-6"> 
                  <div className="flex -translate-y-[40%] translate-x-2">
                    {profileImage?.image ? (
                      <img className="w-36 h-36 object-cover rounded-full border-2 border-gray-200"
                        src={profileImage.preview} alt="profile-preview"/>
                    ): user?.profileImage? (
                      <img src={user?.profileImage}
                        className="w-36 h-36 object-cover rounded-full border-2 border-gray-200"
                        alt="profile-image"
                        />
                    ):(
                      <img src={profileImage}
                        className="w-36 h-36 object-cover rounded-full border-2 border-gray-200"
                        alt="profile-image"
                        />
                    )}

                    {/*--------------camera icon, confirmation and cancellation icon*/}
                    {isSame && ( 
                      <label onChange = { (e) => handleImage(e,'profile') }
                         htmlFor="profileFileInput" className="relative top-[78%] right-[48%] rounded-2xl text-gray-500 hover:text-white cursor-pointer">
                        <input type="file" accept="image/*" id="profileFileInput" className="hidden" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                          <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                      </label>
                    )}{isSame && profileImage?.image && (
                        <div className="absolute flex gap-1.5  mx-auto mb-1 text-sm -bottom-7">
                          <button onClick = {(e) => cancelChange(e,'profile') }
                            className="shadow-md bg-sky-900 text-white rounded-md px-2 py-0.5 cursor-pointer">Cancel</button>
                          <button onClick={(e) => uploadImage(e,'profile')}
                            className="shadow-md bg-sky-900 text-white rounded-md px-2 py-0.5 ">Confirm</button>
                        </div>
                    )}
                  </div>
                  <div className="flex flex-col translate-x-4">
                    <span className="text-xl font-semibold text-gray-800">
                      {user.name}
                    </span>
                    <span className="text-gray-600 text-xs -mt-1">
                      @{user.username}
                    </span>
                  </div>
                </div>
                { isSame && (
                  <div className="py-6">
                    <button onClick={logout}
                      className="flex gap-2 border items-center border-gray-200 bg-slate-100 hover:bg-slate-300 hover:border-gray-200 py-1 px-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z" clipRule="evenodd" />
                      </svg>
                      <span className=''>Log-out</span>
                    </button>
                </div>
              )}
              </div>

            </div>
          </div>
    </>)
}

export default Header ; 