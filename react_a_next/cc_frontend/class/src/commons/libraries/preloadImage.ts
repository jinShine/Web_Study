export const PRELOADED_IMAGES: HTMLImageElement[] = [];

export const preloadImage = (images: string[]) => {
  images.forEach((url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => PRELOADED_IMAGES.push(img);
  });
};
