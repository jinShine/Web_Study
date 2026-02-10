package com.example.firstproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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

    @GetMapping("/articles/{id}/edit")
    public String edit(@PathVariable(name = "id") Long id, Model model) {
        // 1. 데이터 조회
        Article articleEntity = articleRepository.findById(id).orElse(null);

        // 2. 모델에 데이터 등록
        model.addAttribute("article", articleEntity);

        // 3. 뷰 페이지 설정
        return "articles/edit";
    }

    @PostMapping("/articles/update")
    public String update(ArticleForm form) {
        log.info(form.toString());
        Article articleEntity = form.toEntity();

        Article target = articleRepository.findById(form.getId()).orElse(null);
        if (target != null) {
            articleRepository.save(articleEntity);
        }

        return "redirect:/articles";
    }

    @GetMapping("/articles/{id}/delete")
    public String delete(@PathVariable(name = "id") Long id, RedirectAttributes rttr) {

        Article target = articleRepository.findById(id).orElse(null);
        log.info("삭제할 게시글의 id : " + target);

        if (target != null) {
            articleRepository.delete(target);
            rttr.addFlashAttribute("msg", "삭제됐습니다!");
        }

        // 3. 뷰 페이지 설정
        return "redirect:/articles";
    }

}
