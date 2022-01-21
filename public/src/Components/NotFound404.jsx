import { Link } from "react-router-dom";

export default function NotFound404() {
    return <div>
        <p>There's nothing here!</p>
        <Link to="/">Go back home</Link>
    </div>;
}
