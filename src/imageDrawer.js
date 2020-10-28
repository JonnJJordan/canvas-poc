import React, { useEffect, useRef, useState } from 'react'
import logo from './logo.svg';

const ImageDrawer = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imageRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    contextRef.current = ctx;
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  const save = () => {
    imageRef.current.style.display = 'block';
    setPreview(canvasRef.current.toDataURL());
  }

  return (
    <div>
      <canvas 
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        style={{ backgroundImage: `url('${logo}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center', border: '1px solid black' }}
      >
      </canvas>
      <img src={preview} ref={imageRef} style={{ display: 'none' }} />
      <input type="button" value="Guardar" onClick={save} />
    </div>
  );
};

export default ImageDrawer
