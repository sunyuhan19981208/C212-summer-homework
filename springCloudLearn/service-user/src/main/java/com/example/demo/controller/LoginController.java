package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import com.example.demo.util.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    private UserService userService;
//    @Autowired
//    private RedisTemplate redisTemplate;

    @RequestMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, HttpServletResponse response){
        User user=userService.selectByUsername(username);
        if(user==null){
            return "无此用户";
        }
        else if(!password.equals(user.getPassword())){
            return "密码错误";
        }
        else {
//            String sessionId= MD5Util.getMD5(user.getUsername());
//            redisTemplate.opsForValue().set(sessionId,user.getUserId());
//            response.addCookie(new Cookie("sessionId",sessionId));
            return user.getLevel();
        }
    }
}
