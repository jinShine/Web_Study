package com.example.firstproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FirstController {

  @GetMapping("/api/hello")
  public String hello() {
    return "hello world";
  }

}