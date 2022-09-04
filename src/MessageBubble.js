import { createRef, useState } from 'react';
import Latex from 'react-latex';
import './MessageBubble.css';
export default function MessageBubble({
    content,
    author,
    type, 
    answer,
    fromCurrentUser,
    onAnswer, 
    originalQuestion, 
    isCorrectAnswer,
    onCorrectAnswer
}) {
    const [isAnswered, setIsAnswered] = useState(false);
    const containerRef = createRef();

    async function answerQuestion(){
        // Submission
        const submission = prompt("Answer here");
        // Fetch result
        const resultFetch = await fetch('https://builderhacks-backend.hop.sh/test', {
            method: "POST",
            body: JSON.stringify({
                type, 
                answer, 
                submission
            })
        });
        const result = await resultFetch.json();
        // In case of math
        if(type == "comparison_math_equality")
        submission = `$${submission}$`
        // Create response message
        const message = {
            type: "submission", 
            content: submission, 
            originalQuestion: {content, author, type, fromCurrentUser: false}, 
            isCorrectAnswer: result.correct
        }
        // Callbacks
        setIsAnswered(true);
        onAnswer(message);
        if(result.correct) onCorrectAnswer?.();
    }

    /* if(isCorrectAnswer){
        onCorrectAnswer?.();
    } */

    function renderOptions(){
        if(type == "submission"){
            return <div style={{
                opacity: 0.4, order: -1, filter: 'grayscale(100%)', display: 'flex', alignItems: 'baseline'
            }}>
                <MessageBubble {...originalQuestion}></MessageBubble>
                <div>
                    {isCorrectAnswer ? "✅" : "❌"}
                </div>
            </div>
        } else if(type != "message" && type != "sketch" && onAnswer && !fromCurrentUser && !isAnswered){
            return <button onClick={answerQuestion}>Answer</button>
        }
    }
    return (
        <div className={fromCurrentUser ? 'bubble-container from-current-user' : 'bubble-container'}
            ref={containerRef}
        >
            <div className='bubble'>
                <div className='author'>{author}</div>
                <div className='content'>
                    {
                        type == "sketch" ? <img src={content}></img> : <Latex>{content}</Latex>
                    }
                </div>
            </div>
            {renderOptions()}
        </div>
    )
}