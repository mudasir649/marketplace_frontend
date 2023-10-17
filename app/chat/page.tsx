'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '@/utils/firebase-config';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import addInvertedComma from '@/utils/addInvertedComma';
import { CameraAlt, CameraAltOutlined, Cancel, DeleteForever } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { get, onValue, push, ref, set } from 'firebase/database';
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
    const [selected, setSelected] = useState<any>({});
    const [loading, setLoading] = useState<Boolean>(true);
    const [imageLoading, setImageLoading] = useState<Boolean>(false);
    const [chatRoomData, setChatRoomData] = useState<any>();
    const [image, setImage] = useState<any>([]);
    const fileInputValue = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (userInfo === null) {
            router.push('/login')
        }
    }, [userInfo, router]);

    useEffect(() => {
        const fetchChatData = async () => {
            let temporaryChatData: any = {};

            for (let roomId of roomsData) {
                const ids = roomId.split("_");
                let otherUserId = ids[0] === userId ? ids[1] : ids[0];
                let productId = ids[2];

                const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/getUser/${otherUserId}`);
                const productResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/getSpecific/${productId}`);

                temporaryChatData[roomId] = {
                    otherUser: userResponse.data.data,
                    product: productResponse.data.data,
                };
            }

            setChatRoomData(temporaryChatData);
            setLoading(false)

            // Get the last entry of 'temporaryChatData' and set it as 'selected'
            const keys = Object.keys(temporaryChatData);
            const lastKey = keys[keys.length - 1];
            if (lastKey) {
                setSelected({
                    roomId: lastKey,
                    ...temporaryChatData[lastKey],
                });
            }
        };

        fetchChatData();
    }, [roomsData, userId]);

    const handleImageRemove = (index: any) => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = ''
        }
        const updatedImages = [...image];
        updatedImages.splice(index, 1);
        setImage(updatedImages)
    }

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


    if (userInfo !== null) {
        return (
            <div>
                <Home>
                    <div className='flex justify-center mb-20'>
                        {loading ?
                            <div className="spinner mt-8 w-40 h-40"></div>
                            :
                            newMessages.length <= 0 && roomsData.length <= 0 ?
                                <div className='flex justify-center border border-[#FF0000] rounded-md w-60 p-5 mt-10'>
                                    <h1 className='text-lg font-bold'>You have no Chat !!</h1>
                                </div>
                                :
                                <div className='container mx-auto flex items-center mt-20 cursor-pointer'>
                                    <div className='flex justify-center bg-white border border-gray-300 rounded-lg w-full'>
                                        <div className='w-[500px] border-r-2 border-gray-300'>
                                            <h1 className='uppercase text-2xl font-semibold p-3 border-b-2'>
                                                Inbox
                                            </h1>
                                            {chatRoomData && roomsData && Object.values(roomsData)?.reverse()?.map((data: any, i: number) => (
                                                <div
                                                    className='flex flex-row space-x-2 border-b-2 m-3 py-2'
                                                    key={i}
                                                    onClick={() => {
                                                        setSelected({ roomId: data, ...chatRoomData[data] })
                                                    }}
                                                >
                                                    <div className='w-20'>
                                                        <Image
                                                            className='h-16 w-16 border rounded-full'
                                                            src={chatRoomData[data].otherUser.image}
                                                            alt="logo"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                    <div className='w-full'>
                                                        <section className='flex flex-row justify-between'>
                                                            <h1 className='text-sm font-bold'>{chatRoomData[data].otherUser.firstName + chatRoomData[data].otherUser.lastName}</h1>
                                                            <DeleteForever className='text-[#FF0000]' onClick={() => deleteMessage(selected?.roomId)} />
                                                        </section>
                                                        <h1 className='text-sm font-bold line-clamp-1'>{chatRoomData[data].product?.title}</h1>
                                                        <section className='flex flex-row justify-between'>
                                                            {/* <h1 className='text-sm line-clamp-1'>{chatRoomData[data].otherUser.email}</h1> */}
                                                            <h1 className='text-sm w-20 truncate'>
                                                                {newMessages[data] && typeof newMessages[data] === 'object'
                                                                    ? (Object.keys((newMessages as NewMessages)[data]).pop() && (newMessages as NewMessages)[data][Object.keys((newMessages as NewMessages)[data]).pop() as string]?.text)
                                                                    : ""}
                                                            </h1>
                                                            <h1 className='text-sm'>{getTimeDifference(message.timestamps)}</h1>
                                                        </section>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='w-full'>
                                            <div className='m-5 flex flex-row space-x-4'>
                                                <div className='w-16'>
                                                    <Image
                                                        className='h-16 w-16 border rounded-full'
                                                        src={selected?.otherUser?.image}
                                                        alt="logo"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                                <section className='mt-3'>
                                                    <h1 className='text-lg font-bold'>{selected?.otherUser?.firstName + selected?.otherUser?.lastName}</h1>
                                                    <div className='flex flex-row space-x-[2px] mt-1'>
                                                        <h1 className='border-none rounded-full h-2 w-2 bg-green-700'></h1>
                                                        <h1 className='text-[9px] mt-[-3px]'>online</h1>
                                                    </div>
                                                </section>
                                            </div>
                                            <div className='flex flex-row border-t-2 border-b-2 w-auto p-4 space-x-2'>
                                                <div className='bg-gray-100 w-40 flex justify-center' onClick={() => router.push(`/product-details/${selected?.product?._id}`)}>
                                                    <Image
                                                        src={selected?.product?.images[0]}
                                                        alt='productImage'
                                                        height={100}
                                                        width={100}
                                                        className='h-20 w-auto border-none rounded-md'
                                                    />
                                                </div>
                                                <div className='w-full'>
                                                    <h1 className='text-lg font-bold'>{selected?.product?.title}</h1>
                                                    <div className='flex flex-row justify-between'>
                                                        <h1 className='text-[#FF0000] text-sm font-semibold'>CHF {addInvertedComma(selected?.product?.price)}</h1>
                                                        <button className='text-white bg-[#FF0000] border-none rounded-md w-32 p-2 mt-2'
                                                            onClick={() => router.push(`/product-details/${selected?.product?._id}`)}>View Ad</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className={`${newMessages.length <= 0 ? 'h-[500px]' : ''}`}>
                                                    <div className='h-[400px] messageArea'>
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
                                                        <input type="text" disabled={disableButton()} required placeholder='Type a message' value={message} className='focus:outline-none rounded-bl-md rounded-tl-md w-full h-full p-2' onChange={(e) => setMessage(e.target.value)} />
                                                        <button className='bg-[#FF0000] w-20 cursor-pointer border-none rounded-br-md rounded-tr-md' onClick={(e) => handleMessage(e)}>
                                                            <FontAwesomeIcon icon={faPaperPlane} className='text-white text-xl p-2' />
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div >
                </Home >
            </div >
        )
    }
}


export default dynamic(() => Promise.resolve(Chat), { ssr: false });

