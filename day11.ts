/// <reference path="./types.d.ts"/>
const GRID = Deno.args[0].split('\n').map(row => Array.from(row));
const [MAX_H, MAX_W] = [GRID.length, GRID[0].length];
console.log('Part 1:');
{
	const second = new Array<string[]>(MAX_H)
		.forEach((v, i, arr) => arr[i] = new Array<string>(MAX_W));

	function step() {
		GRID.forEach((row, i) => {
			row.forEach((col, j) => {
				if (col === '.') return;
				let total = 0;
				let r2 = null as string[];
				if (i > 0) r2 = GRID[i - 1];
				if (r2) {

				}
			});
		});
	}
}