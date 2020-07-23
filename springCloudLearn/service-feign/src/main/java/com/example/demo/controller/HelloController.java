package com.example.demo.controller;

import com.example.demo.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @Autowired
    HelloService.SchedualServiceHi schedualServiceHi;
    @GetMapping(value="/hi")
    public String sayHi(@RequestParam String name){
        return schedualServiceHi.sayHiFromClient(name);
    }
}
