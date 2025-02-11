export {};

// 1. 기본적인 NonNullable 사용
type BasicType = string | number | undefined | null;
type NonNullableBasicType = NonNullable<BasicType>;
// type NonNullableBasicType = string | number

// 타입 검증
const validString: NonNullableBasicType = "hello"; // OK
const validNumber: NonNullableBasicType = 42; // OK

const invalidUndefined: NonNullableBasicType = undefined; // Error: Type 'undefined' is not assignable to type 'string | number'
const invalidNull: NonNullableBasicType = null; // Error: Type 'null' is not assignable to type 'string | number'

// 2. 객체 프로퍼티와 함께 사용
interface UserInput {
    name: string | null;
    age: number | undefined;
    email: string | null | undefined;
}

type RequiredUserInput = {
    [K in keyof UserInput]: NonNullable<UserInput[K]>;
};

// 올바른 사용
const validUser: RequiredUserInput = {
    name: "John",
    age: 30,
    email: "john@example.com"
}; // OK

// 잘못된 사용
const invalidUser: RequiredUserInput = {
    name: null, // Error
    age: undefined, // Error
    email: "john@example.com"
};

// 3. 함수 매개변수 타입 검증
function processValue<T>(value: NonNullable<T>) {
    console.log('Processing:', value);
    return value;
}

// 올바른 사용
processValue("hello"); // OK
processValue(123); // OK
processValue({ key: "value" }); // OK

// 잘못된 사용
processValue(null); // Error
processValue(undefined); // Error

// 4. 실제 활용 예제: API 응답 처리
interface ApiResponse<T> {
    data: T | null;
    error?: Error | null;
    metadata?: {
        timestamp: number;
        source: string | null;
    } | null;
}

type CleanApiResponse<T> = {
    data: NonNullable<T>;
    error: NonNullable<Error>;
    metadata: NonNullable<{
        timestamp: number;
        source: NonNullable<string>;
    }>;
};

function cleanResponse<T>(response: ApiResponse<T>): Partial<CleanApiResponse<T>> {
    const clean: Partial<CleanApiResponse<T>> = {};

    if (response.data !== null) {
        clean.data = response.data as NonNullable<T>;
    }

    if (response.metadata && response.metadata.source) {
        clean.metadata = {
            timestamp: response.metadata.timestamp,
            source: response.metadata.source
        };
    }

    return clean;
}

// 5. 배열과 함께 사용
type PossiblyNullableArray = Array<string | null | undefined>;
type NonNullableArray = Array<NonNullable<PossiblyNullableArray[number]>>;

const validArray: NonNullableArray = ["hello", "world"]; // OK
const invalidArray: NonNullableArray = ["hello", null, "world"]; // Error
