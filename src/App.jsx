import React, {useRef, useState } from 'react'
import './App.css'
import ScreenShot from 'html2canvas'

export default function App() {

const[tcolor, setTColor] = useState('#000')
const[bgCol, setBgCol] = useState('#000')
const image = useRef(null)
const [fontSize, setFontSize]=useState(16);//comp

const sizePresets = [
  { name: "Instagram Story (9:16)", width: 270, height: 480 },
  { name: "Instagram Post (1:1)", width: 300, height: 300 },
  { name: "YouTube Thumbnail (16:9)", width: 320, height: 180 },
  { name: "Facebook Post (1.91:1)", width: 360, height: 188 },
  { name: "Landscape (16:9)", width: 400, height: 225 },
  { name: "Portrait (4:5)", width: 300, height: 375 },
  { name: "Custom", width: '', height: '' }
];


const [selectedPresetIndex, setSelectedPresetIndex] = useState(5);
const [canvasSize, setCanvasSize] = useState({
  width: sizePresets[5].width,
  height: sizePresets[5].height
});

const handlePresetChange = (index) => {
  setSelectedPresetIndex(index);
  const preset = sizePresets[index];
  if (preset.name === "Custom") {
    setCanvasSize({ width: '', height: '' });
  } else {
    setCanvasSize({ width: preset.width, height: preset.height });
  }
};





// last updated code
const handleFocus = () => {
  if (image.current.textContent === "Type here...") {
   image.current.textContent=""
  }
};

const handleBlur = () => {
  if (image.current.textContent ==="") {
    image.current.textContent="Type here...";
  }
};


  const ChangeColor= (colorName)=>{
    image.current.style.color=colorName
  }

  const ChangeBackgroundColor= (colorName)=>{
    image.current.style.backgroundColor=colorName;
  }

  const ChangeFontStyle = (fontName) =>{
    image.current.style.fontFamily=fontName;
  }

const ChangeTextAlign=(alignName)=>{
  image.current.style.textAlign=alignName;
}

const fontSizeChange=(e)=>{
  const newSize=e.target.value+"px";
  setFontSize(e.target.value);
  image.current.style.fontSize=newSize;
}


 // Download functionality
 const downloadImage=()=>{
    // Add some padding for better appearance in the image
    const originalPadding = image.current.style.padding
    image.current.style.padding = '20px';
    
    ScreenShot(image.current, {
        backgroundColor: image.current.style.backgroundColor || 'transparent',
        scale: 2 // Higher quality
    }).then(canvas => {
        // Restore original padding
        image.current.style.padding = originalPadding;
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'styled-text.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
  return (
    <>
      <h1>Color And Picker</h1>
      <div className="main">
        <div id='text-button'>
        <h2
  id="head"
  ref={image}
  contentEditable="true"
  onFocus={handleFocus}
  onBlur={handleBlur}
  style={{
    width: `${canvasSize.width}px`,
    height: `${canvasSize.height}px`,
    overflow: 'auto',
    padding: '10px',
    border: '2px dashed #ccc'
  }}
>
  Type here...
</h2>
<div className='warn'>
<span>! Make sure your text must not be overflow</span>
</div>
<div className='resize-pic' style={{ marginBottom: "20px" }}>
  <h3>Resize the picture</h3>
  <select className='select-size' value={selectedPresetIndex} onChange={(e) => handlePresetChange(Number(e.target.value))}>
    {sizePresets.map((preset, index) => (
      <option key={index} value={index}>
        {preset.name}
      </option>
    ))}
  </select>

  {sizePresets[selectedPresetIndex].name === "Custom" && (
    <div className='options' style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <input
        type="number"
        placeholder="Width"
        value={canvasSize.width}
        onChange={(e) => setCanvasSize(prev => ({ ...prev, width: +e.target.value }))}
      />
      <input
        type="number"
        placeholder="Height"
        value={canvasSize.height}
        onChange={(e) => setCanvasSize(prev => ({ ...prev, height: +e.target.value }))}
      />
    </div>
  )}
</div>

               
                <div className='downloadbtn'>
                    <button className="download-btn" id="downloadBtn" onClick={downloadImage} >download
                <img src="./photo.png" alt="img" /> 
            </button>
        </div>
    </div>
            <div className="container">
                <h3 id='bg-h3'>Choose background Color</h3>
                <div className="slides">
                        <button className='red' onClick={()=>{ChangeBackgroundColor('red')}} ></button>
                        <button className='green' onClick={()=>{ChangeBackgroundColor('green')}} ></button>
                        <button className='blue' onClick={()=>{ChangeBackgroundColor('blue')}} ></button>
                        <button className='pink' onClick={()=>{ChangeBackgroundColor('pink')}} ></button>
                        <button className='purple' onClick={()=>{ChangeBackgroundColor('purple')}}></button>
                        <input 
                        type='color' 
                        className='colorpicker' 
                        onChange={(event)=>{
                          ChangeBackgroundColor(event.target.value)
                          setBgCol(event.target.value)
                          }} 
                        value={bgCol}></input>
                </div>
                <h3 id='color-h3'>Choose Color</h3>
                <div className="slides">
                        <button className='red' onClick={()=>{ChangeColor('red')}}  ></button>
                        <button className='green' onClick={()=>{ChangeColor('green')}}></button>
                        <button className='blue' onClick={()=>{ChangeColor('blue')}} ></button>
                        <button className='pink' onClick={()=>{ChangeColor('pink')}} ></button>
                        <button className='purple' onClick={()=>{ChangeColor('purple')}}></button>
                        <input 
                        type='color' 
                        className='colorpicker' 
                        value={tcolor} 
                        onChange={(event)=>{
                          setTColor(event.target.value)
                          ChangeColor(event.target.value)
                        }}></input>
                    </div>

                    <h3 id='fontstyle-h3'>Choose Font Style</h3>
                    <div className="slides" id="font-slides">
                            
                            <button className="font-style" id='cursive' onClick={()=>{ChangeFontStyle('cursive')}} >Font</button>
                            <button className="font-style" id='fantasy' onClick={()=>{ChangeFontStyle('fantasy')}} >Font</button>
                            <button className="font-style" id='monospace' onClick={()=>{ChangeFontStyle('monospace')}} >Font</button>
                            <button className="font-style" id='sans-serif' onClick={()=>{ChangeFontStyle('sans-serif')}} >Font</button>
                            <button className="font-style" id='serif' onClick={()=>{ChangeFontStyle('serif')}} >Font</button>
                            <button className="font-style" id='Trebuchet MS' onClick={()=>{ChangeFontStyle('Trebuchet MS')}}>Font</button>
                            <button className="font-style" id='Georgia' onClick={()=>{ChangeFontStyle('Georgia')}} >Font</button>
                            <button className="font-style" id='Montserrat' onClick={()=>{ChangeFontStyle('Montserrat')}}>Font</button>
                            <button className="font-style" id='Verdana' onClick={()=>{ChangeFontStyle('Verdana')}} >Font</button>    
                </div>

                <h3>Align Text</h3>
                <div id="setAlign" >
                    <button onClick={()=>{ChangeTextAlign('start')}}  id="left" ><img src="align-left.png" alt=""/>L</button>
                    <button onClick={()=>{ChangeTextAlign('right')}}   id="right" ><img src="align-right.png" alt=""/>R</button>
                    <button onClick={()=>{ChangeTextAlign('center')}}  id="format" ><img src="format.png" alt=""/>F</button>
                    <button onClick={()=>{ChangeTextAlign('justify')}} id="justify" ><img src="justify.png" alt=""/>J</button>
                </div>

                <h3 id='fontSize-h3'>Choose Font Size</h3>
                <div id='font-range'>
                <input 
                type="range" 
                name="sz" 
                min="5" 
                max="100" 
                value={fontSize} 
                onChange={fontSizeChange}  id="range"/><strong>{fontSize}px</strong>
            </div>
        </div>
    </div>
    </>
  )
}


