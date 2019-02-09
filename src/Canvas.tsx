import React, { SFC, useRef, useEffect, useState } from 'react';

import './Canvas.css';

interface CanvasProps {
  initialImage: File | null;
}

export const Canvas: SFC<CanvasProps> = (props) => {
  const { initialImage } = props;

  const canvas = useRef(null as HTMLCanvasElement | null);
  const imageElement = useRef(null as HTMLImageElement | null);
  const [{ width, height }, setDimensions] = useState({ width: 300, height: 200 });

  useEffect(() => {
    if (!initialImage || !canvas.current) { return; }

    const reader = new FileReader();
    reader.readAsDataURL(initialImage);

    const onReaderLoad = () => {
      reader.removeEventListener('load', onReaderLoad);

      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        imageElement.current = image;

        setDimensions({ width: image.width, height: image.height });
        const ctx = (canvas.current as HTMLCanvasElement).getContext('2d');
        (ctx as CanvasRenderingContext2D).drawImage(image, 0, 0);

      }
    };

    reader.addEventListener('load', onReaderLoad);
  }, [initialImage]);

  return (
    <div className="canvas-container">
      <canvas
        width={width}
        height={height}
        ref={canvas}
      />
    </div>
  );
};

export default Canvas;
