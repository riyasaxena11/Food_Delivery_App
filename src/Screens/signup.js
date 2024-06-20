import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function signup() {
const [credentials, setcredentials] = useState({name:"",email:"",password:"",Geolocation:""})
const navigate = useNavigate();
const handleSubmit = async(e) =>{

    e.preventDefault();   //synthetic event

    console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.Geolocation}))
    const response = await fetch("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.Geolocation})
    })
    const json= await response.json()
    console.log(json);
    if(!json.success){
        alert("Enter valid credentials")
    }
    else if (json.success) {
        navigate('/login');
    } else {
        alert("Enter valid credentials or handle specific errors");
    }
}
const onChange =(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
}

    return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' , display:'flex',justifyContent: 'center', alignItems: 'center' }}>
    <div className="container" style={{maxWidth: '500px',backgroundColor:'black', padding: '20px', borderRadius: '15px'}}>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
        <input type="text" className="form-control" name='Geolocation' value={credentials.Geolocation} onChange={onChange} id="exampleInputPassword1"/>
    </div>
    <button type="submit" className="m-3 btn btn-success">Submit</button>
    <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
    </form>
    </div>
    </div>
    )
}
