import { CSSObject } from "@emotion/react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

export interface usePowerModalStylesProps {}

export const usePowerModalStyles = () => {
	const [modalWrapperStyles, _setModalWrapperStyles] = useState<CSSObject>({
		top: "0",
		left: "0",
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
		backgroundColor: "rgba(0,0,0,0.25)",
	});

	const [modalContainerStyles, _setModalContainerStyles] =
		useState<CSSObject>({
			maxWidth: "35rem",
			margin: "auto",
			height: "100%",
			display: "flex",
			align: "items",
		});

	const [modalContentStyles, _setModalContentStyles] = useState<CSSObject>(
		{}
	);

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
	};
};
