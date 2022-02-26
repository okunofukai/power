import React, { FC, useEffect } from "react";
import PropTypes from "prop-types";
import { UsePowerModalStylesValues } from "./styles";

export interface ModalContentOptions {
	dynamicWidth?: boolean | null;
}

export interface ModalContentProps {
	contentOptions?: ModalContentOptions;
	stylesValues: UsePowerModalStylesValues;
}

export const ModalContent: FC<ModalContentProps> = (props) => {
	const { contentOptions, stylesValues, children } = props;

	const { modalContentStyles, setModalContentStyles } = stylesValues;

	useEffect(() => {
		if (!contentOptions) return;
		const { dynamicWidth = true } = contentOptions;
		setModalContentStyles({
			width: dynamicWidth ? "auto" : "100%",
		});
	}, [contentOptions]);

	return <div css={modalContentStyles}>{children}</div>;
};

ModalContent.propTypes = {
	contentOptions: PropTypes.shape({
		dynamicWidth: PropTypes.bool,
	}),
};
