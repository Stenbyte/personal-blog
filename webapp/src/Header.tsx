import { Link } from "react-router";
import "./App.css";

export function Header({ setOpenModal }: { setOpenModal: (state: boolean) => void }) {
    return (
        <header className="App-header">
            <div className="App-title">My Blog</div>
            <nav className="App-nav">
                <Link to="/" style={{ color: "white" }}>Home</Link>
                <Link to="/admin" style={{ color: 'white' }}>Dashboard</Link>
                <button className="App-login-btn" onClick={() => setOpenModal(true)}>Login</button>
            </nav>
        </header>
    )
}