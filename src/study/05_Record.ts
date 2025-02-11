export {};

// 1. 기본적인 Record 사용
type UserRoles = "admin" | "user" | "guest";
type RoleDescription = {
    permissions: string[];
    accessLevel: number;
};

// UserRoles의 각 값을 키로 하고 RoleDescription을 값으로 하는 타입 생성
type RoleConfig = Record<UserRoles, RoleDescription>;

// 올바른 사용
const roleConfig: RoleConfig = {
    admin: {
        permissions: ["read", "write", "delete"],
        accessLevel: 5
    },
    user: {
        permissions: ["read", "write"],
        accessLevel: 3
    },
    guest: {
        permissions: ["read"],
        accessLevel: 1
    }
}; // OK

// 잘못된 사용
const invalidRoleConfig: RoleConfig = {
    admin: {
        permissions: ["all"],
        accessLevel: 5
    }
    // Error: Property 'user' is missing
    // Error: Property 'guest' is missing
};

// 2. 동적 키를 가진 객체 매핑
type ApiEndpoints = Record<string, {
    method: "GET" | "POST" | "PUT" | "DELETE";
    authenticated: boolean;
}>;

const api: ApiEndpoints = {
    "/users": {
        method: "GET",
        authenticated: false
    },
    "/admin/settings": {
        method: "POST",
        authenticated: true
    },
    "/profile": {
        method: "PUT",
        authenticated: true
    }
}; // OK

// 잘못된 메서드 지정
const invalidApi: ApiEndpoints = {
    "/users": {
        method: "PATCH", // Error: Type '"PATCH"' is not assignable to type '"GET" | "POST" | "PUT" | "DELETE"'
        authenticated: false
    }
};

// 3. 실제 사용 사례: 캐시 시스템
interface CacheItem<T> {
    data: T;
    timestamp: number;
    expiresIn: number;
}

type Cache<T> = Record<string, CacheItem<T>>;

// 사용자 데이터를 위한 캐시
interface User {
    id: number;
    name: string;
    email: string;
}

const userCache: Cache<User> = {
    "user:123": {
        data: {
            id: 123,
            name: "John Doe",
            email: "john@example.com"
        },
        timestamp: Date.now(),
        expiresIn: 3600
    },
    "user:456": {
        data: {
            id: 456,
            name: "Jane Doe",
            email: "jane@example.com"
        },
        timestamp: Date.now(),
        expiresIn: 3600
    }
}; // OK

// 잘못된 데이터 구조
const invalidUserCache: Cache<User> = {
    "user:123": {
        data: {
            id: "123", // Error: Type 'string' is not assignable to type 'number'
            name: "John Doe",
            email: "john@example.com"
        },
        timestamp: "now", // Error: Type 'string' is not assignable to type 'number'
        expiresIn: 3600
    }
};
