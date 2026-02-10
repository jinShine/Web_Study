package org.example.intermediate;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Stream {
    public static void main(String[] args) {
        List<Book> books = new ArrayList<>();
        books.add(new Book("Java", 3000));
        books.add(new Book("Python", 4000));
        books.add(new Book("C++", 5000));

        books.stream().forEach(book -> System.out.println(book.getTitle()));

        // Java에서 sort를 할 때는 compareTo()메서드를 오버라이딩 한다고 생각하자!
        books.stream()
                .sorted()
                .forEach(book -> System.out.println(book));

        books.stream()
                .sorted()
                .toList();

        // 중복 제거는 hashCode, equals를 오버라이딩 해야한다.
        // 이 두 메소드는 최상위 클래스인 Object의 메서드입니다.
        books.stream()
                .distinct()
                .forEach(book -> System.out.println(book));

    }
}

class Book implements Comparable<Book> {
    private String title;
    private int price;

    public Book(String title, int price) {
        this.title = title;
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public int compareTo(Book o) {
        return this.title.compareTo(o.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, price);
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Book)) {
            return false;
        }

        Book book = (Book) obj;
        return Objects.equals(title, book.title) && price == book.price;
    }
}