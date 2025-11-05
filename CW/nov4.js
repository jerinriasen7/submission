try {
    let values = [];
    for (var x = 0; x < 4; x++) values.push(() => x);
    console.log("Using var:", values.map(fn => fn()));

    let values1 = [];
    for (let x = 0; x < 4; x++) values1.push(() => x);
    console.log("Using let:", values1.map(fn => fn()));
} catch (err) {
    console.error("Error in var/let block:", err);
}

try {
    console.log("\n--- const, Object.freeze ---");
    const person = { age: 25 };
    person.age = 30;
    Object.freeze(person);
    person.age = 40;
    function freezeObject(obj) {
        Object.freeze(obj);
        obj.age = 50;
    }
    const input = { age: 25 };
    freezeObject(input);
    console.log("After freeze:", input.age);
} catch (err) {
    console.error("Error in freeze block:", err);
}

try {
    console.log("\n--- Shorthand Object Property ---");
    let x = 3, y = 5;
    let point = { x, y };
    console.log(point);
} catch (err) {
    console.error("Error in shorthand block:", err);
}

try {
    console.log("\n--- Symbols ---");
    let s1 = Symbol("test");
    let s2 = Symbol("test");
    console.log("Symbols equal?", s1 === s2);
    const employee = {
        name: "John",
        salary: 600,
        [Symbol.toPrimitive](hint) {
            if (hint == "string") return "Employee details as string";
            if (hint == "number") return this.salary;
            return JSON.stringify(this);
        }
    };
    console.log(employee);
    console.log("String conversion:", String(employee));
} catch (err) {
    console.error("Error in symbol block:", err);
}

try {
    console.log("\n--- Classes & Inheritance ---");
    class Person {
        constructor(name, role, group) {
            this.name = name;
            this.role = role;
            this.group = group;
        }
        toString() {
            return `${this.name} works as ${this.role} in ${this.group}`;
        }
    }
    class Teacher extends Person {
        constructor(name, subject) {
            super(name, subject, "School");
        }
    }
    class Student extends Person {
        constructor(name, grade) {
            super(name, grade, "School");
        }
    }
    console.log(new Teacher("Ravi", "Maths").toString());
    console.log(new Student("Meena", "10th Grade").toString());
} catch (err) {
    console.error("Error in class block:", err);
}

try {
    console.log("\n--- ITERATORS WITH var AND hasOwnProperty ---");
    var letters = ['a', 'b', 'c'];
    for (var i in letters) {
        if (letters.hasOwnProperty(i)) {
            process.stdout.write(i + " ");
        }
    }
    console.log("\n");
} catch (err) {
    console.error("Error in for...in loop:", err);
}

try {
    console.log("\n--- ITERATORS WITH of ---");
    var letters = ['a', 'b', 'c'];
    for (var i of letters) {
        process.stdout.write(i + " ");
    }
    console.log("\n");
} catch (err) {
    console.error("Error in for...of loop:", err);
}

try {
    console.log("\n--- ITERATORS .values()---");
    let iterator = [1, 2, 3].values();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
} catch (err) {
    console.error("Error in iterator code:", err);
}

function generateNumbers(n = 20) {
    try {
        if (typeof n !== "number") {
            throw new Error("Invalid input: Only numbers are allowed.");
        }
        const sequence = {
            [Symbol.iterator]() {
                let i = 0;
                return {
                    next() {
                        return {
                            done: i > n,
                            value: i++
                        };
                    }
                };
            }
        };
        process.stdout.write("Numbers: ");
        for (let num of sequence) {
            process.stdout.write(num + " ");
        }
        console.log();
    } catch (err) {
        console.error("Error in generateNumbers:", err.message);
    }
}

generateNumbers(5);
generateNumbers("a");
console.log();

const ratings = [5, 4, 5];
let sum = 0;
const asyncAdd = async (a, b) => a + b;
try {
    ratings.forEach(async (rating) => {
        sum = await asyncAdd(sum, rating);
    });
    console.log("Async sum is:", sum);
} catch (err) {
    console.log("Error in async block:", err.message);
}

const scores = [5, 4, 5];
let total = 0;
const add = (a, b) => a + b;
try {
    scores.forEach((score) => {
        total = add(total, score);
    });
    console.log("Sync sum is:", total);
} catch (err) {
    console.log("Error in sync block:", err.message);
}

//log array elements
 
// log array elements with try-catch

const logArrayElements = (element, index, array) => {
    console.log("\n---LOGS ARRAY ELEMENTS---");
    try {
        console.log(`Element: ${element}, Index: ${index}, Array: ${array}`);
    } catch (err) {
        console.error("Error while logging array element:", err.message);
    }
};

const arrlog = [10, 20, 30];

try {
    arrlog.forEach(logArrayElements);
} catch (err) {
    console.error("Error in forEach execution:", err.message);
}

