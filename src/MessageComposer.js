import React, { createRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import DrawingComposer from "./DrawingComposer";
import DrawingComposerToolbar from "./DrawingComposerToolbar";


export default class MessageComposer extends React.Component {
    constructor() {
        super();
        this.inputRef = createRef(null);
        this.typeRef = createRef(null);
        this.answerRef = createRef(null);
        this.sketchpadRef = createRef(null);
        this.state = {
            type: "message",
            sketchTool: "pen", 
            sketchToolWidth: 1,
            sketchToolColor: 'black'
        }
    }

    get value() {
        return {
            type: this.state.type, 
            answer: this.answerRef?.current?.value, 
            content: this.state.type != "sketch" ? this.inputRef?.current?.innerText : this.sketchpadRef?.current?.data
        }
    }

    submit() {
        if (this.value.content == "") return;
        this.props.onSubmit?.();
        this.setState({type: "message"});
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
        } else if (this.state.type == "sketch") {
            return [
                <DrawingComposer
                    ref={this.sketchpadRef}
                    strokeColor={this.state.sketchToolColor}
                    strokeWidth={this.state.sketchToolWidth}
                    eraseMode={this.state.sketchTool == "eraser"}
                ></DrawingComposer>,
                <DrawingComposerToolbar
                    onChangeStrokeColor={(color) => {
                        this.setState({sketchToolColor: color})
                    }}
                    onChangeStrokeWidth={(width) => {
                        this.setState({sketchToolWidth: width})
                    }}
                    onChangeTool={(tool) => {
                        this.setState({sketchTool: tool});
                        this.sketchpadRef.current?.eraseMode(tool == "eraser")
                    }}
                ></DrawingComposerToolbar>
            ]
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
                    value={this.state.type}
                >
                    <optgroup label="Messages">
                        <option value="message">Text message</option>
                        <option value="sketch">Sketch drawing</option>
                    </optgroup>
                    <optgroup label="Questions">
                        <option value="comparison_text_strict">Text question (strict)</option>
                        <option value="comparison_text_medium">Text question (medium)</option>
                        <option value="comparison_text_similarity">Text question (smart)</option>
                        <option value="comparison_num_strict">Numercial question</option>
                        <option value="comparison_math_equality">Math question</option>
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