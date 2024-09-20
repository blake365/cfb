import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getContrastColor(hexColor: string): string {
	// console.log(hexColor)
	if (!hexColor) {
		return '#000000'
	}
	// Remove the hash if it's there
	const color = hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor

	// Convert hex to RGB
	const r = parseInt(color.substring(0, 2), 16)
	const g = parseInt(color.substring(2, 4), 16)
	const b = parseInt(color.substring(4, 6), 16)

	// Calculate luminance
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

	// Return black for light colors, white for dark colors
	return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

export function checkContrast(hexColor1: string, hexColor2: string): boolean {
	const contrastColor1 = getContrastColor(hexColor1)
	const contrastColor2 = getContrastColor(hexColor2)

	return contrastColor1 === contrastColor2
}
