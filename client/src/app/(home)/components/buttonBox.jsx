'use client'

import Image from 'next/image'
import MakeBookImage from '../../../../public/image/makebook.png'
import PlayImage from '../../../../public/image/play.png'
import Shelf from '../../../../public/image/shelf.png'
import House from '../../../../public/image/house.png'
import Horse from '../../../../public/image/horse.png'
import ProfileImage from '../../../../public/image/profilebook.png'
import DoorImage from '../../../../public/image/door.png'
import { useRouter } from 'next/navigation'
import { Baby } from '@phosphor-icons/react/dist/ssr'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export default function ButtonBox() {
    const router = useRouter()
    const [userId, setUserId] = useState()
    const Swal = require('sweetalert2')

    useEffect(() => {
        if (
            !localStorage.getItem('userId') ||
            localStorage.getItem('userId').length <= 0
        ) {
            router.push('/landing')
            return
        }

        if (localStorage.getItem('userId'))
            setUserId(localStorage.getItem('userId'))
    }, [])

    const goProfile = () => {
        if (!userId) {
            Swal.fire({
                title: '앗!',
                text: '먼저 로그인을 해주세요!',
                icon: 'error',
                confirmButtonText: '네',
            })
            router.push('/login')
            return
        } else router.push('/profile')
    }

    const goMakeBook = () => {
        if (!userId) {
            Swal.fire({
                title: '앗!',
                text: '먼저 로그인을 해주세요!',
                icon: 'error',
                confirmButtonText: '네',
            })
            router.push('/login')
            return
        }
        setTimeout(() => {
            router.push('/makebook')
        }, 200)
    }

    const goBookList = () => {
        if (!userId) {
            Swal.fire({
                title: '앗!',
                text: '먼저 로그인을 해주세요!',
                icon: 'error',
                confirmButtonText: '네',
            })
            router.push('/login')
            return
        }
        setTimeout(() => {
            router.push('/bookList')
        }, 200)
    }
    const goMypage = () => {
        if (!userId) {
            Swal.fire({
                title: '앗!',
                text: '먼저 로그인을 해주세요!',
                icon: 'error',
                confirmButtonText: '네',
            })
            router.push('/login')
            return
        }
        setTimeout(() => {
            router.push('/mypage')
        }, 200)
    }
    const goPlay = () => {
        setTimeout(() => {
            router.push('/play')
        }, 200)
    }

    const goLogin = () => {
        router.push('/login')
    }

    const doLogout = () => {
        localStorage.setItem('childId', '')
        localStorage.setItem('userId', '')
        setUserId('')
        Swal.fire({
            title: '잘가요',
            text: '다음에 또 만나요!!',
            icon: 'success',
            confirmButtonText: '네에',
        })
    }

    useEffect(() => {}, [userId])
    return (
        <div className="h-dvh w-dvw">
            <div className="mr-2 flex h-auto justify-end pt-2">
                {userId ? (
                    <>
                        <button
                            className="btn btn-ghost relative ml-2 mt-2 h-auto w-1/12 text-lg font-thin text-white hover:bg-transparent focus:bg-transparent"
                            onClick={goProfile}
                        >
                            <Image
                                src={Horse}
                                alt="아이 선택"
                                width={70}
                                height={70}
                            />
                            아이 선택
                        </button>
                        <button
                            className="btn btn-ghost relative mt-2 h-auto w-1/12 text-lg font-thin text-white hover:bg-transparent focus:bg-transparent"
                            onClick={doLogout}
                        >
                            <Image
                                src={DoorImage}
                                alt="아이 선택"
                                width={80}
                                height={80}
                            />
                            나가기
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-ghost relative ml-2 mt-2 h-auto w-1/12 text-lg font-thin text-white hover:bg-transparent focus:bg-transparent"
                            onClick={goLogin}
                        >
                            <Image
                                src={Horse}
                                alt="아이 선택"
                                width={80}
                                height={80}
                            />
                            로그인
                        </button>
                    </>
                )}
            </div>
            <div className="flex h-1/3 w-full items-center justify-between pl-20 pr-80">
                <div className="relative flex flex-col items-center justify-center">
                    <button
                        className="btn btn-ghost flex h-auto w-6/12 -rotate-12 transform flex-col items-center justify-center text-5xl font-thin text-white hover:rotate-0 hover:bg-transparent focus:bg-transparent"
                        onClick={goMakeBook}
                    >
                        <Image
                            src={MakeBookImage}
                            alt={'make book logo'}
                            style={{
                                position: 'relative',
                                top: 0,
                                left: 0,
                            }}
                        />{' '}
                        <span className="sm:text-sm md:text-lg lg:text-5xl">
                            동화 만들기
                        </span>
                    </button>
                </div>
                <div className="relative flex flex-col items-center justify-center pr-12">
                    <button
                        className="btn btn-ghost flex h-auto w-8/12 rotate-12 transform flex-col items-center justify-center text-5xl font-thin text-white hover:rotate-0 hover:bg-transparent focus:bg-transparent"
                        onClick={goBookList}
                    >
                        <Image
                            src={Shelf}
                            alt={'make book logo'}
                            style={{
                                zIndex: 100,
                                position: 'relative',
                                top: 0,
                                left: 0,
                            }}
                        />
                        <span className="sm:text-sm md:text-lg lg:text-5xl">
                            동화 보기
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex h-1/3 w-full items-center justify-between pl-80 pr-40 pt-12">
                <div className="relative flex flex-col items-center justify-center">
                    <button
                        className="btn  btn-ghost flex h-auto w-6/12 rotate-12 transform flex-col items-center justify-center text-5xl font-thin text-white hover:rotate-0  hover:bg-transparent focus:bg-transparent"
                        onClick={goMypage}
                    >
                        <Image
                            src={House}
                            alt={'make book logo'}
                            style={{
                                zIndex: 100,
                                position: 'relative',
                                top: 0,
                                left: 0,
                            }}
                        />{' '}
                        <span className="sm:text-sm md:text-lg lg:text-5xl">
                            나의 그림
                        </span>
                    </button>
                </div>
                <div className="relative flex flex-col items-center justify-center">
                    <button
                        className="btn btn-ghost flex h-auto w-7/12 -rotate-12 transform flex-col items-center justify-center text-5xl font-thin text-white hover:rotate-0 hover:bg-transparent focus:bg-transparent"
                        onClick={goPlay}
                    >
                        <Image
                            src={PlayImage}
                            alt={'make book logo'}
                            style={{
                                zIndex: 100,
                                position: 'relative',
                                top: 0,
                                left: 0,
                            }}
                        />{' '}
                        <span className="sm:text-sm md:text-lg lg:text-5xl">
                            놀이터
                        </span>
                    </button>
                </div>
            </div>
            <div className="relative bottom-0 flex justify-end"></div>
        </div>
    )
}
