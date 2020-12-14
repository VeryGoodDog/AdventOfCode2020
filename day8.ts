/// <reference path="./types.d.ts"/>
const INS = Deno.args[0].split('\n');

console.log('Part 1:');
{
	const pIns = Array.from(INS);
	let i = 0;
	let acc = 0;
	while (pIns[i] != '') {
		const code = pIns[i];
		pIns[i] = '';
		switch (code.charAt(0)) {
			case 'a':
				acc += parseInt(code.substring(3));
			case 'n':
				i++;
				break;
			case 'j':
				i += parseInt(code.substring(3));
		}
	}
	console.log(acc);
}