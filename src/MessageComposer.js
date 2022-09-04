import React, { createRef } from "react";


export default class MessageComposer extends React.Component {
    constructor() {
        super();
        this.inputRef = createRef(null);
        this.typeRef = createRef(null);
        this.answerRef = createRef(null);
        this.state = {
            type: "message"
        }
    }

    get value() {
        return {
            content: this.inputRef?.current?.innerText,
            type: this.typeRef?.current?.value,
            answer: this.answerRef?.current?.value
        }
    }

    submit() {
        if (this.value.content == "") return;
        this.props.onSubmit?.();
        try{
            this.inputRef.current.innerHTML = "";
            this.typeRef.current.value = "message";
            this.answerRef.current.value = ""
        } catch(e){

        }
    }

    renderInput() {
        if (this.state.type == "message") {
            return (
                <div ref={this.inputRef}
                    id="new-message-bubble"
                    contentEditable
                    onKeyDown={e => {
                        if (e.shiftKey) return;
                        if (e.key == "Enter") {
                            this.submit();
                            e.preventDefault();
                        }
                    }}
                ></div>
            )
        } else if (this.state.type == "canvas") {
            return (
                <div>This is a canvas</div>
            )
        } else {
            return [
                <div ref={this.inputRef}
                    id="new-message-bubble"
                    contentEditable
                    onKeyDown={e => {
                        if (e.shiftKey) return;
                        if (e.key == "Enter") {
                            this.submit();
                            e.preventDefault();
                        }
                    }}
                ></div>,
                <br />,
                <div>
                    <label htmlFor="new-message-answer"><strong>Answer: </strong></label>
                    <input id="new-message-answer" placeholder="Type answer..." ref={this.answerRef}></input>
                </div>
            ]
        }
    }

    render() {
        return <div className="chat-toolbar">
            <div className="chat-toolbar-input">
                <select id="new-message-type" ref={this.typeRef}
                    onChange={(e) => {
                        this.setState({ type: e.target.value })
                    }}
                >
                    <option value="message">Message</option>
                    <option value="canvas">Drawing board</option>
                    <optgroup label="Text questions">
                        <option value="comparison_text_strict">Text? Strict</option>
                        <option value="comparison_text_medium">Text? Medium</option>
                        <option value="comparison_text_similarity">Text? Similar</option>
                    </optgroup>
                    <optgroup label="Number questions">
                        <option value="comparison_num_strict">Num?</option>
                        <option value="comparison_math_equality">Math?</option>
                    </optgroup>
                </select>
                <div style={{ flex: 1 }}>
                    {this.renderInput()}
                </div>
            </div>
            <button
                onClick={this.submit.bind(this)}
            >Send</button>
        </div>
    }
}