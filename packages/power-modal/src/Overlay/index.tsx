import { CSSObject } from "@emotion/react";
import React, { FC, useEffect } from "react";
import PropTypes from "prop-types";

export interface OverlayOptions {
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
		const { pointerEvents } = overlayOptions;
		setOverlayStyles({ pointerEvents: pointerEvents ? "auto" : "none" });
	}, [overlayOptions]);

	return <div css={overlayStyles} />;
};
Overlay.propTypes = {
	overlay: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({
			pointerEvents: PropTypes.bool,
		}),
	]),
};
