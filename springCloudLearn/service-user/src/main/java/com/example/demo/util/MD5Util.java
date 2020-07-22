package com.example.demo.util;
import org.springframework.util.DigestUtils;

public class MD5Util {
    private static final String slat = "&%5123***&&%%$$#@";
    public static String getMD5(String str) {
        String base = str +"/"+slat;
        String md5 = DigestUtils.md5DigestAsHex(base.getBytes());
        return md5;
    }
}
