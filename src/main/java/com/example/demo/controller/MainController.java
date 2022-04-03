package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @RequestMapping("/")
    public String greet(@RequestParam(required = false) String name){
        if(name==null){
            return "Welcome! :), Try name Parameter";
        }
        return "Welcome "+name+"!";
    }
}
