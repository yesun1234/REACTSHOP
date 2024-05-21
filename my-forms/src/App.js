import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [myform, setMyform] = useState({
      email: "",
      pwd: ""
  });
  const [isChecked, setIsChecked] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
const handleChange = (e) => {
   e.preventDefault();
   const { name, value } = e.target;
   console.log(name, ":", value);
   setMyform({
      ...myform,
      [name] : value
   });
}  

const handleCheckboxChange = (e) => {
   setIsChecked(e.target.checked);
}

const handleSubmit = async (e) => {
   e.preventDefault();
   //폼검증...
   const myforms = {
        email: myform.email,
        pwd: myform.pwd,
        isChecked
   };
   try{
      const res = await axios.post('/api', myforms);
      setResponseMessage(res.data);
      setMyform({
        email: "",
        pwd: ""
      });
      setIsChecked(false);
   }catch(error) {
      console.error(error);
   }
}

  return (
    <div className="container">
       <h1 className="my-5 text-center">MY FORM</h1>

       { responseMessage ? 
          <div>
             <ul>
                 <li>이메일 {responseMessage.email}</li>
                 <li>비밀번호 {responseMessage.pwd}</li>
                 <li>기억 {responseMessage.remember}</li>
             </ul>
          </div>
       :
       <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
             <label htmlFor="email" className="form-label">Email:</label>
             <input type="text" 
                    className="form-control" 
                    id="email" 
                    placeholder="Enter email" 
                    name="email" 
                    value={myform.email}
                    onChange={handleChange}
             />
          </div>

          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">Password:</label>
            <input type="password" 
                   className="form-control" 
                   id="pwd" 
                   placeholder="Enter password" 
                   name="pwd"
                   value={myform.pwd} 
                   onChange={handleChange}
                   />
          </div>

          <div className="form-check mb-3">
            <label className="form-check-label">
              <input className="form-check-input" 
                     type="checkbox" 
                     name="remember"
                     checked={isChecked}
                     onChange={handleCheckboxChange}
              /> 기억하기
            </label>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        }
    </div>
  )
}

export default App