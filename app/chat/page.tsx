'use client';
import React, { useRef, useState } from 'react';
import Chat from './chat';

export default function Page() {

    const inputChatRef = useRef<HTMLInputElement | null>(null);
    const [room, setRoom] = useState<any>(null);
    return (
        <div>
            <h1>Chat</h1>
            <div className='flex jusitfy-center'>
                {!room ?
                    <>
                        <h1>Chat room</h1>
                        <input ref={inputChatRef} />
                        <button onClick={() => setRoom(inputChatRef.current?.value)}>Enter Chat room </button>
                    </>
                    :
                    <Chat room={room} />}
            </div>
        </div>
    )
}
