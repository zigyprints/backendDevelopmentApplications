
import { useContext, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";

import { googleLogout } from "@react-oauth/google";

import {Box,Typography,styled , MenuItem , Menu } from "@mui/material";
import {Search,MoreVert} from "@mui/icons-material";
// import { defaultProfilePicture } from "../../../constants/data";

const Header = styled(Box)`
height:44px;
background:#ededed;
padding:8px 16px;
display:flex;
align-items:center;
`;
const MenuOption=styled(MenuItem)`
font-size:14px;
padding:15px 60px 5px 24px;
color: #4A4A4A;
background:white;
`;
const Image=styled('img')({
    height:40,
    width:40,
    objectFit:'cover',
    borderRadius:'50%'
});
const Name=styled(Typography)`
margin-left:12px !important;
`;
const Status=styled(Typography)`
margin-left:12px !important;
font-size:12px;
color:rgb(0, 0, 0, 0.6);
`;
const RightContainer = styled(Box)`
margin-left:auto;
  & > svg {
    padding:8px;
    font-size:24px;
    color:#000;
  }
`;



const ChatHeader=({person})=>{
  const [open ,setopen]=useState(null);

    const handleClose=()=>{
        setopen(null);
    }

    const handleClick=(e)=>{
        setopen(e.currentTarget);
    }

  const handlelogout =()=>{
    handleClose(false);
    try {
        googleLogout();
        window.location.reload();
    }
    catch(error){
        console.log("unable");
    }

}

  const {activeUsers}= useContext(AccountContext);
    return(
        <Header>
            <Image src={person.picture} alt="dp" />
            <Box>
                <Name>{person.name}</Name>
                <Status>{activeUsers?.find(user => user.sub ===person.sub) ? 'Online':'Offline'} </Status>
            </Box>
            <RightContainer>
              <Search/>

              <MoreVert onClick={handleClick} />

              <Menu
                  anchorEl={open}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  getContentAnchorE1={null}
                  anchorOrigin={{
                      vertical:"bottom",
                      horizontal:"center"
                  }}
                  transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                  }}
                      
              >
                 
                  
                   <MenuOption onClick={handlelogout}>
                    Logout
                  </MenuOption>
              
              </Menu>
             
            </RightContainer>
        </Header>
    )
}
export default ChatHeader;