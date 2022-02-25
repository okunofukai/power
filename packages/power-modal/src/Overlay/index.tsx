import { CSSObject } from "@emotion/react";
import React, { FC, useEffect } from "react";
import PropTypes from "prop-types";

export interface OverlayOptions {
	opacity?: number | null;
	pointerEvents?: boolean | null;
}

export interface OverlayProps {
	overlay?: boolean | OverlayOptions;
	overlayStyles: CSSObject;
	setOverlayStyles: (newValue: CSSObject) => void;
}

export const Overlay: FC<OverlayProps> = (props) => {
	const { overlay, overlayStyles, setOverlayStyles } = props;

	const showOverlay = !!overlay;
	if (!showOverlay) return null;

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
