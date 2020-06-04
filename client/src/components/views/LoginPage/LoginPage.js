import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch();
    
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    
    const onEmailHandler = (event) => {
        setemail(event.currentTarget.value)
    }
    
    const onPassworHandler = (event) => {
        setpassword(event.currentTarget.value)
    }
    
    const onsubmitHandler = (event) => {
        event.preventDefault();
        // 페이지가 리프래쉬 되는 것을 막기 위한... 코드
        //console.log(email, password)
        let body = {
            email: email,
            password: password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess){
                props.history.push('/')
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
                <label>Password</label>
                <input type="password" value={password} onChange={onPassworHandler} />
                <br />
                <button>
                   login 
                </button>
            </form>
        </div>
    )
}

export default LoginPage