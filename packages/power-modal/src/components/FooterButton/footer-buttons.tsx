import { CSSObject } from "@emotion/react";
import React, { FC, ReactNode } from "react";
import { FooterButtonsItem } from "./footer-buttons-item";
import PropTypes from "prop-types";

type FooterButtonsType = FC<FooterButtonsProps> & {
	Item: typeof FooterButtonsItem;
};

export interface FooterButtonsProps {
	children: ReactNode;
	customStyle?: CSSObject | object;
}

export const DefaultFooterButtonsStyles: CSSObject = {
	display: "flex",
};

const FooterButtons: FooterButtonsType = (props) => {
	const { customStyle, children } = props;

	const computedStyle = customStyle || DefaultFooterButtonsStyles;

	return <div css={computedStyle as CSSObject}>{children}</div>;
};
FooterButtons.propTypes = {
	children: PropTypes.node,
	customStyle: PropTypes.object,
};

FooterButtons.Item = FooterButtonsItem;

export default FooterButtons;
