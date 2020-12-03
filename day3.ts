/// <reference path="./types.d.ts"/>
const ROWS = Array.from(Deno.args[0].split('\n'));
const WIDTH = ROWS[0].length;
console.log('Part 1:');

// i go by rows and then increment the position by 3 each time
let horiz = 0;
let trees = 0;
ROWS.forEach(row => {
	if (row[horiz % WIDTH] == '#') trees++;
	horiz += 3;
});
console.log(trees);

console.log('Part 2:');
const SLOPES = [1, 3, 5, 7, 1 / 2];
const TREES = [0, 0, 0, 0, 0];
SLOPES.forEach((slope, i) => {
	horiz = 0;
	ROWS.forEach(row => {
		if (Number.isInteger(horiz) && row[horiz % WIDTH] == '#')
			TREES[i]++;
		horiz += slope;
	});
});
console.log(TREES.reduce((prev, cur) => prev * cur));