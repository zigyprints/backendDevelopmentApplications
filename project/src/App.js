
import Messenger from "./component/Messenger";
import AccountProvider from "./context/AccountProvider";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const clientId='308467156436-olalnrk07ufmf65q6od5j8ltf1umn9sh.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider clientId={clientId}>
     
      <AccountProvider >
            <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
