package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.RequestContext;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.LinkedList;
import java.util.List;
@RestController
@CrossOrigin
public class TestController {
    @Autowired
    private UserService userService;
    @Value("${server.port}")
    String port;
    @RequestMapping("/hi")
    public String home(@RequestParam String name) {
        return "hi "+name+",i am from port:" +port;
    }
    @RequestMapping("/fuck")
    public String fuck(HttpServletRequest httpServletRequest){
        return "fuck";
    }
    @RequestMapping("")
    public String hello(){
        return "hello";
    }
    @RequestMapping("/test1")
    public String test1(@RequestParam String info){
        if (StringUtils.isEmpty(info)) {
            return "请输入info的值!";
        }
        return "你输入的内容是：" + info;
    }

    @RequestMapping("/testDiv")
    public String testDiv(){
        return "<div class=\"login-back\">\n" +
                "        <div class=\"login-image\">\n" +
                "            <h1 class=\"title1\">在线考试系统</h1>           \n" +
                "            <div class=\"login-box\">\n" +
                "                <h4 class=\"title2\">登录</h4> \n" +
                "                <div id=\"login\">\n" +
                "                    <form id=\"from\">\n" +
                "                        <label for=\"userid\"></label>\n" +
                "                        <input type=\"text\" name=\"id\" id=\"userid\" placeholder=\"请输入账号\" value=\"\" onblur=\"verify_user()\"/><br>\n" +
                "                        <label for=\"pwd\"></label>\n" +
                "                        <input type=\"password\" name=\"pwd\"  id=\"password\" placeholder=\"请输入密码\" value=\"\" onblur=\"verify_pwd()\"/><br>                       \n" +
                "                    </form>\n" +
                "                <div class=\"bu\"> \n" +
                "                    <div class=\"div-btn\">\n" +
                "                            <button id=\"btn\" type=\"submit\" form=\"form\" onclick=\"verify_btn()\">登录</button><br>  \n" +
                "                    </div>\n" +
                "                    <a href=\"register.html\">注册</a>\n" +
                "                </div> \n" +
                "                <script src=\"js/login.js\"></script>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>           \n" +
                "    </div>   ";
    }
}
