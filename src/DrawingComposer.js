import React, { createRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

export default class DrawingComposer extends React.Component {
    constructor(){
        super();
        this.canvasRef = createRef();
        this.data = ""
    }

    eraseMode(toggle){
        this.canvasRef.current?.eraseMode( toggle )
    }

    render(){
        return (
            <div className="chat-toolbar-canvas">
                <ReactSketchCanvas
                    ref={this.canvasRef}
                    strokeColor={this.props.strokeColor}
                    strokeWidth={this.props.strokeWidth}
                    eraserWidth={this.props.strokeWidth}
                    canvasColor="transparent"
                    onStroke={async () => {
                        const data = await this.canvasRef.current.exportImage('png');
                        this.data = data;
                    }}
                >
                </ReactSketchCanvas>
            </div>
        )
    }

}