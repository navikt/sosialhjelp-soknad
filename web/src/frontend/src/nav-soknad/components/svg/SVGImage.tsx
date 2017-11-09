import * as React from "react";

interface Props {
	src: string;
	width?: number;
	height?: number;
}

const SVGImage: React.StatelessComponent<Props> = ({
	src,
	width = 50,
	height = 50
}) => (
	<img className="svgImage" src={src} width={width} height={height} alt="" />
);

export default SVGImage;
