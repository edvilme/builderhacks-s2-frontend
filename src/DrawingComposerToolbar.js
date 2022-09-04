import { useState } from "react"

export default function DrawingComposerToolbar({
    onChangeTool, 
    onChangeStrokeWidth, 
    onChangeStrokeColor    
}){
    const [tool, setTool] = useState("pen")

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: '1'}}>
            <div style={{display: 'flex', alignItems: 'center', columnGap: '1em'}}>
                <strong>Tool</strong>
                <label>
                    <input type="radio" name="sketch-tool" value="pen"
                        onChange={e => {
                            if(!e.target.checked) return;
                            setTool("pen");
                            onChangeTool?.("pen")
                        }}
                        checked={tool == "pen"}
                    ></input> Pen
                </label>
                <label>
                    <input type="radio" name="sketch-tool" value="eraser"
                        onChange={e => {
                            if(!e.target.checked) return;
                            setTool("eraser");
                            onChangeTool?.("eraser")
                        }}
                    ></input> Eraser
                </label>
            </div>
            <label>
                <strong>Stroke</strong> <input type="range" min={1} max={30} name="sketch-stroke-width"
                    onChange={e => {
                        onChangeStrokeWidth?.(e.target.value)
                    }}
                ></input>
            </label>
            {
                tool == "pen" ? 
                <label>
                    <strong>Color</strong> <input type="color" name="sketch-stroke-color"
                        onChange={e => {
                            onChangeStrokeColor?.(e.target.value)
                        }}
                    ></input>
                </label> : ""
            }
        </div>
    )
}