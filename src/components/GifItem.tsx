import React from "react";

interface IGifItemProps {
  title: string;
  url: string;
  height: number;
  width: number;
}

const GifItem: React.FC<IGifItemProps> = ({ title, url, height, width }) => {
  return (
    <div>
      <figure className="flex justify-center">
        <img
          data-cy="gifItem"
          height={height}
          width={width}
          src={url}
          alt={title}
        />
      </figure>
      <h3 className="mt-4 text-center">{title}</h3>
    </div>
  );
};
export default GifItem;
