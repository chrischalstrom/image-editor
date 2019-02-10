import React, { SFC, useRef, useEffect, useState } from 'react';

import './Canvas.css';

interface CanvasProps {
  initialImage: File | null;
  filter?: string;
}

export const Canvas: SFC<CanvasProps> = ({ filter = '', ...props }) => {
  const { initialImage } = props;

  console.log('filt=', filter);

  const canvas = useRef(null as HTMLCanvasElement | null);
  const ctx = useRef(null as CanvasRenderingContext2D | null);
  const imageElement = useRef(null as HTMLImageElement | null);
  const [{ width, height }, setDimensions] = useState({ width: 300, height: 200 });

  useEffect(() => {
    createImage(initialImage).then((image) => {
      imageElement.current = image;
      setDimensions({ width: image.width, height: image.height });

      ctx.current = (canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
      // ctx.current.filter = filter;
      ctx.current.drawImage(image, 0, 0);
    }).catch(() => {});
  }, [initialImage]);

  useEffect(() => {
    if (filter.trim().length === 0 || !ctx.current || !imageElement.current) {
      return;
    }

    ctx.current.filter = filter;
    ctx.current.clearRect(0, 0, imageElement.current.width, imageElement.current.height);
    ctx.current.drawImage(imageElement.current, 0, 0);
  }, [filter]);

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

const createImage = (initialImage: File | null): Promise<HTMLImageElement> => {
  if (!initialImage) { return Promise.reject(); }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(initialImage);

    const onReaderLoad = () => {
      reader.removeEventListener('load', onReaderLoad);

      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        resolve(image);
      }
    };

    reader.addEventListener('load', onReaderLoad);
  });
};

export default Canvas;
