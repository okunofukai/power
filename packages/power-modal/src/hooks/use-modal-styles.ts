import { CSSObject } from "@emotion/react";
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from "react";
import PropTypes from "prop-types";

export type UseModalStylesValues = ModalTheme & ModalThemeSetters;
export const ModalThemePropType = PropTypes.objectOf(PropTypes.object);

export interface ModalTheme {
	modalWrapperStyles?: CSSObject;
	modalContainerStyles?: CSSObject;
	modalContentStyles?: CSSObject;
	modalBodyStyles?: CSSObject;
	modalFooterStyles?: CSSObject;
	overlayStyles?: CSSObject;
}

export interface ModalThemeSetters {
	setOverlayStyles: (newValue: CSSObject) => void;
	setModalWrapperStyles: (newValue: CSSObject) => void;
	setModalContainerStyles: (newValue: CSSObject) => void;
	setModalContentStyles: (newValue: CSSObject) => void;
	setModalBodyStyles: (newValue: CSSObject) => void;
	setModalFooterStyles: (newValue: CSSObject) => void;
}

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
				overflow: "hidden",
				pointerEvents: "auto",
				borderRadius: "0.5rem",
				backgroundColor: "white",
			},
			modalBodyStyles: {
				padding: "1rem",
			},
			modalFooterStyles: {
				borderTop: "0.05rem solid rgba(0,0,0,0.05)",
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
	const [modalFooterStyles, _setModalFooterStyles] = useState<CSSObject>(
		computedTheme.modalFooterStyles
	);
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
	const setModalFooterStyles = useCallback(
		(newValue: CSSObject) => setStyle(_setModalFooterStyles, newValue),
		[_setModalFooterStyles]
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
		modalFooterStyles,
		setModalFooterStyles,
	} as UseModalStylesValues;
};
