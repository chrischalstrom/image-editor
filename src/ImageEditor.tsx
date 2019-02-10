import React, { SFC, useState } from 'react';

import Canvas from './Canvas';
import ImagePicker from './ImagePicker';
import { invert, grayscale } from './imageFilters';

export const ImageEditor: SFC = () => {
  const [inputImage, setInputImage] = useState(null as File | null);

  return (
    <>
      <ImagePicker
        onChange={setInputImage}
      />

      <Canvas
        initialImage={inputImage}
        filters={[grayscale]}
      />
    </>
  );
}

export default ImageEditor;
