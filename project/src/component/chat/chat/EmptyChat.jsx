
import { Box,Typography,styled,Divider } from "@mui/material";
import {emptyChatImage} from "../../../constants/data"
const Component =styled(Box)`
background:#f8f9fa;
padding:30px 0;
text-align:center;
height:100%;
`;
const Container =styled(Box)`
padding: 0 120px;
`;
const Image=styled("img")({
    width:500,
    marginTop:50
});
const Title=styled(Typography)`
font-size:32px;
margin:2px 0 15px 0;
font-family:inherit;
font-weight:300;
color:#41525d
`;
const SubTitile=styled(Typography)`
font-size:14px;
color:#667781;
font-weight:400;
font-family:inherit;
`;
const StyledDivider=styled(Divider)`
margin:40px 0;
opacity:0.4;
`;


const EmptyChat= ()=>{
    return(
        <Component>
            <Container>
                <Image src={emptyChatImage} alt="image" />
                <Title>RT-Chat App</Title>
                <SubTitile>Now sending and receive messages whithout keeping phone online. </SubTitile>
                <SubTitile>Use RT-Chat on up to 4 linked device and 1 phone at same time.</SubTitile>
                <StyledDivider/>
            </Container>
            
        </Component>
    )
}

export default EmptyChat;