import React, { FC, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { UseModalStylesValues } from "../hooks/use-modal-styles";
import { UseModalValues } from "../hooks/use-modal";

export interface OverlayOptions {
	opacity?: number | null;
	triggersClose?: boolean | null;
	pointerEvents?: boolean | null;
}

export interface OverlayProps {
	overlay?: boolean | OverlayOptions;
	modalValues: UseModalValues;
	stylesValues: UseModalStylesValues;
}

export const Overlay: FC<OverlayProps> = (props) => {
	const { overlay, stylesValues, modalValues } = props;

	const showOverlay = !!overlay;
	if (!showOverlay) return null;

	const { setShowModal } = modalValues;
	const { overlayStyles, setOverlayStyles } = stylesValues;

	const overlayOptions =
		(typeof overlay === "object" && overlay) || undefined;

	useEffect(() => {
		if (!overlayOptions) return;
		const { pointerEvents = true, triggersClose, opacity } = overlayOptions;
		setOverlayStyles({
			cursor: triggersClose ? "pointer" : "default",
			pointerEvents: pointerEvents ? "auto" : "none",
			backgroundColor: `rgba(0,0,0,${opacity || 0.25})`,
		});
	}, [overlayOptions]);

	const onClick = useCallback(() => {
		if (overlayOptions?.triggersClose) setShowModal(false);
	}, []);

	return <div css={overlayStyles} onClick={onClick} />;
};

Overlay.propTypes = {
	overlay: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({
			opacity: PropTypes.number,
			pointerEvents: PropTypes.bool,
			triggersClose: PropTypes.bool,
		}),
	]),
};
