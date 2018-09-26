import * as React from 'react';
import {DigisosFarge} from "./DigisosFarger";


interface OwnProps {
	size?: number;
	visBakgrundsSirkel: boolean;
	bakgrundsFarge?: DigisosFarge;
}

class Hensyn extends React.Component<OwnProps, {}> {

	render(){
		const height = this.props.size || 60;
		const width = this.props.size || 60;
		const bakgrundsFarge = this.props.bakgrundsFarge || DigisosFarge.NAV_GRONN_LIGHTEN_60;
		const showBackgroundCircle: boolean = this.props.visBakgrundsSirkel;

		return(
			<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 100 100" className={"brevkonvolutt__" + bakgrundsFarge}>
				<g>
					<rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/>
				</g>
				<g>
					{showBackgroundCircle &&
					<path stroke="null" className="bakgrunnsSirkel"
					      d="m98.16797,51.04702q0,-9.53263 -3.69523,-18.23518q-3.53457,-8.408 -10.0414,-14.88804q-6.48005,-6.48005 -14.88804,-10.0414q-8.70254,-3.69523 -18.23518,-3.69523q-9.53263,0 -18.23518,3.69523q-8.408,3.56135 -14.91482,10.0414q-6.48005,6.48005 -10.0414,14.88804q-3.66846,8.70254 -3.66846,18.23518q0,9.53263 3.66846,18.23518q3.56135,8.408 10.0414,14.91482q6.50683,6.48005 14.91482,10.0414q8.70254,3.66846 18.23518,3.66846q9.53263,0 18.23518,-3.66846q8.408,-3.56135 14.88804,-10.0414q6.50683,-6.50683 10.0414,-14.91482q3.69523,-8.70254 3.69523,-18.23518z"
					/>
					}
					<rect x="44" y="70" display="inline" fill="#FFFFFF" width="16" height="16"/>
					<rect x="44" y="15" fill="#FFFFFF" width="16" height="48"/>
				</g>
			</svg>
		)
	}
}

export default Hensyn;