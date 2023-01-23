import * as React from "react";
import {DigisosFarge} from "./DigisosFarger";
import {DigisosIkonProps} from "./Ella";

export const Brevkonvolutt = ({size, bakgrundsFarge, visBakgrundsSirkel}: DigisosIkonProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={"brevkonvolutt--" + bakgrundsFarge}
        aria-hidden="true"
        pointerEvents="none"
    >
        <title>Brevkonvolutt</title>
        <g>
            <rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1" />
        </g>
        <g>
            {visBakgrundsSirkel && (
                <path
                    stroke="null"
                    className="bakgrunnsSirkel"
                    d="m98.16797,51.04702q0,-9.53263 -3.69523,-18.23518q-3.53457,-8.408 -10.0414,-14.88804q-6.48005,-6.48005 -14.88804,-10.0414q-8.70254,-3.69523 -18.23518,-3.69523q-9.53263,0 -18.23518,3.69523q-8.408,3.56135 -14.91482,10.0414q-6.48005,6.48005 -10.0414,14.88804q-3.66846,8.70254 -3.66846,18.23518q0,9.53263 3.66846,18.23518q3.56135,8.408 10.0414,14.91482q6.50683,6.48005 14.91482,10.0414q8.70254,3.66846 18.23518,3.66846q9.53263,0 18.23518,-3.66846q8.408,-3.56135 14.88804,-10.0414q6.50683,-6.50683 10.0414,-14.91482q3.69523,-8.70254 3.69523,-18.23518z"
                />
            )}
            <path
                id="brevkonvolutt_2"
                d="m28.43327,48.04188c-0.692,-0.693 -3.967,-3.072 -3.274,-3.765l-1.111,-3.514l26.227,-22.471a1.774,1.774 0 0 1 2.509,0l26.225,22.47l-5.94,12.858c0.69,0.692 -21.72,12.164 -22.412,12.858l-22.224,-18.436z"
                fill="#0C576F"
            />
            <path
                id="brevkonvolutt_3"
                d="m73.64527,64.71888l-44.23,0a0.552,0.552 0 0 1 -0.551,-0.55l0,-29.828a0.55,0.55 0 0 1 0.55,-0.551l44.23,0a0.55,0.55 0 0 1 0.55,0.55l0,29.829c0,0.3 -0.246,0.55 -0.55,0.55"
                fill="#DCDCD2"
            />
            <path
                id="brevkonvolutt_4"
                d="m37.67127,47.50488l27.716,0l0,-2.181l-27.716,0l0,2.181zm0,4.934l27.716,0l0,-2.181l-27.716,0l0,2.181zm0,4.936l27.716,0l0,-2.182l-27.716,0l0,2.182zm0,4.934l27.716,0l0,-2.18l-27.716,0l0,2.18z"
                fill="#8F9395"
            />
            <path
                id="brevkonvolutt_5"
                d="m26.12227,77.39288l44.744,0c1.147,0 -46.818,-36.63 -46.818,-36.63l0,34.555c0,1.145 0.93,2.075 2.075,2.075"
                fill="#D94C56"
            />
            <path
                id="brevkonvolutt_6"
                d="m76.93627,77.39288l-44.743,0c-1.146,0 46.818,-36.63 46.818,-36.63l0,34.555a2.076,2.076 0 0 1 -2.075,2.075"
                fill="#C52C35"
            />
        </g>
    </svg>
);

export default Brevkonvolutt;
