import { IGiphyImage } from "./giphyImage";

export interface IGifObject {
  id: string;
  type: string;
  slug: string;
  url: string;
  title: string;
  images: {
    preview_gif: IGiphyImage;
    downsized: IGiphyImage;
  };
}
