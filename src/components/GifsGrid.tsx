import { GIPHY_MAX_OFFSET } from "appConstants";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IGifObject } from "types/gifObject";
import GifItem from "./GifItem";

interface IGifsGridProps {
  gifs: IGifObject[];
  onNext?: (e?: any) => void;
}

const GifsGrid: React.FC<IGifsGridProps> = ({ gifs, onNext }) => {
  return (
    <InfiniteScroll
      dataLength={gifs.length}
      next={onNext as any}
      hasMore={gifs.length < GIPHY_MAX_OFFSET}
      loader={null}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      className="grid gap-10"
    >
      {gifs.map(({ id, images, title }, idx) => (
        <GifItem key={id + idx} title={title} {...images.downsized} />
      ))}
    </InfiniteScroll>
  );
};
export default GifsGrid;
