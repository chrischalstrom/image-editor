import React, { SFC, useState } from 'react';

import Canvas from './Canvas';
import ImagePicker from './ImagePicker';
import { invert, grayscale, createLuminosity, createHueRotate } from './imageFilters';

export const ImageEditor: SFC = () => {
  const [inputImage, setInputImage] = useState(null as File | null);

  return (
    <>
      <ImagePicker
        onChange={setInputImage}
      />

      <Canvas
        initialImage={inputImage}
        filters={[createHueRotate(90)]}
      />
    </>
  );
}

export default ImageEditor;
