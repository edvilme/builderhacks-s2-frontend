export default function SystemBubble({
    user
}) { 
    return <div style={{padding: '16px', textAlign: 'center', boxSizing: 'border-box'}}>
        <span style={{color: 'gray', textAlign: 'center'}}>{
            `${user} has joined the chat`
        }</span>
    </div>
}