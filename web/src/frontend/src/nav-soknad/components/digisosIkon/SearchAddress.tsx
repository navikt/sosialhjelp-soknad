import * as React from "react";

const SearchAddress: React.FC = () => {
	return (<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		width="24" height="24" viewBox="0 0 24 24">
		<defs>
			<path id="search_address_a"
			      d="M23.854 23.146A.502.502 0 0 1 23.5 24a.498.498 0 0 1-.353-.146l-9.01-9.01A8.45 8.45 0 0 1 8.5 17C3.813 17 0 13.187 0 8.5 0 3.813 3.813 0 8.5 0 13.187 0 17 3.813 17 8.5a8.446 8.446 0 0 1-2.156 5.636l9.01 9.01zM1 8.5C1 12.636 4.364 16 8.5 16S16 12.636 16 8.5 12.636 1 8.5 1 1 4.364 1 8.5z"/>
		</defs>
		<g fill="none" fillRule="evenodd">
			<mask id="search_address_b" fill="#fff">
				<use xlinkHref="#search_address_a"/>
			</mask>
			<use fill="#3E3832" xlinkHref="#search_address_a"/>
			<g fill="#0067C5" mask="url(#search_address_b)">
				<path d="M0 24h24V0H0z"/>
			</g>
		</g>
	</svg>);
};

export default SearchAddress;
