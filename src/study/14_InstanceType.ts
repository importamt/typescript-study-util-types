export {};
// 1. 기본적인 InstanceType 사용
class Animal {
    constructor(public name: string, public age: number) {}

    makeSound() {
        return "Some sound";
    }
}

type AnimalInstance = InstanceType<typeof Animal>;
// type AnimalInstance = Animal

// 올바른 사용
const animal: AnimalInstance = new Animal("Rex", 3); // OK

// 잘못된 사용
const invalidAnimal: AnimalInstance = {
    name: "Rex",
    age: 3
    // Error: Property 'makeSound' is missing
};

// 2. 제네릭 클래스와 함께 사용
class Container<T> {
    constructor(public data: T) {}

    getData(): T {
        return this.data;
    }
}

type StringContainer = InstanceType<typeof Container<string>>;
type NumberContainer = InstanceType<typeof Container<number>>;

// 올바른 사용
const strContainer: StringContainer = new Container("Hello"); // OK
const numContainer: NumberContainer = new Container(42); // OK

// 잘못된 사용
const invalidContainer: StringContainer = new Container(123); // Error: number 타입을 string 타입에 할당할 수 없음

// 3. Factory 패턴에서의 활용
class UserModel {
    constructor(
        public id: number,
        public name: string,
        public email: string
    ) {}

    updateEmail(newEmail: string) {
        this.email = newEmail;
    }
}

class AdminModel extends UserModel {
    constructor(id: number, name: string, email: string, public role: string) {
        super(id, name, email);
    }
}

type User = InstanceType<typeof UserModel>;
type Admin = InstanceType<typeof AdminModel>;

// Factory 클래스
class UserFactory {
    static createUser(data: Omit<User, 'updateEmail'>): User {
        return new UserModel(data.id, data.name, data.email);
    }

    static createAdmin(data: Omit<Admin, 'updateEmail' | 'role'> & { role: string }): Admin {
        return new AdminModel(data.id, data.name, data.email, data.role);
    }
}

// 4. 고급 사용 예제: 믹스인 패턴
type Constructor<T = {}> = new (...args: any[]) => T;

function TimestampMixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = new Date();
    };
}

class BaseModel {
    constructor(public id: number) {}
}

const TimestampedModel = TimestampMixin(BaseModel);
type TimestampedInstance = InstanceType<typeof TimestampedModel>;

// 올바른 사용
const timestampedModel: TimestampedInstance = new TimestampedModel(1);
console.log(timestampedModel.timestamp); // OK
console.log(timestampedModel.id); // OK
