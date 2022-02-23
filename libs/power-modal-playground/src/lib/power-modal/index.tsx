import React, {FC, useEffect, useState} from "react";
import ReactDOM from "react-dom";

export interface PowerModalProps {

}

export const PowerModal: FC<PowerModalProps> = (props) => {

    const BodyPortal: FC = (props) => ReactDOM.createPortal(
        props.children,
        document.body
    );

    return (
        <BodyPortal>
            <div>
                YOOO
            </div>
        </BodyPortal>
    )
}

export default PowerModal