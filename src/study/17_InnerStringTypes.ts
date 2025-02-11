export {};
// 1. Uppercase<StringType>
type Greeting = "Hello, world";
type ShoutingGreeting = Uppercase<Greeting>;
// type ShoutingGreeting = "HELLO, WORLD"

type Status = "active" | "inactive" | "pending";
type UpperStatus = Uppercase<Status>;
// type UpperStatus = "ACTIVE" | "INACTIVE" | "PENDING"

// 사용 예제
const status: UpperStatus = "ACTIVE"; // OK
const invalidStatus: UpperStatus = "active"; // Error

// 2. Lowercase<StringType>
type QuietGreeting = Lowercase<Greeting>;
// type QuietGreeting = "hello, world"

type LowerStatus = Lowercase<Status>;
// type LowerStatus = "active" | "inactive" | "pending"

// HTTP 메서드 예제
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type LowercaseHttpMethod = Lowercase<HttpMethod>;
// type LowercaseHttpMethod = "get" | "post" | "put" | "delete"

// 3. Capitalize<StringType>
type Names = "john" | "jane" | "joe";
type CapitalizedNames = Capitalize<Names>;
// type CapitalizedNames = "John" | "Jane" | "Joe"

// 실제 활용 예제
interface User {
    firstName: string;
    lastName: string;
}

type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type UserGetters = Getters<User>;
// type UserGetters = {
//     getFirstName: () => string;
//     getLastName: () => string;
// }

// 4. Uncapitalize<StringType>
type Commands = "Save" | "Load" | "Delete";
type LowercaseCommands = Uncapitalize<Commands>;
// type LowercaseCommands = "save" | "load" | "delete"

// 실제 활용 예제: 이벤트 핸들러 네이밍
type EventNames = "Click" | "MouseOver" | "Submit";
type EventHandlerNames = `on${EventNames}`;
type EventHandlerProps = `handle${EventNames}`;
type EventListenerNames = Uncapitalize<`add${EventNames}Listener`>;

// 5. 고급 사용 예제: 문자열 유틸리티 타입 조합
// CamelCase to SCREAMING_SNAKE_CASE 변환
type CamelToScreamingSnake<T extends string> = Uppercase<CamelToSnakeCase<T>>;

type CamelToSnakeCase<T extends string> = T extends `${infer First}${infer Rest}`
    ? First extends Lowercase<First>
        ? `${First}${CamelToSnakeRest<Rest>}`
        : `_${Lowercase<First>}${CamelToSnakeRest<Rest>}`
    : T;

type CamelToSnakeRest<T extends string> = T extends `${infer First}${infer Rest}`
    ? First extends Lowercase<First>
        ? `${First}${CamelToSnakeRest<Rest>}`
        : `_${Lowercase<First>}${CamelToSnakeRest<Rest>}`
    : T;

// 테스트
type VariableName = "myVariableName";
type ConstantName = CamelToScreamingSnake<VariableName>;
// type ConstantName = "MY_VARIABLE_NAME"

// 6. 실전 활용 예제: API 응답 키 변환
interface ApiResponse {
    userId: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
}

type SnakeCaseKeys<T> = {
    [K in keyof T as Lowercase<CamelToSnakeCase<string & K>>]: T[K]
};

type ApiResponseSnakeCase = SnakeCaseKeys<ApiResponse>;
// type ApiResponseSnakeCase = {
//     user_id: number;
//     first_name: string;
//     last_name: string;
//     email_address: string;
// }

// 7. CSS 속성 타입 변환 예제
type CSSProperty = "backgroundColor" | "fontSize" | "borderRadius";

type CSSVarName = `--${Lowercase<CamelToSnakeCase<CSSProperty>>}`;
// type CSSVarName = "--background-color" | "--font-size" | "--border-radius"

const cssVars: Record<CSSVarName, string> = {
    "--background_color": "#ffffff",
    "--font_size": "16px",
    "--border_radius": "4px"
};
