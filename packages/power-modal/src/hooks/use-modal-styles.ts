import { CSSObject } from "@emotion/react";
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from "react";
import PropTypes from "prop-types";

export interface UseModalStylesValues {
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

export interface ModalTheme {
	modalWrapperStyles?: CSSObject;
	modalContainerStyles?: CSSObject;
	modalContentStyles?: CSSObject;
	modalBodyStyles?: CSSObject;
	overlayStyles?: CSSObject;
}

export const ModalThemePropType = PropTypes.objectOf(PropTypes.object);

export const useModalStyles = (theme?: ModalTheme) => {
	const defaultTheme = useMemo<Required<ModalTheme>>(
		() => ({
			modalWrapperStyles: {
				top: "0",
				left: "0",
				zIndex: 1000,
				width: "100vw",
				height: "100vh",
				position: "fixed",
				pointerEvents: "none",
			},
			overlayStyles: {
				top: "0",
				left: "0",
				zIndex: -1,
				width: "100%",
				height: "100%",
				position: "absolute",
				pointerEvents: "auto",
				backgroundColor: "rgba(0,0,0,0.25)",
			},
			modalContainerStyles: {
				margin: "auto",
				height: "100%",
				display: "flex",
				position: "relative",
				maxWidth: "35rem",
				alignItems: "center",
				flexDirection: "column",
				justifyContent: "center",
			},
			modalContentStyles: {
				borderRadius: "0.5rem",
				pointerEvents: "auto",
				backgroundColor: "white",
			},
			modalBodyStyles: {
				padding: "1rem",
			},
		}),
		[]
	);

	const deepMergeTheme = useCallback(
		(toTheme: ModalTheme, fromTheme: ModalTheme) => {
			const toThemeEntries = Object.entries(toTheme);
			return toThemeEntries.reduce((prev, curr) => {
				const [key, value] = curr as [keyof ModalTheme, CSSObject];
				return {
					...prev,
					[key]: {
						...value,
						...fromTheme?.[key],
					},
				};
			}, {}) as Required<ModalTheme>;
		},
		[]
	);

	const computedTheme = useMemo<Required<ModalTheme>>(
		() => deepMergeTheme(defaultTheme, (theme = {})),
		[defaultTheme, theme]
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

	// STYLE STATES
	const [modalWrapperStyles, _setModalWrapperStyles] = useState<CSSObject>(
		computedTheme.modalWrapperStyles
	);
	const [overlayStyles, _setOverlayStyles] = useState<CSSObject>(
		computedTheme.overlayStyles
	);
	const [modalContainerStyles, _setModalContainerStyles] =
		useState<CSSObject>(computedTheme.modalContainerStyles);
	const [modalContentStyles, _setModalContentStyles] = useState<CSSObject>(
		computedTheme.modalContentStyles
	);
	const [modalBodyStyles, _setModalBodyStyles] = useState<CSSObject>(
		computedTheme.modalBodyStyles
	);

	// STYLE SETTERS
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
	} as UseModalStylesValues;
};
