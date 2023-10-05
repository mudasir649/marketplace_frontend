'use client';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '@/utils/firebase-config';
import { useSelector } from 'react-redux';
import { storage } from '@/utils/firebase-config';

export default function Chat({ room }: any) {
    const [message, setMessage] = useState<any>('');
    const [newMessages, setNewMessages] = useState<any>([]);
    const { userInfo } = useSelector((state: any) => state.auth);
    const userName = userInfo?.data?.userDetails?.userName;
    const messageRef = collection(db, "messages");
    const [image, setImage] = useState<any>(null);

    useEffect(() => {
        const queryMessage = query(messageRef, where("room", "==", room));
        onSnapshot(queryMessage, (snapshot) => {
            let messages: any = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setNewMessages(messages);
        })
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (message === "") return;

        await addDoc(messageRef, {
            text: message,
            createdAt: serverTimestamp(),
            user: userName,
            room
        })
    }

    const handleImage = (e: any) => {
        if (e.target.files) {
            setImage(e.target.files);
        }
    }

    // const handleUpload = () => {
    //     if(image){
    //         const uploadTask = storage.ref
    //     }
    // }

    return (
        <div>
            <form method='post' onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setMessage(e.target.value)} />
                <button type='submit'>Send</button>
            </form>
            <div>
                {newMessages.map((message: any, i: number) => (
                    <li key={i}>{message.text}</li>
                ))}
                <input type="file" onChange={(e) => handleImage(e)} multiple />
            </div>
        </div>
    )
}
