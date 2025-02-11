export {};
// 1. 기본적인 ThisParameterType 사용
function toHex(this: Number) {
    return this.toString(16);
}

type ToHexThisType = ThisParameterType<typeof toHex>;
// type ToHexThisType = Number

// 2. 메서드에서의 this 타입 추출
interface User {
    name: string;
    age: number;
    greet(this: User): string;
}

type UserThisType = ThisParameterType<User['greet']>;
// type UserThisType = User

// 3. 클래스 메서드와 함께 사용
class Calculator {
    constructor(public value: number) {}

    add(this: Calculator, x: number) {
        this.value += x;
        return this;
    }

    multiply(this: Calculator, x: number) {
        this.value *= x;
        return this;
    }
}

type CalcThisType = ThisParameterType<Calculator['add']>;
// type CalcThisType = Calculator

// 4. 실제 활용 예제: 메서드 바인딩
interface DateFormatter {
    format(this: Date): string;
}

const dateFormatter: DateFormatter = {
    format(this: Date) {
        return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
    }
};

type DateFormatterThisType = ThisParameterType<DateFormatter['format']>;
// type DateFormatterThisType = Date

// this 바인딩 헬퍼 함수
function bindThisParameter<T extends (this: ThisParameterType<T>, ...args: any[]) => any>(
    fn: T,
    thisArg: ThisParameterType<T>
): (...args: Parameters<T>) => ReturnType<T> {
    return fn.bind(thisArg);
}

// 사용 예제
const date = new Date('2025-02-12');
const formatDate = bindThisParameter(dateFormatter.format, date);
console.log(formatDate()); // "2025-2-12"

// 5. 체이닝 메서드와 함께 사용
class StringBuilder {
    constructor(private value: string = '') {}

    append(this: StringBuilder, str: string) {
        this.value += str;
        return this;
    }

    prepend(this: StringBuilder, str: string) {
        this.value = str + this.value;
        return this;
    }

    toString(this: StringBuilder) {
        return this.value;
    }
}

type StringBuilderMethodThis = ThisParameterType<StringBuilder['append']>;
// type StringBuilderMethodThis = StringBuilder

// 메서드 체이닝 사용
const builder = new StringBuilder()
    .append('Hello')
    .prepend('Oh, ')
    .append(' World!');
