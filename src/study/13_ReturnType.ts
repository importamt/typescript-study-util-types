export {};
// 1. 기본적인 ReturnType 사용
function createUser(name: string, age: number) {
    return {
        id: Date.now(),
        name,
        age,
        createdAt: new Date()
    };
}

type User = ReturnType<typeof createUser>;
// type User = {
//     id: number;
//     name: string;
//     age: number;
//     createdAt: Date;
// }

// 올바른 사용
const user: User = {
    id: 1234567890,
    name: "John",
    age: 30,
    createdAt: new Date()
}; // OK

// 잘못된 사용
const invalidUser: User = {
    id: "1234567890", // Error: string 타입을 number 타입에 할당할 수 없음
    name: "John",
    age: 30,
    createdAt: new Date()
};

// 2. 제네릭 함수와 함께 사용
function fetchData<T>(url: string): Promise<T> {
    return fetch(url).then(response => response.json());
}

type FetchReturn = ReturnType<typeof fetchData>;
// type FetchReturn = Promise<any>

// 구체적인 타입과 함께 사용
function fetchUser(id: number) {
    return fetchData<User>(`/api/users/${id}`);
}

type FetchUserReturn = ReturnType<typeof fetchUser>;
// type FetchUserReturn = Promise<User>

// 3. 조건부 반환 타입과 함께 사용
function processValue(value: number) {
    if (value > 0) {
        return value.toString();
    }
    if (value < 0) {
        return value * -1;
    }
    return null;
}

type ProcessReturnType = ReturnType<typeof processValue>;
// type ProcessReturnType = string | number | null

// 4. 고급 사용 예제: API 응답 처리
class ApiClient {
    getUser(id: number) {
        return Promise.resolve({
            id,
            name: "John",
            email: "john@example.com"
        });
    }

    getUserPosts(userId: number) {
        return Promise.resolve([
            { id: 1, title: "Post 1", content: "Content 1" },
            { id: 2, title: "Post 2", content: "Content 2" }
        ]);
    }
}

type GetUserReturn = ReturnType<ApiClient["getUser"]>;
type GetUserPostsReturn = ReturnType<ApiClient["getUserPosts"]>;

// API 응답 처리 함수
async function processUserData(
    userData: Awaited<GetUserReturn>,
    userPosts: Awaited<GetUserPostsReturn>
) {
    return {
        user: userData,
        posts: userPosts,
        summary: `${userData.name} has ${userPosts.length} posts`
    };
}

type ProcessedUserData = ReturnType<typeof processUserData>;

// 5. 함수 오버로드와 함께 사용
function overloadedFunction(value: string): string;
function overloadedFunction(value: number): number;
function overloadedFunction(value: string | number): string | number {
    return value;
}

type OverloadedReturnType = ReturnType<typeof overloadedFunction>;
// type OverloadedReturnType = string | number
