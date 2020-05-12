/* tslint:disable*/
import * as React from "react";

interface Props {
    className?: string;
}

const ProblemSirkel: React.StatelessComponent<Props> = ({className}) => (
    <svg
        className="problemsirkelIkon"
        xmlns="http://www.w3.org/2000/svg"
        width="32px"
        height="32px"
        viewBox="0 0 24 24"
        focusable="false"
    >
        <g stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" fill="none">
            <path
                strokeLinecap="round"
                d="M22.498 12.31c.105 6.075-4.923 11.086-10.998 11.192C5.426 23.607.607 18.768.502 12.692.396 6.619 5.426 1.607 11.5 1.502c6.074-.106 10.893 4.734 10.998 10.808zM11.5 14V7"
            />
            <path d="M12 17.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
        </g>
    </svg>
);
export default ProblemSirkel;
