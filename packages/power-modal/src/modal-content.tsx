import { CSSObject } from "@emotion/react";
import React, { FC } from "react";

export interface ModalContentProps {
	modalContentStyles: CSSObject;
	setModalContentStyles: (newValue: CSSObject) => void;
}

export const ModalContent: FC<ModalContentProps> = (props) => {
	const { modalContentStyles, children } = props;

	return <div css={modalContentStyles}>{children}</div>;
};
