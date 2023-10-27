'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '@/utils/firebase-config';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import addInvertedComma from '@/utils/addInvertedComma';
import { ArrowBackIos, CameraAlt, CameraAltOutlined, Cancel, DeleteForever } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { get, getDatabase, onValue, push, ref, set } from 'firebase/database';
import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "@firebase/storage";
import "./chat.css";
import Home from '@/components/Home';
import moment from "moment";
import dynamic from 'next/dynamic';
import { NextFetchEvent } from 'next/server';
import useWindowDimensions from '@/utils/useWindowDimensions';

interface Message {
    senderId: string;
    text: string[];
    timestamp: number;
}

interface MessageData {
    [key: string]: Message;
}

interface NewMessages {
    [key: string]: MessageData;
}

function Chat() {
    const { userInfo } = useSelector((state: any) => state.auth);
    const { roomsData } = useSelector((state: any) => state.app);
    const userId = userInfo?.data?.userDetails?._id;

    const [message, setMessage] = useState<any>('');
    const [newMessages, setNewMessages] = useState<any>([]);
    const [unreadRooms, setUnreadRooms] = useState<any>([]);
    const [selected, setSelected] = useState<any>({});
    const [loading, setLoading] = useState<Boolean>(true);
    const [imageLoading, setImageLoading] = useState<Boolean>(false);
    const [chatData, setChatData] = useState<any>({});
    const [chatRoomData, setChatRoomData] = useState<any>();
    const [otherUserOnline, setOtherUserOnline] = useState(false);
    const [image, setImage] = useState<any>([]);
    const fileInputValue = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const messageContainerRef = useRef<HTMLDivElement | null>(null);
    const [smallScreen, setSmallScreen] = useState<Boolean>(false);

    const { width, height } = useWindowDimensions();

    const newWidth = width || 0;


    useEffect(() => {
        if (userInfo === null) {
            router.push('/login')
        }
    }, [userInfo, router]);

    useEffect(() => {
        if (messageContainerRef.current) {
            // Scroll to the bottom of the message container
            messageContainerRef.current.scrollTo(0, messageContainerRef.current.scrollHeight)
        }
    }, [newMessages]);



    useEffect(() => {
        const checkUnreadMessage = async () => {
            const unread = [];
            for (let roomId of roomsData) {
                const roomRef = ref(db, `chatrooms/${roomId}`);

                //fetch the last message's timestamp and compare it
                const roomSnapChat = await get(roomRef);
                const roomData = roomSnapChat.val();
                const lastMessageTimestamp = roomData?.messages
                    ? (Object.values(roomData.messages).slice(-1)[0] as Message).timestamp
                    : null;
                const lastReadTimestamp = roomData?.lastRead?.[userId];

                if (lastMessageTimestamp && (!lastReadTimestamp || lastMessageTimestamp > lastReadTimestamp)) {
                    unread.push(roomId)
                }
            }
            setUnreadRooms(unread);
        }

        checkUnreadMessage();
    }, [roomsData, userId]);

    useEffect(() => {
        const fetchChatData = async () => {
            let temporaryChatData: any = {};
            for (let roomId of roomsData) {
                const ids = roomId.split('_');
                let OtherUserId = ids[0] === userId ? ids[1] : ids[0];
                let productId = ids[2];
                const userData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/getUser/${OtherUserId}`);
                const productData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/getSpecific/${productId}`);                                
                temporaryChatData[roomId] = {
                    otherUser: userData.data,
                    product: productData.data
                }
            }
            setChatData(temporaryChatData);
            setLoading(false);
        }
        fetchChatData();
    }, [roomsData, userId, setChatData]);

    useEffect(() => {
        if (selected && selected?.otherUser) {
            const otherUserStatusRef = ref(db, `users/${selected.otherUser?.data?._id}/online`);

            const listner = onValue(otherUserStatusRef, (snapshot) => {
                const isOnline = !!snapshot.val();

                setOtherUserOnline(isOnline);
            });
        }
    }, [selected]);


    useEffect(() => {
        const fetchLatestMessages = () => {
            roomsData.forEach(async (roomId: any) => {
                const messagesRef = ref(
                    db,
                    `chatrooms/${roomId}/messages`);
                onValue(messagesRef, (snapshot) => {
                    const roomMessages = snapshot.val();
                    if (roomMessages) {
                        setNewMessages((prev: any) => ({
                            ...prev,
                            [roomId]: roomMessages,
                        }));
                    }
                });
            });
        };

        fetchLatestMessages();
    }, [roomsData]);

    const handleChatRoom = async (roomId: any) => {
        setSmallScreen(true);
        // 1. set the room as selecteds
        setSelected({
            roomId: roomId,
            ...chatData[roomId]
        });

        // 2. update the last read timestamp for this room
        const db = getDatabase();
        const lastReadRef = ref(db, `chatrooms/${roomId}/lastRead/${userId}`);
        await set(lastReadRef, Date.now());

        // 3. update the local unreadRooms state.
        setUnreadRooms((prevState: any) => prevState.filter((id: any) => id !== roomId))
    }

    const handleImageRemove = (index: any) => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = ''
        }
        const updatedImages = [...image];
        updatedImages.splice(index, 1);
        setImage(updatedImages)
    }


    const handleMessage = async (e: any) => {
        e.preventDefault();
        let imageUrls = [];
        if (message && image.length <= 0) {
            const messagesRef = ref(db, `chatrooms/${selected.roomId}/messages`);
            const newMessageRef = push(messagesRef);
            set(newMessageRef, {
                senderId: userId,
                text: message,
                timestamp: Date.now(), // Or Firebase's server timestamp, if you prefer
            });
            setMessage(""); // Clear the input field after sending
        } else if (image.length >= 1) {
            const storage = getStorage();
            setImageLoading(true);
            for (const img of image) {
                // Create image storage
                const imageRef = storageRef(storage, `chatrooms/${selected.roomId}/images/${img.name}`);

                // upload image
                await uploadBytes(imageRef, img).catch((err) => {
                    console.log("Error uploading images:", err);
                });

                // get the download url
                const downloadURL = await getDownloadURL(imageRef).catch((err) => {
                    console.log("Error getting download URL:", err);
                });

                if (downloadURL) {
                    imageUrls.push(downloadURL)
                }


                if (image.length === imageUrls.length) {
                    // // dbref for the database reference
                    const messageRef = ref(db, `chatrooms/${selected.roomId}/messages`);

                    const newMessageRef = push(messageRef);
                    set(newMessageRef, {
                        senderId: userId,
                        images: imageUrls,
                        timestamps: Date.now()
                    });
                }

                // // Clear the selected images after sending
                setImage([]);
            }
        } else {
            return;
        }

        setImageLoading(false);
    }

    const handleImage = (e: any) => {
        if (e.target.files.length > 5) {
            alert("You can select up to 5 images only.");
            return;
        }
        setMessage("");
        setImage([...e.target.files]);
    }

    const handleCamera = () => {
        fileInputValue.current?.click();
    }


    const disableButton = () => {
        if (image.length <= 0) {
            return false
        } else {
            return true;
        }
    }

    function getTimeDifference(Timestamp: any) {
        const now = moment();
        const messageDate = moment(Timestamp);

        // Difference in milliseconds
        const difference = now.diff(messageDate);

        // Convert the difference to days
        const daysDifference = difference / (1000 * 60 * 60 * 24);

        if (daysDifference < 1) {
            // If less than a day old, return the time
            return messageDate.format("h:mm A");
        } else if (daysDifference < 7) {
            // If less than a week old, return the day name
            return messageDate.format("dddd");
        } else {
            // If a week or more old, return the date
            return messageDate.format("L");
        }
    }

    const deleteMessage = async (roomId: any) => {
        const userMessageRef = ref(db, `RoomLists/${userId}/rooms`);
        try {
            // fetch the current user's room
            const snapshot = await get(userMessageRef);
            if (snapshot.exists()) {
                let userRoomList = snapshot.val();

                // filter message using roomId
                userRoomList = userRoomList.filter((roomID: any) => roomID !== roomId);

                //update the room list
                await set(userMessageRef, userRoomList);

                console.log(`chat with roomId: ${roomId} is deleted successfully.`);
            } else {
                console.log('user rooms not found.');
            }
            setNewMessages([])
        } catch (error) {
            console.log(error);
        }
    }

    const handleInput = (e: any) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            setMessage((prevMsg: string) => prevMsg + '\n');
        }
    }


    if (userInfo !== null) {
        return (
            <div>
                <Home>
                    <div className='flex justify-center mb-20'>
                        {loading ?
                            <div className="flex justify-center mt-8">
                                <Image
                                src='/assets/eidcarosse.gif'
                                alt="eidcarosse_logo"
                                width={200}
                                height={200}
                                />
                            </div>                            :
                            <>
                                {newWidth <= 425 ?
                                    <div className='container mx-auto items-center mt-20'>
                                        <div className='bg-white border border-gray-300 rounded-lg w-full cursor-pointer'>
                                            {!smallScreen ?
                                                <div className="ease-linear duration-200 h-[600px] messageArea">
                                                    <h1 className='uppercase text-2xl font-semibold p-3 border-b-2'>
                                                        Inbox
                                                    </h1>
                                                    {roomsData && [...roomsData].map((data: any, i: any) => (
                                                        chatData[data] && (
                                                            <div
                                                                className='flex flex-row space-x-2 border-b-2 m-3 py-2'
                                                                key={i}
                                                                onClick={() => handleChatRoom(data)}
                                                            >
                                                                <div className='w-20'>
                                                                    <Image
                                                                        className='h-16 w-16 border rounded-full'
                                                                        src={chatData[data].otherUser.data.image}
                                                                        alt="logo"
                                                                        width={100}
                                                                        height={100}
                                                                    />
                                                                </div>
                                                                <div className='w-full'>
                                                                    <section className='flex flex-row justify-between'>
                                                                        <h1 className='text-sm font-bold'>{chatData[data].otherUser.data.firstName}  {chatData[data].otherUser.data.lastName}</h1>
                                                                        {/* <DeleteForever className='text-[#FF0000]' /> */}
                                                                    </section>
                                                                    <h1 className='text-sm font-bold line-clamp-1'>{chatData[data].product?.data?.title}</h1>
                                                                    <section className='flex flex-row justify-between'>
                                                                        {/* <h1 className='text-sm line-clamp-1'>{chatRoomData[data].otherUser.email}</h1> */}
                                                                        <h1 className='text-sm w-20 truncate'>
                                                                            {newMessages[data]
                                                                                ? (Object.keys((newMessages as NewMessages)[data]).pop() && (newMessages as NewMessages)[data][Object.keys((newMessages as NewMessages)[data]).pop() as string]?.text)
                                                                                :
                                                                                ""}
                                                                        </h1>
                                                                        <h1 className='text-sm'>{getTimeDifference(message.timestamps)}</h1>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                                :
                                                <div className='p-2 ease-linear duration-200'>
                                                    <h1 className='text-[#FF0000] hover:bg-[#FF0000] hover:text-white ml-2 border rounded-full w-10 px-3 py-2 text-sm' onClick={() => setSmallScreen(false)}><ArrowBackIos /></h1>
                                                    <div className='flex flex-row space-x-4 py-3'>
                                                        <div className='w-16'>
                                                            <Image
                                                                className='h-16 w-16 border rounded-full'
                                                                src={selected?.otherUser?.data.image}
                                                                alt="logo"
                                                                width={100}
                                                                height={100}
                                                            />
                                                        </div>
                                                        <section className='mt-3'>
                                                            <h1 className='text-lg font-bold'>{selected?.otherUser?.data?.firstName} {selected?.otherUser?.data?.lastName}</h1>
                                                            <div className='flex flex-row space-x-[2px] mt-1'>
                                                                <h1 className={`border-none rounded-full h-2 w-2 ${otherUserOnline ? 'bg-green-700' : 'bg-red-700'}`}></h1>
                                                                <h1 className='text-[9px] mt-[-3px]'>{otherUserOnline ? 'online' : 'offline'}</h1>
                                                            </div>
                                                        </section>
                                                    </div>
                                                    <div className='flex flex-row border-t-2 border-b-2 w-auto p-4 space-x-2'>
                                                        {selected.product && (
                                                            <><div className='bg-gray-100 w-40 flex justify-center' onClick={() => router.push(`/product-details/${selected?.product?._id}`)}>
                                                                <Image
                                                                    src={selected?.product?.data.images[0]}
                                                                    alt='productImage'
                                                                    height={100}
                                                                    width={100}
                                                                    className='h-20 w-auto border-none rounded-md' />
                                                            </div><div className='w-full'>
                                                                    <h1 className='text-lg font-bold'>{selected?.product?.data.title}</h1>
                                                                    <div className='flex flex-row justify-between'>
                                                                        <h1 className='text-[#FF0000] text-sm font-semibold'>CHF {addInvertedComma(selected?.product?.data.price * 1)}</h1>
                                                                        <button className='text-white bg-[#FF0000] border-none rounded-md w-32 p-2 mt-2'
                                                                            onClick={() => router.push(`/product-details/${selected?.product?._id}`)}>View Ad</button>
                                                                    </div>
                                                                </div></>
                                                        )}
                                                    </div>
                                                    <div className=''>
                                                        <div className={`${newMessages.length <= 0 ? 'h-auto' : ''}`}>
                                                            <div className='h-[400px] messageArea' ref={messageContainerRef}>
                                                                {selected.roomId && newMessages[selected.roomId]
                                                                    &&
                                                                    Object.values(newMessages[selected.roomId]).sort((a: any, b: any) => a.timestamp - b.timestamp).map((message: any, i: number) => (
                                                                        <div
                                                                            key={i}
                                                                            className={`${message.images?.length <= 5 ? 'flex flex-col space-y-4' : 'flex flex-row space-x-4'} bg-gray-100 h-auto w-40 p-5 mt-2 mb-2 border-none 
                                            ${message.senderId === userId ? 'ml-auto mr-2 rounded-bl-[6px] rounded-br-[6px] rounded-tl-[6px]'
                                                                                    : 'mr-auto ml-2 rounded-bl-[6px] rounded-br-[6px] rounded-tr-[6px]'
                                                                                }`}
                                                                        >
                                                                            {message.text ? (
                                                                                <>
                                                                                    <span className='inline-block break-words w-32'>{message.text}</span>
                                                                                </>
                                                                            )
                                                                                :
                                                                                (
                                                                                    message.images && message.images.map((imgs: any, i: number) => (
                                                                                        // eslint-disable-next-line @next/next/no-img-element
                                                                                        <img src={imgs} alt="Your Alt Text" className='h-24 w-32' key={i} />
                                                                                    ))
                                                                                )}
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                            {image.length > 0 && <div className={`${image.length > 2 ? 'grid grid-cols-2' : 'flex flex-row space-x-5'} p-2  bg-gray-100`}>
                                                                {image.map((img: any, i: number) => (
                                                                    <div className='flex justify-center h-24 w-32 bg-green-400 mb-5' key={i}>
                                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                        <img src={URL.createObjectURL(img)} alt="Your Alt Text" className='h-24 w-32' />
                                                                        <Cancel className='absolute mt-[1px] ml-24 text-[#FF0000]' onClick={() => handleImageRemove(i)} />
                                                                    </div>
                                                                ))}
                                                                {imageLoading && <div className="spinner mt-8 w-10 h-10"></div>}
                                                            </div>
                                                            }
                                                        </div>
                                                        <form className='bg-gray-100 flex flex-row px-7 p-2'>
                                                            <div className='w-12 h-10 cursor-pointer py-1'>
                                                                <CameraAlt className='text-4xl text-gray-500' onClick={() => handleCamera()} />
                                                                <input type="file" className='invisible' id='fileInput' ref={fileInputValue} onChange={(e) => handleImage(e)} multiple />
                                                            </div>
                                                            <div className='w-full flex flex-row'>
                                                                <input type="text" disabled={disableButton()} required placeholder='Type a message' value={message} className='focus:outline-none rounded-bl-md rounded-tl-md w-full h-full p-2' onChange={(e) => setMessage(e.target.value)} onKeyDown={handleInput} />
                                                                <button className='bg-[#FF0000] w-20 cursor-pointer border-none rounded-br-md rounded-tr-md' onClick={(e) => handleMessage(e)}>
                                                                    <FontAwesomeIcon icon={faPaperPlane} className='text-white text-xl p-2' />
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className='container mx-auto flex items-center mt-20 cursor-pointer'>
                                        <div className='flex justify-center bg-white border border-gray-300 rounded-lg w-full'>
                                            <div className='w-[500px] border-r-2 border-gray-300'>
                                                <h1 className='uppercase text-2xl font-semibold p-3 border-b-2'>
                                                    Inbox
                                                </h1>
                                                {roomsData && [...roomsData].map((data: any, i: any) => (
                                                    chatData[data] && (
                                                        <div
                                                            className='flex flex-row space-x-2 border-b-2 m-3 py-2'
                                                            key={i}
                                                            onClick={() => handleChatRoom(data)}
                                                        >
                                                            <div className='w-20'>
                                                                <Image
                                                                    className='h-16 w-16 border rounded-full'
                                                                    src={chatData[data].otherUser.data.image}
                                                                    alt="logo"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <div className='w-full'>
                                                                <section className='flex flex-row justify-between'>
                                                                    <h1 className='text-sm font-bold'>{chatData[data].otherUser.data.firstName}  {chatData[data].otherUser.data.lastName}</h1>
                                                                    {/* <DeleteForever className='text-[#FF0000]' /> */}
                                                                </section>
                                                                <h1 className='text-sm font-bold line-clamp-1'>{chatData[data].product?.data?.title}</h1>
                                                                <section className='flex flex-row justify-between'>
                                                                    {/* <h1 className='text-sm line-clamp-1'>{chatRoomData[data].otherUser.email}</h1> */}
                                                                    <h1 className='text-sm w-20 truncate'>
                                                                        {newMessages[data]
                                                                            ? (Object.keys((newMessages as NewMessages)[data]).pop() && (newMessages as NewMessages)[data][Object.keys((newMessages as NewMessages)[data]).pop() as string]?.text)
                                                                            :
                                                                            ""}
                                                                    </h1>
                                                                    <h1 className='text-sm'>{getTimeDifference(message.timestamps)}</h1>
                                                                </section>
                                                            </div>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                            <div className='w-full ease-out duration-500'>
                                                {Object.keys(selected).length <= 0 ? <div className='h-[400px]'>
                                                    <h1 className='border rounded-md border-red-500 mx-3 mt-52 p-3'>No chat selected</h1>
                                                </div> :
                                                    <>
                                                        <div className='m-5 flex flex-row space-x-4'>
                                                            <div className='w-16'>
                                                                <Image
                                                                    className='h-16 w-16 border rounded-full'
                                                                    src={selected?.otherUser?.data.image}
                                                                    alt="logo"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <section className='mt-3'>
                                                                <h1 className='text-lg font-bold'>{selected?.otherUser?.data?.firstName} {selected?.otherUser?.data?.lastName}</h1>
                                                                <div className='flex flex-row space-x-[2px] mt-1'>
                                                                    <h1 className={`border-none rounded-full h-2 w-2 ${otherUserOnline ? 'bg-green-700' : 'bg-red-700'}`}></h1>
                                                                    <h1 className='text-[9px] mt-[-3px]'>{otherUserOnline ? 'online' : 'offline'}</h1>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <div className='flex flex-row border-t-2 border-b-2 w-auto p-4 space-x-2'>
                                                            {selected.product && (
                                                                <><div className='bg-gray-100 w-40 flex justify-center' onClick={() => router.push(`/product-details/${selected?.product?._id}`)}>
                                                                    <Image
                                                                        src={selected?.product?.data.images[0]}
                                                                        alt='productImage'
                                                                        height={100}
                                                                        width={100}
                                                                        className='h-20 w-auto border-none rounded-md' />
                                                                </div><div className='w-full'>
                                                                        <h1 className='text-lg font-bold'>{selected?.product?.data.title}</h1>
                                                                        <div className='flex flex-row justify-between'>
                                                                            <h1 className='text-[#FF0000] text-sm font-semibold'>CHF {addInvertedComma(selected?.product?.data.price * 1)}</h1>
                                                                            <button className='text-white bg-[#FF0000] border-none rounded-md w-32 p-2 mt-2'
                                                                                onClick={() => router.push(`/product-details/${selected?.product?.data._id}`)}>View Ad</button>
                                                                        </div>
                                                                    </div></>
                                                            )}
                                                        </div>
                                                        <div className=''>
                                                            <div className={`${newMessages.length <= 0 ? 'h-auto' : ''}`}>
                                                                <div className='h-[400px] messageArea' ref={messageContainerRef}>
                                                                    {selected.roomId && newMessages[selected.roomId]
                                                                        &&
                                                                        Object.values(newMessages[selected.roomId]).sort((a: any, b: any) => a.timestamp - b.timestamp).map((message: any, i: number) => (
                                                                            <div
                                                                                key={i}
                                                                                className={`${message.images?.length <= 5 ? 'flex flex-col space-y-4' : 'flex flex-row space-x-4'} bg-gray-100 h-auto w-40 p-5 mt-2 mb-2 border-none 
                                            ${message.senderId === userId ? 'ml-auto mr-2 rounded-bl-[6px] rounded-br-[6px] rounded-tl-[6px]'
                                                                                        : 'mr-auto ml-2 rounded-bl-[6px] rounded-br-[6px] rounded-tr-[6px]'
                                                                                    }`}
                                                                            >
                                                                                {message.text ? (
                                                                                    <>
                                                                                        <span className='inline-block break-words w-32'>{message.text}</span>
                                                                                    </>
                                                                                )
                                                                                    :
                                                                                    (
                                                                                        message.images && message.images.map((imgs: any, i: number) => (
                                                                                            // eslint-disable-next-line @next/next/no-img-element
                                                                                            <img src={imgs} alt="Your Alt Text" className='h-24 w-32' key={i} />
                                                                                        ))
                                                                                    )}
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                                {image.length > 0 && <div className='flex flex-row p-2 space-x-5  bg-gray-100'>
                                                                    {image.map((img: any, i: number) => (
                                                                        <div className='flex justify-center h-24 w-32 bg-green-400' key={i}>
                                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                            <img src={URL.createObjectURL(img)} alt="Your Alt Text" className='h-24 w-32' />
                                                                            <Cancel className='absolute mt-[1px] ml-24 text-[#FF0000]' onClick={() => handleImageRemove(i)} />
                                                                        </div>
                                                                    ))}
                                                                    {imageLoading && <div className="spinner mt-8 w-10 h-10"></div>}
                                                                </div>
                                                                }
                                                            </div>
                                                            <form className='bg-gray-100 flex flex-row px-7 p-2'>
                                                                <div className='w-12 h-10 cursor-pointer py-1'>
                                                                    <CameraAlt className='text-4xl text-gray-500' onClick={() => handleCamera()} />
                                                                    <input type="file" className='invisible' id='fileInput' ref={fileInputValue} onChange={(e) => handleImage(e)} multiple />
                                                                </div>
                                                                <div className='w-full flex flex-row'>
                                                                    <input type="text" disabled={disableButton()} required placeholder='Type a message' value={message} className='focus:outline-none rounded-bl-md rounded-tl-md w-full h-full p-2' onChange={(e) => setMessage(e.target.value)} onKeyDown={handleInput} />
                                                                    <button className='bg-[#FF0000] w-20 cursor-pointer border-none rounded-br-md rounded-tr-md' onClick={(e) => handleMessage(e)}>
                                                                        <FontAwesomeIcon icon={faPaperPlane} className='text-white text-xl p-2' />
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </div >
                </Home >
            </div >
        )
    }
}


export default dynamic(() => Promise.resolve(Chat), { ssr: false });

