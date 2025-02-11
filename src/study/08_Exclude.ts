export {};

// 1. 기본적인 문자열 리터럴 유니온 타입에서의 Exclude 사용
type AllColors = "red" | "green" | "blue" | "yellow" | "black" | "white";
type PrimaryColors = "red" | "green" | "blue";

// PrimaryColors를 제외한 나머지 색상들
type NonPrimaryColors = Exclude<AllColors, PrimaryColors>;
// type NonPrimaryColors = "yellow" | "black" | "white"

// 타입 검증
const primaryColor: PrimaryColors = "red"; // OK
const nonPrimaryColor: NonPrimaryColors = "yellow"; // OK
const invalidColor: NonPrimaryColors = "red"; // Error: Type '"red"' is not assignable to type 'NonPrimaryColors'

// 2. 함수 타입 제외 예제
type AllTypes = string | number | Function | boolean | object;
type ExcludeFunctions = Exclude<AllTypes, Function>;

// 올바른 사용
const str: ExcludeFunctions = "hello"; // OK
const num: ExcludeFunctions = 42; // OK
const bool: ExcludeFunctions = true; // OK
const obj: ExcludeFunctions = {}; // OK

// 잘못된 사용
const func: ExcludeFunctions = () => {}; // Error: Type '() => void' is not assignable to type 'string | number | boolean | object'

// 3. 실제 활용 예제: HTTP 메서드 필터링
type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
type UnsafeHttpMethods = "POST" | "PUT" | "DELETE" | "PATCH";
type SafeHttpMethods = Exclude<HttpMethods, UnsafeHttpMethods>;
// type SafeHttpMethods = "GET" | "HEAD" | "OPTIONS"

function handleSafeRequest(method: SafeHttpMethods) {
    console.log(`Handling safe ${method} request`);
}

// 올바른 사용
handleSafeRequest("GET"); // OK
handleSafeRequest("HEAD"); // OK

// 잘못된 사용
handleSafeRequest("POST"); // Error: Argument of type '"POST"' is not assignable to parameter of type 'SafeHttpMethods'

// 4. 타입 시스템에서의 고급 사용
type EventType =
    | { type: "USER_LOGGED_IN"; userId: string }
    | { type: "USER_LOGGED_OUT"; userId: string }
    | { type: "ERROR"; error: Error }
    | { type: "LOADING"; isLoading: boolean };

// 에러와 로딩 상태를 제외한 사용자 관련 이벤트만 추출
type UserEvents = Exclude<EventType, { type: "ERROR" } | { type: "LOADING" }>;

function handleUserEvent(event: UserEvents) {
    switch (event.type) {
        case "USER_LOGGED_IN":
            console.log(`User ${event.userId} logged in`);
            break;
        case "USER_LOGGED_OUT":
            console.log(`User ${event.userId} logged out`);
            break;
    }
}

// 올바른 사용
handleUserEvent({ type: "USER_LOGGED_IN", userId: "123" }); // OK

// 잘못된 사용
handleUserEvent({ type: "ERROR", error: new Error() }); // Error: Argument of type '{ type: "ERROR"; error: Error; }' is not assignable to parameter of type 'UserEvents'
