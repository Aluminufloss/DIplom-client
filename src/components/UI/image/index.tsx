"use client";

import Image from "next/image";

type PropsType = {
  width?: number;
  height?: number;
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
};

const ReusableImage: React.FC<PropsType> = (props) => {
  const width = props.width ?? 24;
  const height = props.height ?? 24;

  return (
    <Image 
			width={width} 
			height={height} 
			src={props.src} 
			alt={props.alt} 
      fill={props.fill}
      className={props.className}
		/>
  );
};

export default ReusableImage;
