export {};

// 1. 기본 인터페이스 정의
interface Config {
    apiUrl: string;
    timeout: number;
    retryCount: number;
}

// 2. Readonly로 변환
type ReadonlyConfig = Readonly<Config>;

const config: ReadonlyConfig = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retryCount: 3
};

// 수정 시도 시 에러 발생
config.timeout = 6000; // Error: Cannot assign to 'timeout' because it is a read-only property
config.apiUrl = "https://new-api.example.com"; // Error: Cannot assign to 'apiUrl' because it is a read-only property

// 3. 중첩된 객체의 Readonly 테스트
interface DeepConfig {
    connection: {
        host: string;
        port: number;
    };
    settings: {
        mode: string;
        debug: boolean;
    };
}

type ReadonlyDeepConfig = Readonly<DeepConfig>;

const deepConfig: ReadonlyDeepConfig = {
    connection: {
        host: "localhost",
        port: 8080
    },
    settings: {
        mode: "production",
        debug: false
    }
};

// 최상위 프로퍼티는 수정 불가
deepConfig.connection = { host: "newhost", port: 9090 }; // Error: Cannot assign to 'connection' because it is a read-only property

// 하지만 중첩된 객체의 프로퍼티는 여전히 수정 가능 (주의 필요!)
deepConfig.connection.port = 9090; // 이건 타입 에러가 발생하지 않습니다!

// 4. 재귀적 Readonly 타입 생성 (완벽한 불변성을 위해)
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type FullReadonlyConfig = DeepReadonly<DeepConfig>;

const fullConfig: FullReadonlyConfig = {
    connection: {
        host: "localhost",
        port: 8080
    },
    settings: {
        mode: "production",
        debug: false
    }
};

// 이제 중첩된 프로퍼티도 수정 불가
fullConfig.connection.port = 9090; // Error: Cannot assign to 'port' because it is a read-only property
