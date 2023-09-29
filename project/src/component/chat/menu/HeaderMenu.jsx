
import {  MoreVert } from "@mui/icons-material";
import { Menu, MenuItem,styled } from "@mui/material";
import { googleLogout } from '@react-oauth/google';

//{/* import {googleLogout} from "@react-oauth/google";
// import { AccountContext } from "../../../context/AccountProvider";
// import {clientId} from "../../../constants/data";
// import { UserContext } from "../../../context/UserProvider";*/}

import { useState } from "react";
const MenuOption=styled(MenuItem)`
font-size:14px;
padding:15px 60px 5px 24px;
color: #4A4A4A;
background:white;
`;
//  const Logout = styled(googleLogout)`
//      border:none;
//      box-shadow:none;
// `;

const HeaderMenu = ({setOpenDrawer}) => {
   

    // const {setAccount,showlogoutButton,setShowlogoutButton} = useContext(AccountContext);
    // const {setPerson} = useContext(UserContext);
    const [open ,setopen]=useState(null);

    const handleClose=()=>{
        setopen(null);
    }

    const handleClick=(e)=>{
        setopen(e.currentTarget);
    }

    // const onSignoutSuccess = ()=>{
    //     alert("You have been logged out successfully");
    //     console.clear();
    //     setShowlogoutButton(false);
    //     setAccount('');
    //     setPerson({});

    // }

    return (
        <>
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
                <MenuOption onClick={()=>{handleClose(); setOpenDrawer(true);}}>Profile</MenuOption>
                
                 
            
            </Menu>
        </>

    )


}
export default HeaderMenu;