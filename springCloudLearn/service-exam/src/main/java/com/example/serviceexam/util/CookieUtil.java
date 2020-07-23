package com.example.serviceexam.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class CookieUtil {
    public static String getSessionIdByCookie(HttpServletRequest request){
        Cookie[] cookies =  request.getCookies();
        if(cookies != null){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("sessionId")){
                    return cookie.getValue();
                }
            }
        }
        return  null;
    }
}
