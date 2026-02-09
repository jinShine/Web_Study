package org.example.intermediate;

// 꺽쇠 안에 나타난 ?

class Service {

    // HeavyItem을 상속받은 모든 클래스 라고 생각하면 된다.
    public static void deliver(Store<? extends HeavyItem> store) {
    }

    // LightItem의 부모 클래스 모두 라고 생각하면 된다.
    public static void pack(Store<? super LightItem> store) {
    }
}

public class Generic2 {
    public static void main(String[] args) {
        Service.deliver(new Store<TV>());
        Service.pack(new Store<Item>());
    }
}

class Item {
}

class LightItem extends Item {
}

class HeavyItem extends Item {
}

class TV extends HeavyItem {
}

class Store<T> {
}