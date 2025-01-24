package com.ele.crud.controller;

import com.ele.crud.model.UserModel;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.filters.AddDefaultCharsetFilter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class LoginController {


    @RequestMapping("/")
    public String goToHome() {
        return "home";
    }
    @RequestMapping("/api/v1/login")
    public String  login(@RequestBody UserModel u, HttpServletRequest request, HttpServletResponse response) {
        System.out.println(u.getName());

        return "home";
    }

}

