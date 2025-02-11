export {};
// 1. 기본적인 OmitThisParameter 사용
function greet(this: string, greeting: string) {
    return `${greeting}, ${this}!`;
}

type GreetFunctionType = OmitThisParameter<typeof greet>;
// 'this' 매개변수가 제거된 함수 타입
// type GreetFunctionType = (greeting: string) => string

// 올바른 사용
const boundGreet: GreetFunctionType = greet.bind("World");
console.log(boundGreet("Hello")); // "Hello, World!"

// 2. 클래스 메서드에서 this 제거
class Counter {
    constructor(public count: number = 0) {}

    increment(this: Counter, step: number = 1) {
        this.count += step;
        return this.count;
    }

    decrement(this: Counter, step: number = 1) {
        this.count -= step;
        return this.count;
    }
}

type IncrementWithoutThis = OmitThisParameter<Counter['increment']>;
// type IncrementWithoutThis = (step?: number) => number

// 메서드 바인딩
const counter = new Counter(10);
const boundIncrement: IncrementWithoutThis = counter.increment.bind(counter);
console.log(boundIncrement(5)); // 15

// 3. 복잡한 객체 메서드와 함께 사용
interface Calculator {
    value: number;
    add(this: Calculator, x: number): number;
    subtract(this: Calculator, x: number): number;
    multiply(this: Calculator, x: number): number;
}

const calculator: Calculator = {
    value: 0,
    add(this: Calculator, x: number) {
        this.value += x;
        return this.value;
    },
    subtract(this: Calculator, x: number) {
        this.value -= x;
        return this.value;
    },
    multiply(this: Calculator, x: number) {
        this.value *= x;
        return this.value;
    }
};

type CalcMethodsWithoutThis = {
    [K in keyof Calculator]: Calculator[K] extends (this: any, ...args: any[]) => any
        ? OmitThisParameter<Calculator[K]>
        : Calculator[K];
};

// 4. 실제 활용 예제: 이벤트 핸들러
class DOMHandler {
    constructor(private element: HTMLElement) {}

    onClick(this: DOMHandler, event: MouseEvent) {
        console.log('Clicked at:', event.clientX, event.clientY);
    }

    onHover(this: DOMHandler, event: MouseEvent) {
        console.log('Hovered at:', event.clientX, event.clientY);
    }
}

type EventHandler = OmitThisParameter<DOMHandler['onClick']>;
// type EventHandler = (event: MouseEvent) => void

// 이벤트 리스너로 사용
const handler = new DOMHandler(document.body);
const boundClickHandler: EventHandler = handler.onClick.bind(handler);

// 5. 체이닝 메서드 변환
class QueryBuilder {
    private query: string = '';

    select(this: QueryBuilder, fields: string[]) {
        this.query += `SELECT ${fields.join(', ')} `;
        return this;
    }

    from(this: QueryBuilder, table: string) {
        this.query += `FROM ${table} `;
        return this;
    }

    where(this: QueryBuilder, condition: string) {
        this.query += `WHERE ${condition} `;
        return this;
    }
}

type QueryMethod = OmitThisParameter<QueryBuilder['select']>;
// 원래 체이닝이 가능했던 메서드가 this 없이 단독 함수로 변환됨
