import React, { SFC, useState } from 'react';

import Canvas from './Canvas';
import ImagePicker from './ImagePicker';
import ImageFilterControls from './ImageFilterControls';

export const ImageEditor: SFC = () => {
  const [inputImage, setInputImage] = useState(null as File | null);
  const [filter, setFilter] = useState('');

  return (
    <>
      <ImagePicker
        onChange={setInputImage}
      />

      <ImageFilterControls
        onChange={setFilter}
      />

      <Canvas
        initialImage={inputImage}
        filter={filter}
      />
    </>
  );
}

export default ImageEditor;
