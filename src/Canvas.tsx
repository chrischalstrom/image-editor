import React, { SFC, useRef, useEffect, useState } from 'react';
import compose from 'lodash/fp/compose';

import './Canvas.css';

interface CanvasProps {
  initialImage: File | null;
  filters?: Array<(imageData: ImageData) => ImageData>;
}

export const Canvas: SFC<CanvasProps> = ({ filters = [], ...props }) => {
  const { initialImage } = props;

  const canvas = useRef(null as HTMLCanvasElement | null);
  const ctx = useRef(null as CanvasRenderingContext2D | null);
  const [{ width, height }, setDimensions] = useState({ width: 300, height: 200 });

  useEffect(() => {
    createImage(initialImage).then((image) => {
      setDimensions({ width: image.width, height: image.height });

      ctx.current = (canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
      ctx.current.drawImage(image, 0, 0);

      let imageData = ctx.current.getImageData(0, 0, image.width, image.height);

      if (filters.length > 0) {
        imageData = compose(filters)(imageData);
        ctx.current.putImageData(imageData, 0, 0);
      }
    }).catch(() => {});
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
