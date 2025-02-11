export {};

// 1. 기본적인 Promise 언래핑 테스트
type SimplePromise = Promise<string>;
type UnwrappedSimple = Awaited<SimplePromise>; // string

const testString: UnwrappedSimple = "hello"; // OK
const testNumber: UnwrappedSimple = 42; // Error: Type 'number' is not assignable to type 'string'.

// 2. 중첩된 Promise 테스트
type NestedPromise = Promise<Promise<number>>;
type UnwrappedNested = Awaited<NestedPromise>; // number

const testValidNested: UnwrappedNested = 123; // OK
const testInvalidNested: UnwrappedNested = "123"; // Error: Type 'string' is not assignable to type 'number'.

// 3. 실제 async/await 사용 사례
interface User {
    id: number;
    name: string;
}

async function fetchUser(): Promise<Promise<User>> {
    // 실제로는 API 호출 등이 있을 것입니다
    return Promise.resolve(Promise.resolve({
        id: 1,
        name: "John"
    }));
}

// 반환 타입 추출
type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>; // User

// 타입 검증
const validUser: FetchUserReturn = {
    id: 1,
    name: "John"
}; // OK

const invalidUser: FetchUserReturn = {
    id: "1", // Error: Type 'string' is not assignable to type 'number'.
    name: "John"
};

// 4. 유니온 타입 테스트
type MixedPromise = Promise<string> | Promise<number>;
type UnwrappedMixed = Awaited<MixedPromise>; // string | number

const testValidMixed1: UnwrappedMixed = "hello"; // OK
const testValidMixed2: UnwrappedMixed = 42; // OK
const testInvalidMixed: UnwrappedMixed = true; // Error: Type 'boolean' is not assignable to type 'string | number'.
