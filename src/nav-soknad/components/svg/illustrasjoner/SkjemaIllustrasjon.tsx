import * as React from "react";

const SkjemaIllustrasjon = () => (
    <svg aria-hidden="true" width={100} height={100} className="kun_desktop" pointerEvents="none">
        <title>Skjema</title>
        <defs>
            <path
                id="skjema_desktop_a"
                d="M0 9.991v46.977C0 58.642 1.309 60 2.924 60h39.153C43.691 60 45 58.642 45 56.968V3.032C45 1.358 43.691 0 42.077 0h-31.9L0 9.991z"
            />
        </defs>
        <g fill="#f0f0f0" fillRule="evenodd">
            <circle cx={50} cy={50} r={50} fill="#CDE7D8" />
            <use fill="#FFF" transform="translate(29 20)" xlinkHref="#skjema_desktop_a" />
            <path fill="#C9C9C9" d="M38.27 20v6.963c0 1.677-1.322 3.036-2.952 3.036H28L38.27 20z" />
            <path
                fill="#A59D96"
                d="M44.207 44.552h19.38v-2.217h-19.38zm0 5.015h19.38V47.35h-19.38zm0 5.014h19.38v-2.215h-19.38zm0 5.017h19.38V57.38h-19.38zm-2.171-18.123h-3.97v3.937h3.971v-3.937zm-3.13 3.077h2.29v-2.217h-2.29v2.217zm3.13 1.938h-3.97v3.937h3.971V46.49zm-3.13 3.077h2.29V47.35h-2.29v2.217zm3.13 1.939h-3.97v3.934h3.971v-3.934zm-3.13 3.075h2.29v-2.215h-2.29v2.215zm3.13 1.941h-3.97v3.936h3.971v-3.936zm-3.13 3.076h2.29v-2.216h-2.29v2.216z"
            />
            <path
                stroke="#2F3237"
                strokeWidth={2}
                d="M38.097 41.228l2.142 2.507 3.013-3.984m-5.155 6.616l2.142 2.507 3.013-3.983"
            />
        </g>
    </svg>
);

export default SkjemaIllustrasjon;
