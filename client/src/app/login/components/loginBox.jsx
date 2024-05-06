'use client'

import { HouseLine } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'

export default function LoginBox() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter()
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')

    const goHome = () => {
        router.push('/')
    }
    
    const handleUserId = (e) => {
        setUserId(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const goSignup = () => {
        router.push("/signup")
    }

    const doLogin = async () => {
        try {
            const response = await axios.post(`${apiUrl}/user/login`, {
                loginId: userId,
                password: password
            })
            if (response.data.status == 'success') {
              localStorage.setItem('userId', response.data.data.userId)
              alert("로그인 성공!")
              router.push("/")
            } else {
                alert("아이디가 없거나, 비밀번호가 틀렸습니다! 다시 입력해주세요!")
            }
        } catch (error) {
            alert("아이디가 없거나, 비밀번호가 틀렸습니다! 다시 입력해주세요!")
            console.error("Login error: ", error)
        }
    }


    return (
        <>
        <div className="z-100 fixed top-4 left-4 cursor-pointer border-2 rounded-2xl p-2" onClick={goHome}><HouseLine size={32} style={{color: 'white'}} /></div>
            <div className="w-2/5 h-3/6 bg-customPink z-100 fixed top-[25%] right-[8%] rounded-3xl opacity-85 flex flex-col justify-center items-center">
                <div className="w-11/12 p-8 pt-4">
                    <div className="text-4xl text-black font-bold mb-1">아이디</div>
                    <input className="rounded-xl h-14 w-full bg-white text-black pl-2 outline-customGreen text-2xl" onChange={handleUserId}></input>
                </div>
                <div className="w-11/12 px-8">
                    <div className="text-4xl text-black font-bold mb-1">비밀번호</div>
                    <input type="password" className="rounded-xl h-14 w-full bg-white text-black pl-2 outline-customGreen text-2xl" onChange={handlePassword}></input>
                </div>
                <div className="w-11/12 px-8 mt-8 flex justify-between">
                    <div className="flex flex-col w-2/3">
                        <div className="text-xl font-bold">아직 회원이 아니세요?</div>
                        <div className="text-4xl font-bold">
                        <button onClick={goSignup}><span className="text-customPurple">회원가입</span>하기</button>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <button className="btn btn-sm mb-2 mt-4 h-12 w-full bg-customYellow text-black text-lg shadow-customShadow hover:bg-customYellow border-none"
                                onClick={doLogin} >
                        로그인
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}