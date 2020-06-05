import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';


function RegisterPage(props) {
    const dispatch = useDispatch();
    
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    
    const onEmailHandler = (event) => {
        setemail(event.currentTarget.value)
    }
    
    const onPassworHandler = (event) => {
        setpassword(event.currentTarget.value)
    }
    
    
    const onNameHandler = (event) => {
        setname(event.currentTarget.value)
    }
    
    const onconfirmPasswordHandler = (event) => {
        setconfirmPassword(event.currentTarget.value)
    }

    const onsubmitHandler = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            return alert('비밀번호가 맞지 않습니다.');
        }

        // 페이지가 리프래쉬 되는 것을 막기 위한... 코드
        //console.log(email, password)
        let body = {
            email: email,
            name: name,
            password: password
        }

        dispatch(registerUser(body))
        .then(response => {
            console.log(response)
            if(response.payload.success){
                props.history.push('/login')
            }else{
                alert('error')
            }
        })
    }

    return (
        <div style = {{ display:'flex', justifyContent: 'center', alignContent: 'center',
        width: '100%', height: '100vh'}}>
            <form style={{ display:'flex', flexDirection:'column'}}
                onSubmit={onsubmitHandler}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={password} onChange={onPassworHandler} />
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={onconfirmPasswordHandler} />
                <br />
                <button>
                   Join 
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)