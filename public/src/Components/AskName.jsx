import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function AskName({ props }) {
    const { setUser } = useContext(UserContext);
    const [name, setname] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('user', name)
        setUser(name)
    }
    return <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={(e) => setname(e.target.value)} defaultValue={name} />
        <button>Log me into Chat</button>
    </form>;
}
