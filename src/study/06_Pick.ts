export {};

// 1. 기본적인 인터페이스 정의
interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    status: 'draft' | 'published' | 'archived';
}

// 2. 기본적인 Pick 사용
type ArticlePreview = Pick<Article, 'title' | 'author' | 'tags'>;

// 올바른 사용
const preview: ArticlePreview = {
    title: "Understanding TypeScript Utility Types",
    author: "John Doe",
    tags: ["typescript", "programming"]
}; // OK

// 잘못된 사용
const invalidPreview: ArticlePreview = {
    title: "Understanding TypeScript",
    author: "John Doe",
    content: "..." // Error: Object literal may only specify known properties
};

// 3. 폼 데이터 처리 예제
type ArticleCreateForm = Pick<Article, 'title' | 'content' | 'tags'>;

function createArticle(formData: ArticleCreateForm) {
    // 실제 구현...
}

// 올바른 폼 데이터
createArticle({
    title: "New Article",
    content: "Content here",
    tags: ["new", "article"]
}); // OK

// 잘못된 폼 데이터
createArticle({
    title: "New Article",
    content: "Content here",
    tags: ["new", "article"],
    id: 1 // Error: Argument type includes 'id' which is not in type 'ArticleCreateForm'
});

// 4. 중첩된 타입과 함께 사용
interface ComplexUser {
    id: number;
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    settings: {
        theme: 'light' | 'dark';
        notifications: boolean;
        language: string;
    };
    metadata: {
        lastLogin: Date;
        registeredAt: Date;
    };
}

// 프로필 편집에 필요한 필드만 선택
type EditableProfile = Pick<ComplexUser, 'personalInfo' | 'settings'>;

const userProfile: EditableProfile = {
    personalInfo: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "123-456-7890"
    },
    settings: {
        theme: "dark",
        notifications: true,
        language: "en"
    }
}; // OK

// metadata가 포함된 경우 에러
const invalidUserProfile: EditableProfile = {
    personalInfo: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "123-456-7890"
    },
    settings: {
        theme: "dark",
        notifications: true,
        language: "en"
    },
    metadata: { // Error: Object literal may only specify known properties
        lastLogin: new Date(),
        registeredAt: new Date()
    }
};
