export function splitDateParts(inputStr) {
	// Split by commas, periods, and spaces. With extra spaces removed
	const dateParts = inputStr.split(/\s+|\s*\.\s*|\s*,\s*/g).map(val => {
		return {
			raw: val,
			lower: val.toLowerCase()
		};
	});

	const delimitIndex = dateParts.findIndex(val => val.lower === "to" || val.lower === "until" || val.lower === "-");
	const startParts = dateParts;
	let endParts = [];
	if(delimitIndex !== -1) {
		endParts = startParts.splice(delimitIndex, startParts.length - delimitIndex);
		endParts.shift();
	}

	return [startParts, endParts];
}

export function parseDatePart(parts) {
	const result = {
		year: undefined,
		month: undefined,
		day: undefined,
		hour: undefined,
		minute: undefined,
		second: undefined,
		milliseconds: undefined
	};
	const ignored = [];

	for(let partIndex = 0; partIndex < parts.length; partIndex++) {
		const part = parts[partIndex];
		const nextPart = partIndex + 1 !== parts.length ? parts[partIndex + 1] : null;
		let partStr = part.lower;
		if(partStr === "") continue;

		// Parse like a date: (1/1/1999, 1/1, 1999/1/1, 1/1999, and '-' equivalents)
		// Leading years must be in 4-digit form but trailing years can be in short form
		if(partStr.includes("-") || partStr.includes("/")) {
			const sections = partStr.split(/[\-\/]/g);
			// Reorder sections into Year, Month, Day order with heuristics

			// Take out leading or trailing years in full 4-digit form
			if(sections[0].length === 4 && !isNaN(Number(sections[0]))) {
				result.year = Number(sections.shift());
			}
			const lastSection = sections[sections.length - 1];
			if(lastSection.length === 4 && !isNaN(Number(lastSection))) {
				result.year = Number(sections.pop());
			}

			// Parse remaining mm/dd/yy forms
			if(sections.length) {
				result.month = Math.min(12, Number(sections.shift()));
			}
			if(sections.length) {
				// TODO: Add NaN guards
				result.day = Math.min(31, Number(sections.shift()));
			}
			if(sections.length) {
				result.year = Number(sections.shift());
				if(result.year < 100) {
					// Note: Assume current century
					const currentYear = new Date().getFullYear();
					result.year += currentYear - (currentYear % 100);
				}
			}
			continue;
		}

		// Parse days in the form of 1st, 2nd, 3rd, etc
		if((/^\d+(st|nd|th|rd)$/).test(partStr)) {
			const dayStr = partStr.match(/^\d+/)[0];
			if(Number(dayStr) < 31) {
				// result.day = Number(dayStr);
			}
			continue;
		}

		// Parse full years
		if(partStr.length === 4 && !isNaN(Number(partStr))) {
			result.year = Number(partStr);
			continue;
		}

		// Parse month names
		// Index-sensitive array of months
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const monthIndex = months.findIndex(month => partStr.length >= 3 && month.toLowerCase().startsWith(partStr));
		if(monthIndex !== -1) {
			result.month = monthIndex + 1;
			continue;
		}

		// Parse lone hours or days
		// If a number is alone, it is assumed to be a day unless immediately followed by AM/PM
		if(!isNaN(Number(partStr))) {
			if(nextPart && (/^[ap]m$/).test(nextPart.lower)) {
				result.hour = Number(partStr);
				result.minute = 0;
				result.second = 0;
				result.milliseconds = 0;
				continue;
			}
			result.day = Number(partStr);
			continue;
		}

		// Parse times in 8:00 format
		if(partStr.includes(":")) {
			const sections = partStr.split(":");
			const lastSection = sections[sections.length - 1];
			let pm = false;
			if(lastSection.endsWith("am") || lastSection.endsWith("pm")) {
				// Edit final section to remove am/pm
				pm = lastSection.slice(-2) === "pm";
				sections[sections.length - 1] = lastSection.substring(0, lastSection.length - 2);
			}

			// Take parts off one at a time until none are left
			// Order is expected to be hh:mm:ss:ms and can be cut short (so hh:mm is valid)
			// AM/PM will be taken into account
			if(sections.length) {
				result.hour = Math.min(23, Number(sections.shift()));
				if(pm || (nextPart && nextPart.lower === "pm")) {
					result.hour = (result.hour % 12) + 12;
				}
			}
			if(sections.length) {
				result.minute = Math.min(59, Number(sections.shift()));
			}
			if(sections.length) {
				result.second = Math.min(59, Number(sections.shift()));
			}
			if(sections.length) {
				result.milliseconds = Math.min(999, Number(sections.shift()));
			}
			continue;
		}

		// Just an hour with am/pm
		if((/^\d+[ap]m$/g).test(partStr)) {
			result.hour = Number(partStr.match(/^\d+/));
			if(partStr.endsWith("pm")) {
				result.hour = (result.hour % 12) + 12;
			}
			result.minute = 0;
			result.second = 0;
			result.milliseconds = 0;
			continue;
		}

		console.log(`Unknown part in date: ${part.raw}`);
		ignored.push(part.raw);
	}

	if(ignored.length) console.log(`Ignored the following parts: ${ignored.join(", ")}`);
	return result;
}

export function partToDate(referenceDate, partObj) {
	const result = new Date(referenceDate);
	if(partObj.year !== undefined) result.setFullYear(partObj.year);
	if(partObj.month !== undefined) result.setMonth(partObj.month - 1);  // 0-indexed
	if(partObj.day !== undefined) result.setDate(partObj.day);
	if(partObj.hour !== undefined) result.setHours(partObj.hour);
	if(partObj.minute !== undefined) result.setMinutes(partObj.minute);
	if(partObj.second !== undefined) result.setSeconds(partObj.second);

	return result;
}