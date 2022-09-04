import { useState } from "react"

export default function ChatNav({
    roomId
}){
    const [username, setUsername] = useState( localStorage.getItem("username") )
    return (
        <nav  className="chat-navbar" style={{
            padding: '16px', 
        }}>
            <div>πChat</div>
            <div style={{
                marginLeft: 'auto', 
                display: 'flex', 
                columnGap: '1rem'
            }}>
                <div>
                    <strong>Room:</strong> {roomId}
                </div>
                <div onClick={()=>{
                    const newUsername = prompt("Update your username");
                    localStorage.setItem("username", newUsername);
                    setUsername(newUsername)
                }}>
                    <strong>User:</strong> { username }
                </div>
            </div>
        </nav>
    )
}