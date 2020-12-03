/// <reference path="./types.d.ts"/>
const NUMBERS = Int16Array.from(Deno.args[0].split('\n').map(e => parseInt(e, 10)));
let nums = Int16Array.from(NUMBERS.values()).sort((a, b) => b - a);
console.log('Part 1:');
let pro = 0;
for (let i = 0; i < 200; i++) {
	let comp = 2020 - nums[i];
	let loc = nums.indexOf(comp);
	if (loc != -1) {
		pro = nums[i] * nums[loc];
		break;
	}
}
console.log(pro);

console.log('Part 1 2:');
// hehe, one liner
console.log(NUMBERS.filter((e, _, a) => a.indexOf(Math.abs(2020 - e)) != -1).reduce((e, f) => e * f));

console.log('Part 2:');
let l = nums[nums.length-1];
out:
for (let i = 0; i < 200; i++) {
	let up = 2020 - nums[i] - l;
	if (up < l) continue;
	
	// a little binary search to see where a val is
	// cant use indexof because i need an approximate value
	let b = 0;
	let e = nums.length;
	let p = Math.floor((e - b) / 2 + b);
	while (e - b > 1) {
		if (nums[p] == up) break;
		if (nums[p] > up) b = p;
		else e = p;
		p = Math.floor((e - b) / 2 + b);
	}
	
	for (let j = p; j < 199; j++) {
		let low = 2020 - nums[i] - nums[j];
		if (low < l) continue;
		let o = nums.indexOf(low);
		if (o != -1) {
			pro = nums[i] * nums[j] * nums[o];
			break out;
		}
	}
}
console.log(pro);

console.log('Part 2 2:');
console.log(NUMBERS.filter((e, _, a) => a.find(m => a.indexOf(2020 - m - e) != -1) !== undefined).reduce((e, f) => e * f));