export default function css(strings: TemplateStringsArray, ...replacements: string[]) {
	return strings
		.flatMap((str, i, arr) => {
			if (i + 1 >= arr.length) return str;
			const rep = replacements[i];
			return [str, escapeCSS(rep)];
		})
		.join('');
}

function escapeCSS(input: string) {
	if (!input) throw new Error('A value is required');
	// If in the browser, the escape function is already provided
	if (typeof globalThis?.CSS?.escape === 'function') return CSS.escape(input);

	// Escape polyfill for Node or other environments
	const string = String(input);
	const firstCodeUnit = input.charCodeAt(0);

	return input
		.split('')
		.map((char, index) => {
			const codeUnit = char.charCodeAt(0);

			// If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
			// (U+FFFD).
			if (codeUnit == 0x0000) return '\uFFFD';

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
				codeUnit == 0x007f ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002d)
			) {
				// https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
				return `\\${codeUnit.toString(16)} `;
			}

			if (
				// If the character is the first character and is a `-` (U+002D), and
				// there is no second character, […]
				index == 0 &&
				input.length == 1 &&
				codeUnit == 0x002d
			) {
				return `\\${char}`;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), […]
			if (
				codeUnit >= 0x0080 ||
				codeUnit == 0x002d ||
				codeUnit == 0x005f ||
				(codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				(codeUnit >= 0x0041 && codeUnit <= 0x005a) ||
				(codeUnit >= 0x0061 && codeUnit <= 0x007a)
			) {
				// the character itself
				return char;
			}

			// Otherwise, the escaped character.
			// https://drafts.csswg.org/cssom/#escape-a-character
			return `\\${char}`;
		})
		.join();
}
