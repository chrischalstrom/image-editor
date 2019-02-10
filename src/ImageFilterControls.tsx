import React, { SFC, useEffect, useReducer, Reducer } from 'react';

interface ImageFilterControlsState {
  blur: number;
  brightness: number;
  contrast: number;
  hueRotate: number;
}

type ImageFilterControlsActionTypes =
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'hueRotate';

interface ImageFilterControlsAction {
  type: ImageFilterControlsActionTypes;
  value: number;
}

const getInitialState = (): ImageFilterControlsState => ({
  blur: 0,
  brightness: 100,
  contrast: 100,
  hueRotate: 0,
});

const reducer: Reducer<ImageFilterControlsState, ImageFilterControlsAction> = (
  state: ImageFilterControlsState,
  action: ImageFilterControlsAction,
) => {
  switch (action.type) {
    case 'blur': return { ...state, blur: action.value };
    case 'hueRotate': return { ...state, hueRotate: action.value };
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

const stateToFilter = (state: ImageFilterControlsState): string => {
  const { blur, hueRotate } = state;
  return `blur(${blur}px) hue-rotate(${hueRotate}deg)`;
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
    </div>
  );
};

export default ImageFilterControls;
