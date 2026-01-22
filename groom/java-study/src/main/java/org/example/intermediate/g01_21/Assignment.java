package org.example.intermediate.g01_21;

public class Assignment {
  public static void main(String[] args) {
    Book book = new Book("1234567890", "테스트", "테스트", 10000);
    book.showInfo();
    book.borrow();
    book.showInfo();
    book.returnBook();
    book.showInfo();
  }
}


class Book {
  private String isbn;
  private String title;
  private String author;
  private int price;
  private boolean isBorrowed;

  public Book(String isbn, String title, String author, int price) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    setPrice(price);
    this.isBorrowed = false;
  }

  public String getIsbn() {
    return isbn;
  }

  public String getTitle() {
    return title;
  }

  public String getAuthor() {
    return author;
  }

  public int getPrice() {
    return price;
  }

  public boolean isBorrowed() {
    return isBorrowed;
  }

  public void setPrice(int price) {
    if (price < 0) {
      System.out.println("가격은 0 이상이어야 합니다.");
      return;
    }

    this.price = price;
  }

  public boolean borrow() {
    if (isBorrowed) {
      System.out.println("이미 대여중입니다.");
      return false;
    }

    isBorrowed = true;
    System.out.println("대여 완료");
    return true;
  }

  public void returnBook() {
    if (!isBorrowed) {
      System.out.println("대출 중이 아닌 도서입니다.");
      return;
    }
    isBorrowed = false;
    System.out.println("📚 " + title + " 반납 완료");
  }

  public void showInfo() {
    System.out.println("=== 도서 정보 ===");
    System.out.println("ISBN: " + isbn);
    System.out.println("제목: " + title);
    System.out.println("저자: " + author);
    System.out.println("가격: " + price + "원");
    System.out.println("상태: " + (isBorrowed ? "📕 대출중" : "📗 대출가능"));
  }
}


