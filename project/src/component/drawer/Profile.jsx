
import { Box ,styled,Typography} from "@mui/material";
import { useContext } from "react";

import { AccountContext } from "../../context/AccountProvider";

const ImageContainer=styled(Box)`
display:flex;
justify-content:center;
`;
const Image =styled('img')({
    width:125,
    height:125,
    borderRadius:'50%',
    padding:'25px 0'

});
const BoxrWrapper=styled(Box)`
background:#FFFFFF;
padding:12px 30px 2px;
box-shadow:0 1px 3px rgba(0, 0, 0, 0.08);
& :first-child{
    font-size:13px;
    color:#009688;
    font-weight:200;
}
& :last-child{
    margin:14px 0;
    color:#4A4A4A;
}
`;
const DiscriptionContainer=styled(Box)`
padding:15px 20px 28px 30px;
& > p{
    font-size:13px;
    color:#8696a0;
}
`

const Profile =()=>{
    const { account }=useContext(AccountContext);
    return(
        <>
        <ImageContainer>
            <Image src={account.picture} alt="dp" />
        </ImageContainer>
        <BoxrWrapper>
           <Typography>Your Name</Typography>
           <Typography>{account.name}</Typography>
        </BoxrWrapper>
        <DiscriptionContainer>
            <Typography>This not your username or pin. This name will be visible to your  contacts. </Typography>
        </DiscriptionContainer>
        <BoxrWrapper>
            <Typography>About</Typography>
            <Typography>Without struggle, strength is absent</Typography>
        </BoxrWrapper>
        
         </>
    )
}
export default Profile;