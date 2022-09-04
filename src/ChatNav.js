import { useState } from "react"

export default function ChatNav({
    roomId
}){
    const [username, setUsername] = useState( localStorage.getItem("username") )
    return (
        <nav  className="chat-navbar">
            <div style={{padding: '16px'}}>
                <strong>πChat</strong>
            </div>
            <div style={{
                marginLeft: 'auto', 
                display: 'flex', 
                columnGap: '1rem',
                alignItems: 'center'
            }}>
                <div style={{padding: '16px', color: 'gray'}}>
                    <strong>Room:</strong> {roomId}
                </div>
                <div 
                    style={{
                        padding: '16px', 
                        background: 'grey', 
                        color: 'white'
                    }}
                    onClick={()=>{
                        const newUsername = prompt("Update your username");
                        localStorage.setItem("username", newUsername);
                        setUsername(newUsername)
                    }}
                >
                    <strong>User:</strong> { username }
                </div>
            </div>
        </nav>
    )
}