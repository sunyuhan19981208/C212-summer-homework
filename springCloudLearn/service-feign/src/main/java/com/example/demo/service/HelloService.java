package com.example.demo.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

public class HelloService {
    @FeignClient(value = "service-user")
    public interface SchedualServiceHi{
        @RequestMapping(value="/hi",method = RequestMethod.GET)
        String sayHiFromClient(@RequestParam(value="name")String name);
    }
}
