package org.example.intermediate;

// 제네릭은 클래스형이면 다 가능!

/* 1. 클래스 이름 옆 꺽쇠<T> */
class Pocket<K> {
}

class Pocket2<K, V> {
}

/* 2. 메서드 리턴형 앞 꺽쇠<T> */
class Bag {
    // public void put(SmartPhone phone) {
    // System.out.println(phone + "을 넣었습니다.");
    // }

    // public void put(Earphone phone) {
    // System.out.println(phone + "을 넣었습니다.");
    // }

    public <T> void put(T item) {
        System.out.println(item + "을 넣었습니다.");
    }

    // extends를 사용하면 Item을 상속받은 클래스만 매개변수로 받을 수 있다.
    // public <T extends Item> void put(T item) {
    // System.out.println(item + "을 넣었습니다.");
    // }
}

public class Generic {
    public static void main(String[] args) {
        Pocket<String> pocket = new Pocket();

        Pocket2<String, Integer> pocket2 = new Pocket2();

        Bag bag = new Bag();
        bag.put(new SmartPhone());
        bag.put(new Earphone());
    }
}

class Item {

}

class SmartPhone extends Item {
    public String toString() {
        return "스마트폰";
    }
}

class Earphone {
    public String toString() {
        return "이어폰";
    }
}