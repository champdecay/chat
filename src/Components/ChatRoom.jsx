import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../Redux/chatSlice";
import AskName from "./AskName";
import { UserContext } from "../Context/UserContext";

export default function ChatRoom() {
    const params = useParams();
    const { user } = useContext(UserContext);
    const [socket, setsocket] = useState();

    const chat = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        const s = io("http://localhost:3001")
        setsocket(s);
        return () => {
            s.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket && user) {
            socket.emit("join", { room: params.id, user: user })
        }
        return () => { }
    }, [socket, params.id, user])

    useEffect(() => {
        if (socket && user) {
            const handleNewUser = (user) => {
                console.log(`${user} has joined ${params.id}`)
                dispatch(addMessage(`${user} has joined ${params.id}`))
            }
            socket.on("new_user", handleNewUser)
            return () => {
                socket.off("new_user", handleNewUser)
            }
        }
    }, [socket, user]);

    useEffect(() => {
        if (socket && user) {
            const handleNewMessage = (message) => {
                console.log(message)
                dispatch(addMessage(message))
            }
            socket.on("new_message", handleNewMessage)
            return () => {
                socket.off("new_message", handleNewMessage)
            }
        }
    }, [socket, user]);

    const handleMessage = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        e.target.message.value = "";
        socket.emit("send_message", message)
        //dispatch(addMessage(message))
    }


    if (user) {
        return <div>
            <ul>
                <li>{user} has created {params.id}</li>
                {chat && chat.messages.map((message, index) => {
                    return <li key={index}>{message}</li>
                })}
            </ul>

            <form onSubmit={handleMessage} className="border-2 border-indigo-100 w-96 flex">
                <input type="text" name="message" className="w-72" />
                <button className="bg-indigo-100 py-2 px-4 w-24 text-indigo-900 font-semibold">Send</button>
            </form>
        </div>
    } else {
        return <AskName />
    }
}

