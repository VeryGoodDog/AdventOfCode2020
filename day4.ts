/// <reference path="./types.d.ts"/>
const PASSPORTS = Deno.args[0].split('\n\n');
// we split on TWO because thats how they are delimited


// use magic to make them into arrays of keys
const passes = PASSPORTS.map(e => {
  // if i dont cast to any, TS complains about --downlevelIterators
  const keyInPass = [...(e.matchAll(/(...):/g) as any)] as string[][];
  return keyInPass.map(m => m[1]);
});
console.log('Part 1:');
{
  const required = ['byr', 'ecl', 'eyr', 'hcl', 'hgt', 'iyr', 'pid'];
  const optional = ['cid'];
  // now because this would be trivial otherwise im going to make it
  // print the missing field so it can be filled or whatever.
  let validCount = 0;
  passes.forEach((currentPass, i) => {
    console.log();
    console.log('Validating passport:');
    console.log(PASSPORTS[i]);

    let valid = true;
    required.forEach(id => {
      const hasKey = currentPass.includes(id);
      if (!hasKey)
        console.log('%cPassport is missing the "%s" field!', 'color:red', id);
      valid &&= hasKey;
    });
    optional.forEach(id => {
      if (!currentPass.includes(id))
        console.log('%cPassport is missing the (optional) "%s" field.', 'color:yellow', id);
    });
    if (valid) {
      console.log('Passport is valid!');
      validCount++;
    } else
      console.log('Passport is %cNOT%c valid!', 'color:red', 'color:inherit');
  });
  console.log('Found %d valid passports.', validCount);
}
const passesp2 = PASSPORTS.map(e => {
  // if i dont cast to any, TS complains about --downlevelIterators
  const keyInPass = [...(e.matchAll(/(...):(\S+)/g) as any)] as string[][];
  return new Map(keyInPass.map(m => [m[1], m[2]]));
});
console.log('Part 2:');
{
  const required = new Map<string, (v: string) => boolean>([
    ['byr', (value: string) => {
			const v = Number.parseInt(value);
      return 1920 <= v && v <= 2002;
    }
    ],
    ['ecl', (value: string) =>
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
    ],
    ['eyr', (value: string) => {
			const v = Number.parseInt(value);
      return 2020 <= v && v <= 2030;
    }
    ],
    ['hcl', (value: string) =>
      value.search(/#[\da-f]{6}/) != -1
    ],
    ['hgt', (value: string) => {
      if (value.endsWith('cm')) {
        const front = Number.parseInt(value.substring(0, 3));
        return 150 <= front && front <= 193;
      } else if (value.endsWith('in')) {
        const front = Number.parseInt(value.substring(0, 2));
        return 59 <= front && front <= 76;
      }
			return false;
    }],
    ['iyr', (value: string) => {
			const v = Number.parseInt(value);
      return 2010 <= v && v <= 2020;
    }
    ],
    ['pid', (value: string) =>
      value.search(/^\d{9}$/) != -1
    ]
  ]);
  const optional = ['cid'];
  let validCount = 0;
  passesp2.forEach((currentPass, i) => {
    console.log();
    console.log('Validating passport:');
    console.log(PASSPORTS[i]);

    let valid = true;
    required.forEach((validator, requiredId) => {
      if (!currentPass.has(requiredId)) {
        console.log('%cPassport is missing the "%s" field!', 'color:red', requiredId);
        valid = false;
				return;
      }
			const value = currentPass.get(requiredId)!;
			if (!validator(value)) {
        console.log('%cPassport field "%s" has the invalid value "%s"!', 'color:red', requiredId, value);
        valid = false;
      }
    });
    optional.forEach(requiredId => {
      if (!currentPass.has(requiredId))
        console.log('%cPassport is missing the (optional) "%s" field.', 'color:yellow', requiredId);
    });
    if (valid) {
      console.log('Passport is valid!');
      validCount++;
    } else
      console.log('Passport is %cNOT%c valid!', 'color:red', 'color:inherit');
  });
  console.log('Found %d valid passports.', validCount);
}