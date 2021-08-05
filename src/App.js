import React, {useState} from 'react'
import { authService, firebaseInstance } from './fBase';

// 로그인을 얻기위한 기초 정보준비 
const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true); // 새로운 유저 확인여부


   // 로그인시 이벤트 
   const onChange = (event) => {
    const {target: {name, value}} = event;

    if (name === 'email') {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 회원가입 이벤트가 발생할경우 새로운 생성자를 만들어줌
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // 회원가입 한 유저가 로그인시 이벤트
        data = await authService.signInWithEmailAndPassword(email,password);
      }
      console.log(data);
    } catch(error) {
      console.log(error)
    }
  }
  
  // 로그아웃 시 구현
   const onLogoutClick= () => {
     authService.signOut();
    }
    
  
    const toggleAccount = () => setNewAccount((prev) => !prev);

      // 구글 구현 
      const onGoogleClick = async (event) => {
        const {target: {name}} = event;
        let provider;
        if (name === 'google') {
          provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
      }
    
    


   // 이메일과 비밀번호로 인증할 input 창을 만들어줌 
   // onChange에서 email과 password 정보 저장 
   // 이제 firebase의 auth를 이용해 로그인을 구현하자
  return (
     <> 
       <div>
         <form onSubmit={onSubmit}>
           <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
           <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} />
            {/* 로그인 했다 ?? 하면 회원가입 유저와 기존 유저가 로그인할때를 구분해줌 */}
           <input type="submit" value={ newAccount ? "Create Account" : "Login" } />    
         </form>
         <span onClick={toggleAccount}>{newAccount ? "Login" : "Craete Account"}</span>
         <button name="google" onClick={onGoogleClick}>구글 계정으로 로그인</button>
         <button name="singout" onClick={onLogoutClick}>로그아웃</button>
       </div>
     </>
  );
}

export default App;
