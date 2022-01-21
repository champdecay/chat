import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [room, setRoom] = useState("");

    return (
        <UserContext.Provider value={{ user, setUser, room, setRoom }}>
            {props.children}
        </UserContext.Provider>
    )
}