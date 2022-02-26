import { CSSObject } from "@emotion/react";
import React, { FC } from "react";

export interface ModalBodyProps {
	modalBodyStyles: CSSObject;
	setModalBodyStyles: (newValue: CSSObject) => void;
}

export const ModalBody: FC<ModalBodyProps> = (props) => {
	const { modalBodyStyles, children } = props;

	return <div css={modalBodyStyles}>{children}</div>;
};
