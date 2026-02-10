package com.example.firstproject.dto;

import com.example.firstproject.entity.Article;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class ArticleForm {
    private Long id;
    private String title;
    private String content;

    // public ArticleForm(String title, String content) {
    // this.title = title;
    // this.content = content;
    // }

    // @Override
    // public String toString() {
    // return "ArticleForm [title=" + title + ", content=" + content + "]";
    // }

    public Article toEntity() {
        return new Article(id, title, content);
    }
}
