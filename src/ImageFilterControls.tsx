import React, { SFC, useEffect, useReducer, Reducer } from 'react';

interface ImageFilterControlsState {
  blur: number;
}

type ImageFilterControlsActionTypes =
  | 'blur';

interface ImageFilterControlsAction {
  type: ImageFilterControlsActionTypes;
  value: number;
}

const getInitialState = (): ImageFilterControlsState => ({
  blur: 0,
});

const reducer: Reducer<ImageFilterControlsState, ImageFilterControlsAction> = (
  state: ImageFilterControlsState,
  action: ImageFilterControlsAction,
) => {
  switch (action.type) {
    case 'blur': {
      return { ...state, blur: action.value };
    }
    default: return state;
  }
};

const blur = (value: number) => ({
  type: 'blur' as 'blur',
  value,
});

const stateToFilter = (state: ImageFilterControlsState): string => {
  const { blur } = state;
  return `blur(${blur}px)`;
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
  );
};

export default ImageFilterControls;
