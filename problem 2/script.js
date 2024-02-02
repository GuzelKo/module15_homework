const btn = document.querySelector("button");

btn.addEventListener('click', () => {
	let height = document.documentElement.clientHeight;
	let width = document.documentElement.clientWidth;
	alert(`Your screen height is ${height}. Your screen width is ${width}.`);
});
