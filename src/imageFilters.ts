export const invert = (imageData: ImageData): ImageData => {
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }

  return imageData;
}

export const grayscale = (imageData: ImageData): ImageData => {
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }

  return imageData;
};

export const createLuminosity = (luminosity: number) =>
(imageData: ImageData): ImageData => {
  const { data } = imageData;

  // create a scale around 0.5 luminosity based on the position of the color channel
  // 0 -----x---------------------- 255
  // 0L     0.5L                    1L
  const scale = (channel: number) => {
    if (luminosity >= 0.5) {
      const distance = 255 - channel;
      return channel + (2 * luminosity - 1) * distance;
    } else {
      return channel - (1 - 2 * luminosity) * channel;
    }
  };

  for (let i = 0; i < data.length; i += 4) {
    data[i] = scale(data[i]);
    data[i + 1] = scale(data[i + 1]);
    data[i + 2] = scale(data[i + 2]);
  }

  return imageData;
}

const toRadians = (degrees: number) => degrees * Math.PI / 180;

// https://stackoverflow.com/a/8510751
export const createHueRotate = (degrees: number) =>
(imageData: ImageData): ImageData => {
  const { data } = imageData;

  const matrix: number[][] = [[], [], []];

  const cosA = Math.cos(toRadians(degrees));
  const sinA = Math.sin(toRadians(degrees));

  matrix[0][0] = cosA + (1.0 - cosA) / 3.0;
  matrix[0][1] = 1/3 * (1.0 - cosA) - Math.sqrt(1/3) * sinA;
  matrix[0][2] = 1/3 * (1.0 - cosA) + Math.sqrt(1/3) * sinA;
  matrix[1][0] = 1/3 * (1.0 - cosA) + Math.sqrt(1/3) * sinA;
  matrix[1][1] = cosA + 1/3*(1.0 - cosA);
  matrix[1][2] = 1/3 * (1.0 - cosA) - Math.sqrt(1/3) * sinA;
  matrix[2][0] = 1/3 * (1.0 - cosA) - Math.sqrt(1/3) * sinA;
  matrix[2][1] = 1/3 * (1.0 - cosA) + Math.sqrt(1/3) * sinA;
  matrix[2][2] = cosA + 1/3 * (1.0 - cosA);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    data[i] = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
    data[i + 1] = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
    data[i + 2] = r + matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];
  }

  return imageData;
};

// saturation
// opacity?
