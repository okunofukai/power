import React, { FC } from "react";
import { UseModalStylesValues } from "../hooks/use-modal-styles";

export interface ModalBodyProps {
	stylesValues: UseModalStylesValues;
}

export const ModalBody: FC<ModalBodyProps> = (props) => {
	const { children, stylesValues } = props;
	const { modalBodyStyles } = stylesValues;

	return <div css={modalBodyStyles}>{children}</div>;
};
