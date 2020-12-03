/// <reference path="./types.d.ts"/>
const ROWS = Array.from(Deno.args[0].split('\n'));
const entries = ROWS.map(e => e.split(': '));

console.log('Part 1:');
const valids = entries.filter(e => {
	let [ , min, max, char]: any = e[0].match(/(.+)-(.+) (.)/)!;
	let fpas = Array.from(e[1]).filter(e => e == char).length;
	return min <= fpas && fpas <= max;
}).length;
console.log(valids);

console.log('Part 2:');
const valids2 = entries.filter(e => {
	let [ , first, last, char]: any = e[0].match(/(.+)-(.+) (.)/)!;
	let pas = e[1];
	let fchar = pas.charAt(first - 1);
	let lchar = pas.charAt(last - 1);
	return fchar != lchar && (fchar === char || lchar === char);
}).length;
console.log(valids2);