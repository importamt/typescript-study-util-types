export {};
// 1. 기본적인 ConstructorParameters 사용
class User {
    constructor(
        public name: string,
        public age: number,
        private email: string
    ) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>;
// type UserConstructorParams = [name: string, age: number, email: string]

// 올바른 사용
const userParams: UserConstructorParams = ["John", 30, "john@example.com"]; // OK
const user = new User(...userParams);

// 잘못된 사용
const invalidParams: UserConstructorParams = ["John", "30", "john@example.com"]; // Error: 두 번째 인자는 number여야 함
const missingParams: UserConstructorParams = ["John", 30]; // Error: email 누락

// 2. 선택적 매개변수가 있는 생성자
class Product {
    constructor(
        public name: string,
        public price: number,
        public description?: string,
        protected stock: number = 0
    ) {}
}

type ProductConstructorParams = ConstructorParameters<typeof Product>;
// type ProductConstructorParams = [name: string, price: number, description?: string, stock?: number]

// 올바른 사용
const productParams1: ProductConstructorParams = ["Laptop", 999.99]; // OK
const productParams2: ProductConstructorParams = ["Laptop", 999.99, "Great laptop"]; // OK
const productParams3: ProductConstructorParams = ["Laptop", 999.99, "Great laptop", 10]; // OK

// 3. 제네릭 클래스와 함께 사용
class Container<T> {
    constructor(
        public data: T,
        public timestamp: Date = new Date()
    ) {}
}

type StringContainerParams = ConstructorParameters<typeof Container<string>>;
type NumberContainerParams = ConstructorParameters<typeof Container<number>>;

// 올바른 사용
const stringParams: StringContainerParams = ["Hello"]; // OK
const numberParams: NumberContainerParams = [42]; // OK

// 잘못된 사용
const invalidStringParams: StringContainerParams = [42]; // Error: number는 string에 할당할 수 없음

// 4. 실제 활용 예제: Factory 패턴
interface UserModel {
    name: string;
    age: number;
    email: string;
}

class UserModelImpl implements UserModel {
    constructor(
        public name: string,
        public age: number,
        public email: string
    ) {}
}

class UserFactory {
    static createUser(...params: ConstructorParameters<typeof UserModelImpl>): UserModel {
        return new UserModelImpl(...params);
    }

    static createManyUsers(count: number, baseParams: ConstructorParameters<typeof UserModelImpl>): UserModel[] {
        return Array.from({ length: count }, (_, index) => {
            const [name, age, email] = baseParams;
            return new UserModelImpl(
                `${name}${index + 1}`,
                age,
                `user${index + 1}${email}`
            );
        });
    }
}

// 사용 예제
const user1 = UserFactory.createUser("John", 30, "john@example.com");
const users = UserFactory.createManyUsers(3, ["User", 25, "@example.com"]);
