export {};
// 1. 기본적인 Parameters 사용
function greet(name: string, age: number, isAdmin: boolean = false) {
    return `Hello ${name}, you are ${age} years old. ${isAdmin ? '(Admin)' : ''}`;
}

type GreetParameters = Parameters<typeof greet>;
// type GreetParameters = [name: string, age: number, isAdmin?: boolean]

// 올바른 사용
const params: GreetParameters = ["John", 30, true]; // OK
const partialParams: GreetParameters = ["John", 30]; // OK (isAdmin은 옵션)

// 잘못된 사용
const invalidParams: GreetParameters = ["John"]; // Error: 필수 매개변수 'age' 누락
const wrongTypeParams: GreetParameters = [42, "30"]; // Error: 타입 불일치

// 2. 클래스 메서드와 함께 사용
class UserService {
    createUser(name: string, email: string, role: "admin" | "user") {
        // 구현...
    }

    updateUser(id: number, data: Partial<{ name: string; email: string }>) {
        // 구현...
    }
}

type CreateUserParams = Parameters<UserService["createUser"]>;
type UpdateUserParams = Parameters<UserService["updateUser"]>;

// 올바른 사용
const createParams: CreateUserParams = ["John", "john@example.com", "user"]; // OK
const updateParams: UpdateUserParams = [1, { name: "John Updated" }]; // OK

// 잘못된 사용
const invalidCreateParams: CreateUserParams = ["John", "john@example.com", "guest"]; // Error: "guest" 타입 불일치
const invalidUpdateParams: UpdateUserParams = [1, { role: "admin" }]; // Error: 'role' 속성이 타입에 없음

// 3. 제네릭 함수와 함께 사용
function fetchData<T>(url: string, method: "GET" | "POST", body?: T) {
    // 구현...
}

type FetchDataParams = Parameters<typeof fetchData>;
// 제네릭 함수의 매개변수 타입을 구체적으로 지정
type SpecificFetchParams = Parameters<typeof fetchData<{ id: number }>>;

// 올바른 사용
const getFetchParams: FetchDataParams = ["/api/users", "GET"]; // OK
const postFetchParams: SpecificFetchParams = ["/api/users", "POST", { id: 1 }]; // OK

// 4. 고급 사용 예제: 함수 래퍼 생성
function logFunctionCall<T extends (...args: any[]) => any>(
    fn: T,
    ...params: Parameters<T>
) {
    console.log(`Calling function with params:`, params);
    return fn(...params);
}

function sum(a: number, b: number): number {
    return a + b;
}

// 올바른 사용
logFunctionCall(sum, 1, 2); // OK
// 잘못된 사용
logFunctionCall(sum, "1", "2"); // Error: 문자열은 number 타입에 할당할 수 없음

// 5. 이벤트 핸들러와 함께 사용
type MouseEventHandler = (event: MouseEvent) => void;
type TouchEventHandler = (event: TouchEvent) => void;

type MouseEventParams = Parameters<MouseEventHandler>; // [event: MouseEvent]
type TouchEventParams = Parameters<TouchEventHandler>; // [event: TouchEvent]

function handleMouseEvent(...args: MouseEventParams) {
    const [event] = args;
    console.log(`Mouse position: ${event.clientX}, ${event.clientY}`);
}
