'use client'

import React, { useState, useEffect, useRef } from 'react'
import * as headbreaker from 'headbreaker'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Swal from 'sweetalert2'
import NewImage from 'next/image'
import NextImage from '../../../public/image/puzzle-next.png'
import AnswerImage from '../../../public/image/puzzle-answer.png'
import SketchImage from '../../../public/image/puzzle-sketch.png'
import { ArrowCircleLeft } from '@phosphor-icons/react/dist/ssr'

function DemoJigsaw(props) {
    const Swal = require('sweetalert2')
    const puzzleRef = useRef(null)
    const [canvas, setCanvas] = useState(null)
    const [resetTrigger, setResetTrigger] = useState(0)
    // const [shuffleTrigger, setShuffleTrigger] = useState(0)
    const [sketchOpacity, setSketchOpacity] = useState(0.55)
    const router = useRouter()

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            const newCanvas = new headbreaker.Canvas(puzzleRef.current.id, {
                width: props.width,
                height: props.height,
                pieceSize: props.pieceSize,
                strokeWidth: 2,
                lineSoftness: 0.18,
                image: img,
                fixed: true,
                outline: new headbreaker.outline.Rounded(),
                painter: new headbreaker.painters.Konva(),
                // borderFill: props.pieceSize / 10,
                // proximity: props.pieceSize / 5,
                // strokeColor: 'white',
            })

            newCanvas.adjustImagesToPuzzleWidth();
            newCanvas.autogenerate({
                horizontalPiecesCount: 3,
                verticalPiecesCount: 3,
                insertsGenerator: headbreaker.generators.flipflop,
                // insertsGenerator: headbreaker.generators.random,
            })
            
            if (resetTrigger === 0) {
                newCanvas.shuffle(0.5)
                // newCanvas.puzzle.pieces[1].translate(50, -50);
            }
            
            newCanvas.draw()
            setCanvas(newCanvas)

            newCanvas.attachSolvedValidator()
            newCanvas.onValid(() => {
                setTimeout(() => {
                    Swal.fire({
                        title: '정답입니다! 다음 퍼즐도 풀어볼까요?',
                        icon: 'success',
                        confirmButtonText: '네!',
                        showDenyButton: true,
                        denyButtonText: `아니오`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload()
                        }
                    });
                }, 500)
            })

        }
        img.src = props.imageSrc

        return () => {
            if (canvas && typeof canvas.destroy === 'function') {
                canvas.destroy()
            }
        }
    }, [
        props.imageSrc,
        props.width,
        props.height,
        props.pieceSize,
        resetTrigger,
    ])

    //다시 섞고 싶을 때
    // useEffect(() => {
    //     if (shuffleTrigger > 0 && canvas) {
    //         canvas.shuffle(0.5)
    //         canvas.redraw()
    //     }
    // }, [shuffleTrigger, canvas])

    // const shufflePuzzle = () => {
    //     setShuffleTrigger((prev) => prev + 1)
    // }

    const resetPuzzle = () => {
        // setShuffleTrigger(0) 
        setResetTrigger((prev) => prev + 1)
    }
    
    const sketchToggle = () => {
        setSketchOpacity(prevOpacity => prevOpacity === 0.55 ? 0.01 : 0.55)
    }

    const nextPuzzle = () => {
        Swal.fire({
            title: '다음 퍼즐로 넘어갑니다!',
            icon: 'success',
            confirmButtonText: '네!'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload()
            }
        });
    }
    
    const goBack = () => {
        router.push('/')
    }

    return (
        <>  
            <div style={{ width: '80%', display:'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button
                    className="btn btn-ghost relative ml-2 h-auto pt-2 align-middle text-lg font-thin text-white hover:bg-transparent focus:bg-transparent"
                    onClick={goBack}
                >
                    <ArrowCircleLeft
                        size={80}
                        weight="fill"
                        className="text-black"
                    />
                </button>
                <div style={{ fontSize: '3rem', marginLeft: '100px' }}>
                    퍼즐놀이
                </div>
                <div>
                    <button
                        onClick={resetPuzzle}
                        style={{ width: '90px' }}
                    >
                        <NewImage
                            src={AnswerImage}
                            alt={'go to next puzzle'}
                        />
                        <span >
                            정답 보기
                        </span>
                    </button>
                    <button
                        onClick={sketchToggle}
                        style={{ width: '90px' }}
                    >
                        <NewImage
                            src={SketchImage}
                            alt={'go to next puzzle'}
                        />
                        <span>
                            힌트 보기
                        </span>
                    </button>
                    <button
                        onClick={nextPuzzle}
                        style={{ width: '85px' }}
                    >
                        <NewImage
                            src={NextImage}
                            alt={'go to next puzzle'}
                        />
                        <span >
                            다음 퍼즐
                        </span>
                    </button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div
                    ref={puzzleRef}
                    id={props.id}
                    style={{ position: 'relative', border: '6px solid #020715', borderRadius: '8px' }}
                >
                </div>
                <img 
                    src={props.imageSrc}
                    style={{ position: 'absolute',opacity: sketchOpacity, zIndex: '-1', left: '55%', border: '15px solid #790000' }}
                /> 
            </div>
        </>
    )
}

export default function Puzzle() {
    const [pieceSize, setPieceSize] = useState(170)
    const [width, setWidth] = useState(1300)
    const [height, setHeight] = useState(600)
    const [childAgeCheck, setChildAgeCheck] = useState('')
    const [pagePictureUrl, setPagePictureUrl] = useState('')
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const getPageImage = async () => {
        try {
            const childId = localStorage.getItem('childId')
            const response = await axios.get(`http://localhost:8080/page/puzzle-image/${childId}`)
            
            if (response.data.status == 'success') {
                setChildAgeCheck(response.data.data.childAgeCheck)
                setPagePictureUrl(response.data.data.pagePictureUrl)
                console.log(response.data.data.pagePictureUrl)
            } else {
                console.error('Failed to get PageImage: ', error)
            }
        } catch (error) {
            console.error('Failed to get PageImage: ', error)
        }
    }

    useEffect(() => {
        getPageImage()
    }, [])

    return (
        <div 
            className="h-dvh w-dvw bg-customYellow"
            style={{ zIndex: '-2', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <DemoJigsaw
                id="puzzle"
                pieceSize={pieceSize}
                width={width}
                height={height}
                imageSrc={pagePictureUrl}
            />
        </div>
    )
}