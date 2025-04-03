import React, {useRef, useState } from 'react'
import './App.css'
import ScreenShot from 'html2canvas'

export default function App() {

const[tcolor, setTColor] = useState('000')
const[bgCol, setBgCol] = useState('000')
const image = useRef(null)
const [fontSize, setFontSize]=useState(16);//comp



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
        <h2 id="head" ref={image} 
        contentEditable="true"
        onFocus={handleFocus}
        onBlur={handleBlur}
        >Type here...</h2>
               
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


