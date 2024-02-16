import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef } from 'react'
import { SpeakingContext } from '../../../context/ChatContext'
import { QueryContext } from '../../../context/CommonContext'

export default function SpeechButton() {
    const {isSpeaking, setSpeaking} = useContext(SpeakingContext)
    const {setMessage} = useContext(QueryContext)
    const recognition = useRef(new webkitSpeechRecognition());
    if (!isSpeaking) {
        recognition.current.stop();
    }
    useEffect(() => {
        recognition.current.lang = 'ru-RU',
        recognition.current.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;
        function recognitionSpeech(e) {
            let finalSpeech = ''
            for (let i = e.resultIndex; i < e.results.length; i++) {
                if (e.results[i].isFinal) {
                    finalSpeech += e.results[i][0].transcript
                }
            }
            setMessage((prevMess) => `${prevMess} ${finalSpeech}`)
        }
        recognition.current.addEventListener('result', recognitionSpeech)
        return () => {
            recognition.current?.removeEventListener('result', recognitionSpeech)
        }
    }, [])

    function handleSpeechRecognition(e) {
        try {
            if (!isSpeaking) {
                recognition.current.start()
                setSpeaking(true)
            } else {
                recognition.current.stop()
                setSpeaking(false)
            }
        } catch(e) {
            setSpeaking(false)
            throw new Error(`the voice wasn't recognized`)
        }
    }
    return (
        <button onClick={handleSpeechRecognition} type='button' className={'button flex items-center justify-center hover:text-sendMessage ' + (isSpeaking ? "animate-recordingSpeech text-sendMessage" : "")}>
            <FontAwesomeIcon className='w-6 h-6' icon={faMicrophone}/>
        </button>
    )
}
