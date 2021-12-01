/** @format */
const colorsContainer = document.querySelector('.colors-container');
const colors = colorsContainer.querySelectorAll('.color');
const colorsCodes = colorsContainer.querySelectorAll('p');

/* ------------------- CONVERT RGB COLOR CODE TO HEX CODE ------------------- */
const convertRgbToHex = (color) => {
	const hexColorLetter = Math.floor(color / 16);
	const hexColorNumber = color % 16;
	const hexGenerator = (num) => {
		let letter = '';
		switch (num) {
			case 10:
				return (letter = 'a');
				break;
			case 11:
				return (letter = 'b');
				break;
			case 12:
				return (letter = 'c');
				break;
			case 13:
				return (letter = 'd');
				break;
			case 14:
				return (letter = 'e');
				break;
			case 15:
				return (letter = 'f');
				break;
			default:
				return num;
		}
	};

	const hex = `${hexGenerator(hexColorLetter)}${hexGenerator(hexColorNumber)}`;
	return hex;
};

/* -------------------------- COLOR CODE GENERATOR -------------------------- */
const colorGenerator = () => {
	const randomDigit = (num) => {
		return Math.floor(Math.random() * (num + 1));
	};

	const red = randomDigit(255);
	const green = randomDigit(255);
	const blue = randomDigit(255);
	const rgbColor = `rgb(${red},${green},${blue})`;
	const hexColor = `#${convertRgbToHex(red)}${convertRgbToHex(
		green,
	)}${convertRgbToHex(blue)}`;

	const colorCods = {
		rgb: rgbColor,
		hex: hexColor,
	};
	return colorCods;
};

/* ------------------------ RENDER COLOR CODE IN DOM ------------------------ */
const showColorCode = (element, rgb, hex) => {
	element.querySelector('p.rgb').textContent = rgb;
	element.querySelector('p.hex').textContent = hex;
};

/* -------------------- FILL ELEMENTS BY GENERATED COLORS ------------------- */
const loadColors = () => {
	colors.forEach((el) => {
		const color = colorGenerator();
		const { rgb, hex } = color;
		el.style.backgroundColor = rgb;
		showColorCode(el, rgb, hex);
	});
};
loadColors();

/* ----------------------- COPY COLOR CODE BY CLICKING ---------------------- */
const colorCodeCopy = (element) => {
	const code = element.textContent;
	navigator.clipboard
		.writeText(code)
		.then(() => {
			const copyMassage = document.createElement('p');
			copyMassage.textContent = `${code} IS COPIED!`;
			copyMassage.className = 'massage';
			colorsContainer.append(copyMassage);
			setTimeout(() => {
				copyMassage.remove();
				console.log(copyMassage);
			}, 1000);
		})
		.catch((err) => {
			console.log(err);
		});
};

/* ---------- CHANGE ELEMENTS COLORS BY PRESS SPACE KEY OF KEYBOARD --------- */
window.addEventListener('keydown', (event) => {
	if (event.code === 'Space') {
		loadColors();
	}
});

colorsCodes.forEach((colorCode) => {
	// colorCode.removeEventListener('click', colorCodeCopy.bind(null, colorCode));
	colorCode.addEventListener('click', colorCodeCopy.bind(null, colorCode));
});
