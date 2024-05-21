import React, {useState} from 'react'
import axios from 'axios'
import List from './List'

const Form = () => {
  const [formData, setFormData] = useState({
      username: '',
      userpass: '',
      title: '',
      contents: ''
  });
  const [resMessage, setResMessage] = useState('');
  
  const handleChange = (e) => {
     e.preventDefault();
     const { name, value } = e.target;
     setFormData({
        ...formData,
        [name] : value
     });
  }

  const handleSubmit = async (e) => {
     e.preventDefault();
     if(formData.username === '') {
         alert("이름을 입력하세요");
     }
     try{
       const response = await axios.post('/api', formData);
       setResMessage(response.data.message);  //node에서 전송한 메시지
     }catch(error){
        console.error(error);
     }  
  };
  
  return (
    <div style={{width:"800px", margin:"auto"}}>
        <h1 style={{textAlign:"center"}}>게시판 글쓰기</h1>
        <form onSubmit={handleSubmit}>
          <div style={{padding:"20px"}}>  
            <label htmlFor="username">이름</label>
            <input type="text" 
                   name="username" 
                   id="username" 
                   value={formData.username} 
                   onChange={handleChange} />
          </div>
          <div style={{padding:"20px"}}>  
            <label htmlFor="userpass">비밀번호</label>
            <input type="password" 
                   name="userpass" 
                   id="userpass" 
                   value={formData.userpass}
                   onChange={handleChange}  />
          </div>
          <div style={{padding:"20px"}}>
            <label htmlFor="title">제목</label>
            <input type="text" 
                   name="title" 
                   id="title" 
                   value={formData.title}
                   onChange={handleChange} />  
          </div>  
          <div style={{padding:"20px"}}>
            <label>내용</label>
            <textarea name="contents" id="contents" 
                      rows="7" 
                      style={{width:"100%"}}
                      onChange={handleChange}>
             {formData.contents}
            </textarea>
          </div>
          <div style={{textAlign:"center"}}>
             <button type="submit"> 전송 </button>
          </div>
        </form>
        { resMessage && <List resMessage={resMessage} /> }
    </div>
  )
}

export default Form