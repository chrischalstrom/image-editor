import React, { SFC, useRef, useEffect } from 'react';

import './Canvas.css';

interface CanvasProps {
  initialImage: File | null;
}

export const Canvas: SFC<CanvasProps> = (props) => {
  const { initialImage } = props;
  const canvas = useRef(null as HTMLCanvasElement | null);

  useEffect(() => {
    if (!initialImage || !canvas.current) { return; }

    const reader = new FileReader();
    reader.readAsDataURL(initialImage);

    const onReaderLoad = () => {
      reader.removeEventListener('load', onReaderLoad);

      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        const ctx = (canvas.current as HTMLCanvasElement).getContext('2d');
        (ctx as CanvasRenderingContext2D).drawImage(image, 0, 0);
      }
    };

    reader.addEventListener('load', onReaderLoad);
  }, [initialImage]);

  return (
    <div className="canvas-container">
      <canvas
        width={800}
        height={800}
        ref={canvas}
      />
    </div>
  );
};

export default Canvas;
