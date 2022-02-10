// https://stackoverflow.com/questions/32888728/correct-way-to-share-functions-between-components-in-react/52619982

export const loadImage = (url:string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = url;
});

export default loadImage;