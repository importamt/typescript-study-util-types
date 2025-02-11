export {};

// 1. 기본적인 인터페이스 정의
interface MyUser {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// 2. 민감한 정보를 제외한 공개 프로필
type PublicUser = Omit<MyUser, 'password' | 'email'>;

// 올바른 사용
const publicProfile: PublicUser = {
    id: 1,
    username: "john_doe",
    createdAt: new Date(),
    updatedAt: new Date()
}; // OK

// 잘못된 사용
const invalidProfile: PublicUser = {
    id: 1,
    username: "john_doe",
    email: "john@example.com", // Error: Object literal may only specify known properties
    createdAt: new Date(),
    updatedAt: new Date()
};

// 3. 중첩된 타입과 함께 사용
interface BlogPost {
    id: number;
    title: string;
    content: string;
    metadata: {
        author: {
            id: number;
            name: string;
            email: string;
        };
        publishedAt: Date;
        tags: string[];
    };
    stats: {
        views: number;
        likes: number;
        comments: number;
    };
}

// 블로그 포스트 생성 시 필요없는 필드 제외
type CreateBlogPost = Omit<BlogPost, 'id' | 'metadata' | 'stats'>;

// 올바른 사용
const newPost: CreateBlogPost = {
    title: "Understanding TypeScript",
    content: "TypeScript is a powerful language..."
}; // OK

// 4. 실제 활용 예제: API 응답 처리
interface APIResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
    requestId: string;
    debug?: any;
}

// 클라이언트에게 필요한 정보만 전달
type ClientResponse<T> = Omit<APIResponse<T>, 'debug' | 'requestId'>;

const processResponse = <T>(response: APIResponse<T>): ClientResponse<T> => {
    const { debug, requestId, ...clientResponse } = response;
    return clientResponse;
};

// 테스트
const apiResponse: APIResponse<string> = {
    data: "Success",
    status: 200,
    message: "OK",
    timestamp: new Date(),
    requestId: "123",
    debug: { someDebugInfo: true }
};

const clientResponse = processResponse(apiResponse);

// 5. 여러 단계의 Omit 조합 사용
interface ProductBase {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    sku: string;
    stock: number;
    isActive: boolean;
}

// 관리자용 제품 타입 (민감한 재고 정보 포함)
interface AdminProduct extends ProductBase {
    costPrice: number;
    supplier: string;
    margin: number;
    lastStockUpdate: Date;
}

// 일반 사용자용 제품 타입 (가격과 재고만 표시)
type CustomerProduct = Omit<AdminProduct, 'costPrice' | 'supplier' | 'margin' | 'lastStockUpdate'>;

// 제품 미리보기용 타입 (최소한의 정보만 표시)
type ProductPreview = Omit<CustomerProduct, 'description' | 'sku' | 'stock' | 'isActive'>;

// 사용 예제
const adminProduct: AdminProduct = {
    id: 1,
    name: "Premium Headphones",
    price: 299.99,
    description: "High-quality wireless headphones",
    category: "Electronics",
    sku: "HDPH-001",
    stock: 150,
    isActive: true,
    costPrice: 180.00,
    supplier: "AudioTech Inc",
    margin: 40,
    lastStockUpdate: new Date()
}; // OK

const customerProduct: CustomerProduct = {
    id: 1,
    name: "Premium Headphones",
    price: 299.99,
    description: "High-quality wireless headphones",
    category: "Electronics",
    sku: "HDPH-001",
    stock: 150,
    isActive: true
}; // OK

const productPreview: ProductPreview = {
    id: 1,
    name: "Premium Headphones",
    price: 299.99,
    category: "Electronics"
}; // OK

// 6. 조건부 타입과 Omit 결합
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Form {
    title: string;
    description: string;
    submittedAt: Date;
    updatedAt: Date;
}

// submittedAt과 updatedAt을 선택적으로 만듦
type DraftForm = MakeOptional<Form, 'submittedAt' | 'updatedAt'>;

// 올바른 사용
const validDraftForm: DraftForm = {
    title: "My Form",
    description: "This is a draft"
}; // OK

const completeDraftForm: DraftForm = {
    title: "My Form",
    description: "This is a draft",
    submittedAt: new Date(),
    updatedAt: new Date()
}; // OK

// 잘못된 타입의 값 할당
const invalidDraftForm: DraftForm = {
    title: 123, // Error: Type 'number' is not assignable to type 'string'
    description: "This is a draft"
};
