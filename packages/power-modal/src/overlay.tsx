import React, { FC, useEffect } from "react";
import PropTypes from "prop-types";
import { UsePowerModalStylesValues } from "./styles";

export interface OverlayOptions {
	opacity?: number | null;
	pointerEvents?: boolean | null;
}

export interface OverlayProps {
	overlay?: boolean | OverlayOptions;
	stylesValues: UsePowerModalStylesValues;
}

export const Overlay: FC<OverlayProps> = (props) => {
	const { overlay, stylesValues } = props;

	const showOverlay = !!overlay;
	if (!showOverlay) return null;

	const { overlayStyles, setOverlayStyles } = stylesValues;

	const overlayOptions =
		(typeof overlay === "object" && overlay) || undefined;

	useEffect(() => {
		if (!overlayOptions) return;
		const { pointerEvents, opacity } = overlayOptions;
		setOverlayStyles({
			pointerEvents: pointerEvents ? "auto" : "none",
			backgroundColor: `rgba(0,0,0,${opacity || 0.25})`,
		});
	}, [overlayOptions]);

	return <div css={overlayStyles} />;
};

Overlay.propTypes = {
	overlay: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({
			opacity: PropTypes.number,
			pointerEvents: PropTypes.bool,
		}),
	]),
};
