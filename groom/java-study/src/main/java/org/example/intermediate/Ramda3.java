package org.example.intermediate;

import java.util.Random;
import java.util.function.BinaryOperator;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class Ramda3 {
    public static void main(String[] args) {

        // Consumer
        Consumer<String> consumer = (str) -> {
            System.out.println("str" + str);
        };
        consumer.accept("hee");

        // Supplier
        Supplier<Integer> supplier = () -> {
            return new Random().nextInt(10); // 0 ~ 9
        };
        System.out.println(supplier.get());

        Function<String, Integer> func = (str) -> {
            return Integer.parseInt(str);
        };
        func.apply("12345");

        BinaryOperator<Integer> bin = (x, y) -> {
            return x + y;
        };
        bin.apply(30, 50);

        // 리턴값은 무조건 boolean이니까 매개변수만 받는다.
        Predicate<Integer> isOdd = (num) -> {
            return num % 2 != 0;
        };
        isOdd.test(11);

    }
}

// 매개변수 O, 리턴값 X : Consumer
// 매개변수 X, 리턴값 O : Supplier
// 매개변수 O, 리턴값 O : Function, Operator, Predicate
// 예) Function<매개변수 타입, 리턴 타입>
