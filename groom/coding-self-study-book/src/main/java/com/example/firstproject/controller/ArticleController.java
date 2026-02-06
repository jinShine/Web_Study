package com.example.firstproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.firstproject.dto.ArticleForm;
import com.example.firstproject.entity.Article;
import com.example.firstproject.repository.ArticleRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ArticleController {

    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping("/articles/new")
    public String newArticleForm() {
        return "articles/new";
    }

    @PostMapping("/articles/create")
    public String createArticle(ArticleForm form) {
        // 1. DTO를 Entity로 변환
        Article article = form.toEntity();

        log.info("article : " + article);

        // 2. Repository를 사용해 Entity를 DB에 저장
        Article saved = articleRepository.save(article);

        log.info("saved : " + saved);

        return "redirect:/articles/" + saved.getId();
    }

    @GetMapping("/articles/{id}")
    public String show(@PathVariable(name = "id") Long id, Model model) {
        log.info("id = " + id);

        // 1. id로 데이터 조회하기
        // Optional<Article> article = articleRepository.findById(id);
        Article articleEntity = articleRepository.findById(id).orElse(null);

        // 2. 조회된 데이터를 모델에 등록하기
        model.addAttribute("article", articleEntity);

        // 3. 뷰 페이지 반환하기
        return "articles/show";
    }

    @GetMapping("/articles")
    public String index(Model model) {
        List<Article> articles = articleRepository.findAll();
        model.addAttribute("articleList", articles);

        return "articles/index";
    }

}
