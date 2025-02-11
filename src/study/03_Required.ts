export {};

// 1. 기본적인 선택적 프로퍼티를 가진 인터페이스
interface UserProfile {
    name?: string;
    age?: number;
    email?: string;
    preferences?: {
        newsletter?: boolean;
        notifications?: boolean;
    };
}

// 2. Required로 모든 프로퍼티를 필수로 변환
type RequiredUserProfile = Required<UserProfile>;

// 올바른 사용 (모든 프로퍼티 포함)
const validProfile: RequiredUserProfile = {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    preferences: {
        newsletter: false,
        notifications: true
    }
}; // OK

// 잘못된 사용 (프로퍼티 누락)
const invalidProfile: RequiredUserProfile = {
    name: "John Doe",
    age: 30,
    // Error: Property 'email' is missing
    preferences: {
        newsletter: false
        // Error: Property 'notifications' is missing
    }
};

// 3. 실제 사용 사례: 설정 유효성 검사
function validateSettings(settings: Required<UserProfile>): boolean {
    return (
        typeof settings.name === 'string' &&
        typeof settings.age === 'number' &&
        typeof settings.email === 'string' &&
        typeof settings.preferences.newsletter === 'boolean' &&
        typeof settings.preferences.notifications === 'boolean'
    );
}

// 테스트
const completeSettings = {
    name: "Jane Doe",
    age: 25,
    email: "jane@example.com",
    preferences: {
        newsletter: true,
        notifications: false
    }
};

const isValid = validateSettings(completeSettings); // OK

// 불완전한 설정으로 시도
const incompleteSettings = {
    name: "Jane Doe",
    age: 25
};

// Error: Argument type is missing properties
const isInvalid = validateSettings(incompleteSettings);
