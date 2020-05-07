import * as React from "react";
import EllaForfra from "../../../nav-soknad/components/svg/EllaForfra";
import {getContextPathForStaticContent} from "../../../configuration";

const BannerEttersendelse: React.StatelessComponent<{children: React.ReactNode} & {}> = ({children}) => {
    return (
        <div className="banner-ettersendelse banner-ettersendelse__ettersendelse">
            <div className="blokk-center">
                <div className="banner-ettersendelse__ettersendelse__innhold">
                    <div className="banner-ettersendelse__tittel">
                        <h1 className="typo-sidetittel">{children}</h1>
                    </div>
                    <span className="banner-ettersendelse__ettersendelse__innhold__ella_forfra">
                        <EllaForfra />
                        <img
                            src={`${getContextPathForStaticContent()}/statisk/bilder/illustrasjon_laptop.svg`}
                            alt={""}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BannerEttersendelse;
