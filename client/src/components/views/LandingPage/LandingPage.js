import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => {console.debug(response)})
    },[])

    const onClickHandler = () => {
        axios.get('/api/users/logout').then(response => {
            if(response.data.success){
                props.history.push("/login")
            }else{
                alert('logout fail')
            }
        })
    }

    return (
        <div style = {{ display:'flex', justifyContent: 'center', alignContent: 'center',
        width: '100%', height: '100vh'}}>
            <h2> 시작 페이지 </h2>
            <button onClick={onClickHandler}> logout </button>
        </div>
    )
}

export default withRouter(LandingPage)