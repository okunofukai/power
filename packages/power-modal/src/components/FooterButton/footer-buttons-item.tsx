import { CSSObject, Theme, Interpolation } from "@emotion/react";
import React, { FC } from "react";

export interface FooterButtonItemProps
	extends React.ClassAttributes<HTMLButtonElement>,
		React.ButtonHTMLAttributes<HTMLButtonElement> {
	customStyle?: CSSObject;
}
export const DefaultFooterButtonsItemStyles: CSSObject = {
	"flex": "1",
	"display": "flex",
	"alignItems": "center",
	"justifyContent": "center",
	"userSelect": "none",
	"cursor": "pointer",
	"padding": "0.5rem",
	"transition": "0.2s",
	"border": "none",
	"outline": "none",
	"fontSize": "inherit",
	"backgroundColor": "white",
	"&:hover": {
		transition: "0.2s",
		backgroundColor: "rgba(0,0,0,0.05)",
	},
};

export const FooterButtonsItem: FC<FooterButtonItemProps> = (props) => {
	const { customStyle, children, ...restProps } = props;

	const computedStyle = customStyle || DefaultFooterButtonsItemStyles;

	return (
		<button css={computedStyle} {...restProps}>
			{children}
		</button>
	);
};
