import { CSSObject } from "@emotion/react";
import React, { FC, useEffect } from "react";
import PropTypes from "prop-types";

export interface ModalContentOptions {
	dynamicWidth?: boolean | null;
}

export interface ModalContentProps {
	contentOptions?: ModalContentOptions;
	modalContentStyles: CSSObject;
	setModalContentStyles: (newValue: CSSObject) => void;
}

export const ModalContent: FC<ModalContentProps> = (props) => {
	const {
		contentOptions,
		modalContentStyles,
		setModalContentStyles,
		children,
	} = props;

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
