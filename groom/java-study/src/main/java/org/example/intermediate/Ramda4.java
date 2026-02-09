package org.example.intermediate;

import java.util.function.IntConsumer;

public class Ramda4 {
    public static void main(String[] args) {
        IntConsumer intC = (i) -> {
            System.out.println(i);
        };
        IntConsumer intC2 = (i) -> System.out.println(i);
        IntConsumer intC3 = System.out::println;

    }
}
