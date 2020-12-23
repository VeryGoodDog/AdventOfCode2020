/// <reference path="./types.d.ts"/>
const JOLTS = new Uint8Array(Deno.args[0].split('\n') as any).sort();
const MAX_DIFF = 3;
console.log('Part 1:');
{
	const diffs = new Array<number>(MAX_DIFF).fill(0);
	diffs[JOLTS[0] - 1]++;
	diffs[2]++;
	for (var i = 0; i < JOLTS.length - 1; i++) {
		diffs[JOLTS[i + 1] - JOLTS[i] - 1]++;
	}
	console.log(diffs[0] * diffs[2]);
	console.log(JOLTS, diffs);
}

console.log('Part 2:');
{
	// number of branches that go to 1, 2, 3, 4... different values.
	// 1 can go to 2, 3, 4. but perhaps there is no 5 so 2 can only
	// go to 3, 4. so theres 1 3 branch and 1 2 branch.
	const branches = new Array<number>(MAX_DIFF).fill(0);
	let prev = 0;
	const deltas = JOLTS.map(j => {
		let r = j - prev;
		prev = j;
		return r;
	});
	console.log(deltas);
	// this isnt very efficient but i need something that works
	let w = 1;
	for (var i = 0; i < deltas.length - MAX_DIFF; i++) {
		let total = 0;
		let j = 0;
		while (total < MAX_DIFF) {
			total += deltas[i + ++j];
		}
		w *= j;
		branches[j - 1]++;
		console.log(JOLTS[i], w, j);
	}
	console.log(branches);
	console.log(branches.map((v, i) => v ** i).reduce((p, v) => p * v));
}