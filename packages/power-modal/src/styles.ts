import { CSSObject } from "@emotion/react";
import { Dispatch, SetStateAction, useState } from "react";

export interface usePowerModalStylesProps {}

export const usePowerModalStyles = () => {
	const [modalWrapperStyles, _setModalWrapperStyles] = useState<CSSObject>({
		pointerEvents: "none",
		position: "fixed",
		height: "100vh",
		width: "100vw",
		top: "0",
		left: "0",
	});

	const [overlayStyles, _setOverlayStyles] = useState<CSSObject>({
		position: "absolute",
		top: "0",
		left: "0",
		height: "100%",
		width: "100%",
		zIndex: -1,
		backgroundColor: "rgba(0,0,0,0.25)",
	});

	const [modalContainerStyles, _setModalContainerStyles] =
		useState<CSSObject>({
			color: "yellow",
		});

	const setStyle = (
		stateSetter: Dispatch<SetStateAction<CSSObject>>,
		newValue: CSSObject,
		override?: boolean
	) =>
		stateSetter((prevValue) =>
			override ? newValue : ({ ...prevValue, ...newValue } as CSSObject)
		);

	const setOverlayStyles = (newValue: CSSObject) =>
		setStyle(_setOverlayStyles, newValue);
	const setModalWrapperStyles = (newValue: CSSObject) =>
		setStyle(_setModalWrapperStyles, newValue);
	const setModalContainerStyles = (newValue: CSSObject) =>
		setStyle(_setModalContainerStyles, newValue);

	return {
		overlayStyles,
		setOverlayStyles,
		modalWrapperStyles,
		setModalWrapperStyles,
		modalContainerStyles,
		setModalContainerStyles,
	};
};
