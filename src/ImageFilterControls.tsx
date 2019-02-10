import React, { SFC, useEffect, useReducer, Reducer } from 'react';
import { NumericDictionary } from 'lodash';

interface ImageFilterControlsState {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
}

type ImageFilterControlsActionTypes =
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'grayscale'
  | 'hueRotate'
  | 'invert'
  | 'opacity'
  | 'saturate'
  | 'sepia'
;

interface ImageFilterControlsAction {
  type: ImageFilterControlsActionTypes;
  value: number;
}

const getInitialState = (): ImageFilterControlsState => ({
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
});

const reducer: Reducer<
  ImageFilterControlsState,
  ImageFilterControlsAction | { type: 'reset' }
> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'blur': return { ...state, blur: action.value };
    case 'brightness': return { ...state, brightness: action.value };
    case 'contrast': return { ...state, contrast: action.value };
    case 'grayscale': return { ...state, grayscale: action.value };
    case 'hueRotate': return { ...state, hueRotate: action.value };
    case 'invert': return { ...state, invert: action.value };
    case 'opacity': return { ...state, opacity: action.value };
    case 'saturate': return { ...state, saturate: action.value };
    case 'sepia': return { ...state, sepia: action.value };
    case 'reset': return getInitialState();
    default: return state;
  }
};

const blur = (value: number) => ({ type: 'blur' as 'blur', value });
const brightness = (value: number) => ({ type: 'brightness' as 'brightness', value });
const contrast = (value: number) => ({ type: 'contrast' as 'contrast', value });
const grayscale = (value: number) => ({ type: 'grayscale' as 'grayscale', value });
const hueRotate = (value: number) => ({ type: 'hueRotate' as 'hueRotate', value });
const invert = (value: number) => ({ type: 'invert' as 'invert', value });
const opacity = (value: number) => ({ type: 'opacity' as 'opacity', value });
const saturate = (value: number) => ({ type: 'saturate' as 'saturate', value });
const sepia = (value: number) => ({ type: 'sepia' as 'sepia', value });

const stateToFilter = (state: ImageFilterControlsState): string => {
  const {
    blur, brightness, contrast, grayscale, hueRotate,
    invert, opacity, saturate, sepia,
  } = state;
  return (
    `blur(${blur}px) ` +
    `brightness(${brightness}%) ` +
    `contrast(${contrast}%) ` +
    `grayscale(${grayscale}%) ` +
    `hue-rotate(${hueRotate}deg) ` +
    `invert(${invert}%) ` +
    `opacity(${opacity}%) ` +
    `saturate(${saturate}%) ` +
    `sepia(${sepia}%)`
  );
};

interface ImageFilterControlsProps {
  onChange: (filter: string) => void;
}

export const ImageFilterControls: SFC<ImageFilterControlsProps> = (props) => {
  const { onChange } = props;
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => onChange(stateToFilter(state)), [state]);

  return (
    <div>
      <div>
        <label htmlFor="blur-input">Blur</label>
        <input
          type="range"
          id="blur-input"
          name="blur-input"
          min={0}
          max={15}
          value={state.blur}
          step={1}
          onChange={(e) => dispatch(blur(parseInt(e.target.value, 10)))}
        />
      </div>

      <div>
        <label htmlFor="brightness-input">Brightness</label>
        <input
          type="range"
          id="brightness-input"
          name="brightness-input"
          min={0}
          max={400}
          value={state.brightness}
          step={1}
          onChange={(e) => dispatch(brightness(parseInt(e.target.value, 10)))}
        />
      </div>

      <div>
        <label htmlFor="contrast-input">Contrast</label>
        <input
          type="range"
          id="contrast-input"
          name="contrast-input"
          min={0}
          max={400}
          value={state.contrast}
          step={1}
          onChange={(e) => dispatch(contrast(parseInt(e.target.value, 10)))}
        />
      </div>

      <div>
        <label htmlFor="grayscale-input">Grayscale</label>
        <input
          type="range"
          id="grayscale-input"
          name="grayscale-input"
          min={0}
          max={100}
          value={state.grayscale}
          step={1}
          onChange={(e) => dispatch(grayscale(parseInt(e.target.value, 10)))}
        />
      </div>

      <div>
        <label htmlFor="hue-rotate-input">Hue Rotate</label>
        <input
          type="range"
          id="hue-rotate-input"
          name="hue-rotate-input"
          min={0}
          max={360}
          value={state.hueRotate}
          step={1}
          onChange={(e) => dispatch(hueRotate(parseInt(e.target.value, 10)))}
        />
      </div>

      <div>
        <label htmlFor="invert-input">Invert</label>
        <input
          type="range"
          id="invert-input"
          name="invert-input"
          min={0}
          max={100}
          value={state.invert}
          step={1}
          onChange={(e) => dispatch(invert(parseInt(e.target.value, 10)))}
        />
      </div>

      <div>
        <label htmlFor="opacity-input">Opacity</label>
        <input
          type="range"
          id="opacity-input"
          name="opacity-input"
          min={0}
          max={100}
          value={state.opacity}
          step={1}
          onChange={(e) => dispatch(opacity(parseInt(e.target.value, 10)))}
        />
      </div>

      <div>
        <label htmlFor="saturate-input">Saturate</label>
        <input
          type="range"
          id="saturate-input"
          name="saturate-input"
          min={0}
          max={800}
          value={state.saturate}
          step={1}
          onChange={(e) => dispatch(saturate(parseInt(e.target.value, 10)))}
        />
      </div>

      <div>
        <label htmlFor="sepia-input">Sepia</label>
        <input
          type="range"
          id="sepia-input"
          name="sepia-input"
          min={0}
          max={100}
          value={state.sepia}
          step={1}
          onChange={(e) => dispatch(sepia(parseInt(e.target.value, 10)))}
        />
      </div>

      <button onClick={(e) => dispatch({ type: 'reset' })}>Reset filters</button>

    </div>
  );
};

export default ImageFilterControls;
