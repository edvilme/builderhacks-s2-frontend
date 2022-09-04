export default function ChatNav({
    roomId
}){
    return (
        <nav style={{
            display: 'flex', 
            padding: '8px 16px', 
            borderBottom: '1px solid gray'
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
                <div>
                    <strong>User:</strong> { localStorage.getItem("username") }
                </div>
            </div>
        </nav>
    )
}