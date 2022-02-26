import React, { FC } from "react";
import { UsePowerModalStylesValues } from "./styles";

export interface ModalBodyProps {
	stylesValues: UsePowerModalStylesValues;
}

export const ModalBody: FC<ModalBodyProps> = (props) => {
	const { children, stylesValues } = props;
	const { modalBodyStyles } = stylesValues;

	return <div css={modalBodyStyles}>{children}</div>;
};
