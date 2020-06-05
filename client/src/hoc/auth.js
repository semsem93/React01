import React, { useEffect }from 'react';
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

export default function (SpecificComponet, option, adminRoute =null) {

    // option null -> 아무나 출입 가능한 페이지
    // true -> 로그인한 유저만 출입이 가능한 페이지
    // false -> 로그인한 유저는 출입 불가능한 페이지
    // adminRoute는 admin만 출입 가능한 페이지

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
           dispatch(auth()).then(response => {
               console.log(response)

               //로그인 하지 않은 상태
               if(!response.payload.isAuth){
                   if(option){
                       // 로그인 안했으니까 다른 페이지로 못가도록 막아버려
                       props.history.push('/login')
                   }
               }else{
                   //로그인한 상태
                   if(adminRoute && !response.payload.isAdmin){
                       // admin만 갈 수 있는데 admin이 아니면 랜딩 페이지밖에 못감
                       props.history.push('/')
                   }else{
                       // admin이 아니어도 진입 가능
                       if(option === false){
                           // 로그인한 유저가 로그인이나 회원가입 같은 거를 들어가면 안되기 때문에 랜딩으로 이동
                           props.history.push('/')
                       }
                   }
               }
           })
        }, [])
        return (
            <SpecificComponet />
        )
    }
    return AuthenticationCheck
}