import React, { SFC, useEffect, useReducer, Reducer } from 'react';

interface ImageFilterControlsState {
  blur: number;
  brightness: number;
  contrast: number;
  hueRotate: number;
  invert: number;
}

type ImageFilterControlsActionTypes =
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'hueRotate'
  | 'invert'
;

interface ImageFilterControlsAction {
  type: ImageFilterControlsActionTypes;
  value: number;
}

const getInitialState = (): ImageFilterControlsState => ({
  blur: 0,
  brightness: 100,
  contrast: 100,
  hueRotate: 0,
  invert: 0,
});

const reducer: Reducer<ImageFilterControlsState, ImageFilterControlsAction> = (
  state: ImageFilterControlsState,
  action: ImageFilterControlsAction,
) => {
  switch (action.type) {
    case 'blur': return { ...state, blur: action.value };
    case 'hueRotate': return { ...state, hueRotate: action.value };
    case 'invert': return { ...state, invert: action.value };
    default: return state;
  }
};

const blur = (value: number) => ({
  type: 'blur' as 'blur',
  value,
});

const hueRotate = (value: number) => ({
  type: 'hueRotate' as 'hueRotate',
  value,
});

const invert = (value: number) => ({
  type: 'invert' as 'invert',
  value,
});

const stateToFilter = (state: ImageFilterControlsState): string => {
  const { blur, hueRotate, invert } = state;
  return `blur(${blur}px) hue-rotate(${hueRotate}deg) invert(${invert}%)`;
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
          max={50}
          value={state.blur}
          step={1}
          onChange={(e) => dispatch(blur(parseInt(e.target.value, 10)))}
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

    </div>
  );
};

export default ImageFilterControls;
