package com.example.demo.controller;


import com.example.demo.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class HelloControler {

    @Autowired
    HelloService helloService;
    @RequestMapping(value = "/hi")
    public String hi(@RequestParam String name){
        return "ribbon:"+helloService.hiService(name);
    }
    @RequestMapping(value = "/fuck")
    public String fuck(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse){
        httpServletResponse.addCookie(new Cookie("name","caonima"));
        System.out.println(httpServletRequest.getCookies());
        return "ribbon:"+helloService.fuckService();
    }

}


