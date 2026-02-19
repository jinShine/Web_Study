
package com.example.firstproject.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.firstproject.dto.ArticleForm;
import com.example.firstproject.entity.Article;
import com.example.firstproject.service.ArticleService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ArticleApiController {
    private final ArticleService articleService;

    ArticleApiController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/api/articles")
    public List<Article> index() {
        return articleService.index();
    }

    @GetMapping("/api/articles/{id}")
    public Article show(@PathVariable(name = "id") Long id) {
        return articleService.show(id);
    }

    @PostMapping("/api/articles")
    public ResponseEntity<Article> create(@RequestBody ArticleForm dto) {
        Article created = articleService.create(dto);
        return created != null ? ResponseEntity.status(HttpStatus.OK).body(created)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PatchMapping("/api/articles/{id}")
    public ResponseEntity<Article> udpate(@PathVariable Long id, @RequestBody ArticleForm dto) {
        Article updated = articleService.update(id, dto);
        return updated != null ? ResponseEntity.status(HttpStatus.OK).body(updated)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/api/articles/{id}")
    public ResponseEntity<Article> delete(@PathVariable Long id) {
        Article deleted = articleService.delete(id);
        return deleted != null ? ResponseEntity.status(HttpStatus.OK).body(deleted)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/api/transaction-test")
    public ResponseEntity<List<Article>> transactionTest(@RequestBody List<ArticleForm> dtos) {
        List<Article> createdList = articleService.createArticles(dtos);
        return createdList != null ? ResponseEntity.status(HttpStatus.OK).body(createdList)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // private final ArticleRepository articleRepository;

    // ArticleApiController(ArticleRepository articleRepository) {
    // this.articleRepository = articleRepository;
    // }

    // // GET
    // @GetMapping("/api/articles")
    // public List<Article> index() {
    // return articleRepository.findAll();
    // }

    // @GetMapping("/api/articles/{id}")
    // public Article show(@PathVariable(name = "id") Long id) {
    // return articleRepository.findById(id).orElse(null);
    // }

    // // POST
    // @PostMapping("/api/articles")
    // public Article create(@RequestBody ArticleForm dto) {
    // Article article = dto.toEntity();
    // return articleRepository.save(article);
    // }

    // // PATCH
    // @PatchMapping("/api/articles/{id}")
    // public ResponseEntity<Article> update(@PathVariable(name = "id") Long id,
    // @RequestBody ArticleForm dto) {
    // Article article = dto.toEntity();

    // Article target = articleRepository.findById(id).orElse(null);
    // if (target == null || id != article.getId()) {
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    // }

    // target.patch(article);
    // Article updated = articleRepository.save(article);
    // return ResponseEntity.status(HttpStatus.OK).body(updated);

    // }

    // // DELETE
    // @DeleteMapping("/api/articles/{id}")
    // public ResponseEntity<Article> delete(@PathVariable(name = "id") Long id) {
    // Article target = articleRepository.findById(id).orElse(null);

    // if (target == null) {
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    // }

    // articleRepository.delete(target);
    // // return ResponseEntity.status(HttpStatus.OK).body(null);
    // return ResponseEntity.status(HttpStatus.OK).build(); // body(null) 대신 build()
    // 사용해도 된다.
    // }
}