// ArrayFrom() with try-catch
try {
    console.log("\n---ARRAYFROM() METHOD IS USED---");
    const arrfrom = [1, 2, 3, 4];

    // duplicate the array
    const duplicate = Array.from(arrfrom);
    console.log("Original Array:", arrfrom);
    console.log("Duplicate Array:", duplicate);

} catch (err) {
    console.error("Error:", err.message);
}

//USAGE OF KEYS
try {
    // keys() example
    console.log("\n---KEYS METHOD OF JAVASCRIPT---");
    const keysIterator = ['a','b','c'].keys();
    
    process.stdout.write("Keys: ");
    for (let key of keysIterator) {
        process.stdout.write(key+" ");
    }
 
} catch (err) {
    console.error("Error in keys() section:", err.message);
}
console.log()

//USAGE OF MAPS

try {
    console.log("\n---MAPS IN JAVASCRIPT---");
    // Create a Map from characters by doubling each character as value
    let m = new Map(
        [...'abcd'].map(x => [x, x + x])
    );

    // Convert the Map to different JSON strings
    console.log("Full Map:", JSON.stringify([...m]));
    console.log("Keys:", JSON.stringify([...m.keys()]));
    console.log("Values:", JSON.stringify([...m.values()]));
    console.log("Entries:", JSON.stringify([...m.entries()]));

} catch (err) {
    console.error("Error:", err.message);
}

console.log()

//SETS IN JAVASCRIPT
try {
    console.log("\n---SETS IN JAVASCRIPT---");
    // Create a Set with initial values
    let set1 = new Set(['red', 'blue']);

    // Add a new value
    set1.add("yellow");
    console.log(set1);  // Set(3) { 'red', 'blue', 'yellow' }

    // Try adding a duplicate value
    set1.add("red");
    console.log(set1);  // Set still remains the same, no duplicates allowed

} catch (err) {
    console.error("Error in Set operation:", err.message);
}

//GENERATORS
// Generators in JavaScript are special functions that can be paused and resumed during execution.
// They allow you to generate values one at a time instead of computing them all at once.

// yield* (pronounced “yield star”) in JavaScript is used inside a generator to delegate (or pass control) to another generator or iterable.

console.log("\n---GENERATORS IN JAVASCRIPT---");

try {
    function* genFour() {
        yield 1;
        yield 2;
        yield 3;
        return 4;
    }

    let four = genFour();

    console.log(four.next()); // { value: 1, done: false }
    console.log(four.next()); // { value: 2, done: false }
    console.log(four.next()); // { value: 3, done: false }
    console.log(four.next()); // { value: 4, done: true }
    console.log(four.next()); // { value: undefined, done: true } -> no more values

} catch (err) {
    console.error("Error in generator execution:", err.message);
}

try {

    function* flatten(arr) {
        for (let x of arr) {
            if (x instanceof Array) {
                yield* flatten(x); // recursively yield values from inner arrays
            } else {
                yield x; // yield non-array values
            }
        }
    }

    let t = flatten([1, 2, [3, 4]]);
    console.log([...t]);  // Output: [1, 2, 3, 4]

} catch (err) {
    console.error("Error in flatten generator:", err.message);
}

console.log("\n---GENERATORS with yield* ---");

try {

    function* flatten(arr) {
        for (let x of arr) {
            if (x instanceof Array) {
                yield* flatten(x); // recursively yield values from inner arrays
            } else {
                yield x; // yield non-array values
            }
        }
    }

    let t = flatten([1, 2, [3, 4]]);
    console.log([...t]);  // Output: [1, 2, 3, 4]

} catch (err) {
    console.error("Error in flatten generator:", err.message);
}

console.log()

console.log("\n---DESTRUCTURING ---");

try {
    // Object destructuring example
    let ades = { xdes: 1, ydes: 2 };

    // Destructure and rename
    let { xdes: xdes, ydes: zdes } = ades;
    console.log("\n");
    console.log("Destructuring")
    console.log("x = " + xdes);  // x = 1
    console.log("z = " + zdes);  // z = 2

    // Another object
    let a1des = { x4des: 1, y4des: 2 };

    // Destructure only y from object `ades`
    let { ydes } = ades;

    console.log("y = " + ydes);  // y = 2
    console.log()
    // DESTRUCTURING PARAMETERS
    console.log("destructuring parameters")

    // Recursive reverse function
    const reverse = ([x, ...y]) =>
        (y.length > 0) ? [...reverse(y), x] : [x];

    // Testing the function
    console.log(reverse([1, 2, 3, 4, 5, 6])); // [6,5,4,3,2,1]
    console.log(reverse([1]));               // [1]
    console.log(reverse(["a", "b", "c"]));   // ["c","b","a"]

} catch (err) {
    console.error("Error in destructuring or reverse function:", err.message);
}