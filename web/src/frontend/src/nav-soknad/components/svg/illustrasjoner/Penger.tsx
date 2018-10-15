import * as React from "react";

const Penger: React.StatelessComponent<{}> = ({}) => {
	return (
		<div>
			<svg width={100} height={100} className="kun_desktop">
				<g fill="none" fillRule="evenodd">
					<circle cx={50} cy={50} r={50} fill="#CDE7D8" />
					<path fill="#C86151" d="M25 35h50v29H25z" />
					<path
						fill="#E3B0A8"
						d="M62 35h8v29h-8zm-34 2h2v5h-2zm3 0h4v5h-4zm5 0h4v5h-4z"
					/>
					<g transform="translate(28 54)">
						<path
							fill="#FFA733"
							d="M13 9h11v2H13zm-1-2h11v2H12zM0 9h11v2H0zm13-4h11v2H13zm1-2h11v2H14z"
						/>
						<circle cx={7.5} cy={4.5} r={4.5} fill="#E9E7E7" />
					</g>
				</g>
			</svg>
			<svg width={80} height={80} className="kun_mobil">
				<g fill="none" fillRule="evenodd">
					<circle cx={40} cy={40} r={40} fill="#CDE7D8" />
					<path fill="#C86151" d="M20 28h40v23H20z" />
					<path
						fill="#E3B0A8"
						d="M50 28h6v23h-6zm-28 2h2v4h-2zm3 0h3v4h-3zm4 0h3v4h-3z"
					/>
					<g transform="translate(21.4 42.2)">
						<path
							fill="#FFA733"
							d="M11.6 7.8h9v2h-9zm-1-2h9v2h-9zm-10 2h9v2h-9zm11-4h9v2h-9zm1-2h9v2h-9z"
						/>
						<circle cx={7.1} cy={4.3} r={3.5} fill="#E9E7E7" />
					</g>
				</g>
			</svg>
		</div>
	);
};


export default Penger
