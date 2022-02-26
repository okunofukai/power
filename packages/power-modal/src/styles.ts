import { CSSObject } from "@emotion/react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

export interface UsePowerModalStylesValues {
	overlayStyles: CSSObject;
	setOverlayStyles: (newValue: CSSObject) => void;
	modalWrapperStyles: CSSObject;
	setModalWrapperStyles: (newValue: CSSObject) => void;
	modalContainerStyles: CSSObject;
	setModalContainerStyles: (newValue: CSSObject) => void;
	modalContentStyles: CSSObject;
	setModalContentStyles: (newValue: CSSObject) => void;
	modalBodyStyles: CSSObject;
	setModalBodyStyles: (newValue: CSSObject) => void;
}

export const usePowerModalStyles = () => {
	const [modalWrapperStyles, _setModalWrapperStyles] = useState<CSSObject>({
		top: "0",
		left: "0",
		zIndex: 1000,
		width: "100vw",
		height: "100vh",
		position: "fixed",
		pointerEvents: "none",
	});

	const [overlayStyles, _setOverlayStyles] = useState<CSSObject>({
		top: "0",
		left: "0",
		zIndex: -1,
		width: "100%",
		height: "100%",
		position: "absolute",
		pointerEvents: "auto",
		backgroundColor: "rgba(0,0,0,0.25)",
	});

	const [modalContainerStyles, _setModalContainerStyles] =
		useState<CSSObject>({
			margin: "auto",
			height: "100%",
			display: "flex",
			position: "relative",
			maxWidth: "35rem",
			alignItems: "center",
			pointerEvents: "auto",
			flexDirection: "column",
			justifyContent: "center",
		});

	const [modalContentStyles, _setModalContentStyles] = useState<CSSObject>({
		borderRadius: "0.5rem",
		backgroundColor: "white",
	});

	const [modalBodyStyles, _setModalBodyStyles] = useState<CSSObject>({
		padding: "1rem",
	});

	const setStyle = useCallback(
		(
			stateSetter: Dispatch<SetStateAction<CSSObject>>,
			newValue: CSSObject,
			override?: boolean
		) =>
			stateSetter((prevValue) =>
				override
					? newValue
					: ({ ...prevValue, ...newValue } as CSSObject)
			),
		[]
	);

	const setModalBodyStyles = useCallback(
		(newValue: CSSObject) => setStyle(_setModalBodyStyles, newValue),
		[_setModalBodyStyles]
	);
	const setModalContentStyles = useCallback(
		(newValue: CSSObject) => setStyle(_setModalContentStyles, newValue),
		[_setModalContentStyles]
	);
	const setOverlayStyles = useCallback(
		(newValue: CSSObject) => setStyle(_setOverlayStyles, newValue),
		[_setOverlayStyles]
	);
	const setModalWrapperStyles = useCallback(
		(newValue: CSSObject) => setStyle(_setModalWrapperStyles, newValue),
		[_setModalWrapperStyles]
	);
	const setModalContainerStyles = useCallback(
		(newValue: CSSObject) => setStyle(_setModalContainerStyles, newValue),
		[_setModalContainerStyles]
	);

	return {
		overlayStyles,
		setOverlayStyles,
		modalWrapperStyles,
		setModalWrapperStyles,
		modalContainerStyles,
		setModalContainerStyles,
		modalContentStyles,
		setModalContentStyles,
		modalBodyStyles,
		setModalBodyStyles,
	} as UsePowerModalStylesValues;
};
