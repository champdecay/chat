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
    const s = io("http://localhost:3001");
    setsocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.emit("join", { room: params.id, user: user });
    }
    return () => {};
  }, [socket, params.id, user]);

  useEffect(() => {
    if (socket && user) {
      const handleNewUser = (user) => {
        dispatch(
          addMessage({
            user: user,
            message: `${user} has joined the room`,
            time: new Date(),
            type: "user_added",
          })
        );
      };

      socket.on("new_user", handleNewUser);

      return () => {
        socket.off("new_user", handleNewUser);
        socket.off("user_disconnect", handleUserLeft);
      };
    }
  }, [socket, user]);

  useEffect(() => {
    if (socket && user) {
      const handleNewMessage = (message) => {
        dispatch(
          addMessage({
            user: user,
            message: message,
            time: new Date(),
            type: "message",
          })
        );
      };
      socket.on("new_message", handleNewMessage);
      return () => {
        socket.off("new_message", handleNewMessage);
      };
    }
  }, [socket, user]);

  const handleMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    e.target.message.value = "";
    socket.emit("send_message", message);
    //dispatch(addMessage(message))
  };

  if (user) {
    return (
      <div className="chatRoom">
        {/* <nav className="navbar bg-indigo-600 text-white p-4">
          <div className="container flex justify-between align-middle mx-auto">
            <div className="logo">
              <h1 className="font-extrabold text-xl">SecretChat</h1>
            </div>
            <div className="nav-items">
              <p className="text-sm">About</p>
            </div>
          </div>
        </nav>
        <main className="bg-gray-200 min-h-[85vh]">
          <div className="container flex flex-wrap mx-auto">
            <section className="chat bg-gray-200 p-4 flex flex-col gap-2 h-[85vh]  w-[30%] overflow-y-scroll">
              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>

              <article className="chat bg-white shadow-sm flex gap-1 justify-evenly align-middle p-2">
                <div className="avatar-image w-1/6">
                  <img
                    className="rounded-full"
                    src="//source.unsplash.com/50x50"
                    alt="User Avatar"
                  />
                </div>
                <div className="chat-details w-3/4">
                  <h2>User name</h2>
                  <p>Last Message</p>
                </div>
                <div className="chat-time w-1/6 self-end flex">
                  <p className="text-xs">2 hrs</p>
                </div>
              </article>
            </section>
            <section className="conversation w-[70%] bg-gray-300 h-[85vh] flex flex-col  justify-end items-stretch">
              <div className="chat-conversation p-2 h-[80vh] overflow-y-scroll flex flex-col items-baseline px-4 py-8">
                <div className="message message-self bg-indigo-400 text-right text-xl self-end p-4">
                  Hello How are you?
                </div>
                <div className="message message-other bg-indigo-50  text-xl font-bold p-4">
                  Hello How are you?
                </div>
                <div className="message message-self bg-indigo-400 text-right text-xl self-end p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-other bg-indigo-50  text-xl font-bold p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-self bg-indigo-400 text-right text-xl self-end p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-other bg-indigo-50  text-xl font-bold p-4">
                  Hello How are you 2?
                </div>{" "}
                <div className="message message-self bg-indigo-400 text-right text-xl self-end p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-other bg-indigo-50  text-xl font-bold p-4">
                  Hello How are you 2?
                </div>{" "}
                <div className="message message-self bg-indigo-400 text-right text-xl self-end p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-other bg-indigo-50  text-xl font-bold p-4">
                  Hello How are you 2?
                </div>{" "}
                <div className="message message-self bg-indigo-400 text-right text-xl self-end p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-other bg-indigo-50  text-xl font-bold p-4">
                  Hello How are you 2?
                </div>{" "}
                <div className="message message-self bg-indigo-400 text-right text-xl self-end p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-other bg-indigo-50  text-xl font-bold p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-self bg-indigo-400 text-right text-xl self-end p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-other bg-indigo-50  text-xl font-bold p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-self bg-indigo-400 text-right text-xl self-end p-4">
                  Hello How are you 2?
                </div>
                <div className="message message-other bg-indigo-50  text-xl font-bold p-4">
                  Hello How are you 2?
                </div>
              </div>
              <form className="compose-message flex">
                <input type="text" className="message-box flex-1 p-4" />
                <button
                  type="submit"
                  className="send-message-button bg-indigo-600 font-bold py-2 px-6 text-white"
                >
                  Send
                </button>
              </form>
            </section>
          </div>
        </main>

        <footer className="bg-indigo-600 text-white p-4">
          <div className="container flex justify-between align-middle mx-auto">
            Copyright @2022
          </div>
        </footer> */}

        <ul>
                <li>{user} has created {params.id}</li>
                {chat && chat.messages.map((message, index) => {
                    return <li key={index}>{message.message}</li>
                })}
            </ul>

            <form onSubmit={handleMessage} className="border-2 border-indigo-100 w-96 flex">
                <input type="text" name="message" className="w-72" />
                <button className="bg-indigo-100 py-2 px-4 w-24 text-indigo-900 font-semibold">Send</button>
            </form>
      </div>
    );
  } else {
    return <AskName />;
  }
}
