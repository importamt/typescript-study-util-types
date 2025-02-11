export {};

interface TodoItem {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

// 1. 기본적인 Partial 테스트
type PartialTodo = Partial<TodoItem>;

// 모든 필드가 선택적이므로 OK
const validPartialTodo: PartialTodo = {
    title: "Learn TypeScript",
    completed: false
};

// 2. 실제 업데이트 함수 테스트
function updateTodo(todo: TodoItem, fieldsToUpdate: Partial<TodoItem>): TodoItem {
    return { ...todo, ...fieldsToUpdate };
}

const todo: TodoItem = {
    id: 1,
    title: "Learn TypeScript",
    description: "Study utility types",
    completed: false,
    createdAt: new Date()
};

// 일부 필드만 업데이트 (OK)
const updatedTodo = updateTodo(todo, {
    completed: true,
    description: "Study utility types in depth"
});
