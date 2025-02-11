export {};

// 1. 기본적인 유니온 타입에서 특정 타입 추출
type MyResponse = string | number | boolean | null | undefined;

// string과 number만 추출
type StringOrNumber = Extract<MyResponse, string | number>;
// type StringOrNumber = string | number

// 타입 검증
const validString: StringOrNumber = "hello"; // OK
const validNumber: StringOrNumber = 42; // OK
const invalidBoolean: StringOrNumber = true; // Error: Type 'boolean' is not assignable to type 'string | number'
const invalidNull: StringOrNumber = null; // Error: Type 'null' is not assignable to type 'string | number'

// 2. 객체 타입과 함께 사용
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "rectangle"; width: number; height: number }
    | { kind: "triangle"; base: number; height: number };

// 원형 도형만 추출
type CircleShape = Extract<Shape, { kind: "circle" }>;
// 사각형과 삼각형 도형 추출
type PolygonShape = Extract<Shape, { kind: "rectangle" } | { kind: "triangle" }>;

// 올바른 사용
const circle: CircleShape = {
    kind: "circle",
    radius: 10
}; // OK

// 잘못된 사용
const invalidCircle: CircleShape = {
    kind: "rectangle", // Error: Type '"rectangle"' is not assignable to type '"circle"'
    width: 10,
    height: 20
};

// 3. 함수 타입 추출
type Mixed = string | number | (() => void) | (() => string) | undefined;

type FunctionTypes = Extract<Mixed, Function>;
// type FunctionTypes = (() => void) | (() => string)

const func1: FunctionTypes = () => {}; // OK
const func2: FunctionTypes = () => "hello"; // OK
const invalidString: FunctionTypes = "hello"; // Error: Type 'string' is not assignable to type 'FunctionTypes'

// 4. 실제 활용 예제: API 응답 처리
type ApiResponse<T> =
    | { status: "success"; data: T; timestamp: number }
    | { status: "error"; error: string; code: number }
    | { status: "loading" };

// 성공 응답만 추출
type SuccessResponse<T> = Extract<ApiResponse<T>, { status: "success" }>;
// 에러 응답만 추출
type ErrorResponse = Extract<ApiResponse<any>, { status: "error" }>;

function handleSuccess<T>(response: SuccessResponse<T>) {
    console.log(`Success with data:`, response.data);
    console.log(`Timestamp: ${response.timestamp}`);
}

// 올바른 사용
handleSuccess({
    status: "success",
    data: { id: 1, name: "John" },
    timestamp: Date.now()
}); // OK

// 잘못된 사용
handleSuccess({
    status: "error", // Error: Argument of type '{ status: "error"; error: string; code: number; }' is not assignable to parameter of type 'SuccessResponse<any>'
    error: "Something went wrong",
    code: 500
});

// 5. 조건부 타입과 함께 사용
type EventConfig = {
    mouse: { x: number; y: number };
    keyboard: { keyCode: number };
    touch: { touches: number[] };
};

type MyEventType = keyof EventConfig;
type MouseEventConfig = Extract<MyEventType, "mouse">;

function handleMouseEvent(config: EventConfig[MouseEventConfig]) {
    console.log(`Mouse position: ${config.x}, ${config.y}`);
}

// 올바른 사용
handleMouseEvent({ x: 100, y: 200 }); // OK

// 잘못된 사용
handleMouseEvent({ keyCode: 13 }); // Error: Argument of type '{ keyCode: number; }' is not assignable to parameter of type '{ x: number; y: number; }'
