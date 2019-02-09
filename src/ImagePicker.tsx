import React, { SFC } from 'react';

interface ImagePickerProps {
  onChange: (file: File) => void;
}

export const ImagePicker: SFC<ImagePickerProps> = (props) => {
  const { onChange } = props;
  return (
    <>
      <label
        htmlFor="image-editor"
      >
        Choose a picture:
      </label>

      <input
        type="file"
        id="image-editor"
        name="image-editor"
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null;

          if (file) {
            onChange(file);
          }
        }}
      />
    </>
  )
}

export default ImagePicker;
