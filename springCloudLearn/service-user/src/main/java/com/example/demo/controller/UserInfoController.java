package com.example.demo.controller;

import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.util.CookieUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class UserInfoController {
    @Autowired
    private UserService userService;
    @Autowired
    private RedisTemplate redisTemplate;
    @RequestMapping("/getUsername")
    public String getUsername(HttpServletRequest request){
        String sessionId= CookieUtil.getSessionIdByCookie(request);
        System.out.println(sessionId);
        int userId=(Integer) redisTemplate.opsForValue().get(sessionId);
        System.out.println(userId);
        String username=userService.selectByUserId(userId).getUsername();
        return username;
    }
    @RequestMapping(value="/addStudent",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object> addStudent(@RequestParam("username")String username,@RequestParam("className")String className){
        if(userService.selectByUsername(username)!=null)return new HashMap<String, Object>() {
            {
                put("respCode", "2");
                put("respMsg", "该用户名已存在");
            }
        };
        int uid=userService.getNewUserId();
        userService.addUser(username,"123456","学生");
        userService.addStudent(uid,className);
        return new HashMap<String, Object>() {
            {
                put("respCode", "1");
                put("respMsg", "添加成功，学号为:"+uid);
            }
        };
    }
    @RequestMapping(value="/getAllStudent",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object> getAllStudent(){
        HashMap<String,Object>mp=new HashMap<>();
        mp.put("respCode",1);
        List<Student>list=userService.selectAllStudent();
        mp.put("data",list);
        mp.put("total",list.size());
        return mp;
    }
    @RequestMapping(value = "/queryStudentByName",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>queryStudentByName(@RequestParam("username")String username){
        List<Student>list=userService.queryUserByName(username);
        return new HashMap<String,Object>(){
            {
                put("respCode", "1");
                put("total",list.size());
                put("data",list);
            }
        };
    }
    @RequestMapping(value="/updateStudent",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>update(@RequestParam("userId")int userId,@RequestParam("username")String username,
                                        @RequestParam("password")String password,@RequestParam("className")String className){
        userService.updateStudent(userId,className);
        userService.updateUser(userId,username,password);
        return new HashMap<String, Object>() {
            {
                put("respCode", "1");
                put("respMsg", "修改成功，学号为:"+userId);
            }
        };
    }
    @RequestMapping(value = "/deleteStudent",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>deleteStudent(@RequestParam("userId")int userId){
        if(userService.selectByUserId(userId)==null)
            return new HashMap<String, Object>() {
                {
                    put("respCode", "1");
                    put("respMsg", "删除失败，无该用户");
                }
            };
        userService.deleteUser(userId);
        userService.deleteStudent(userId);
        return new HashMap<String, Object>() {
            {
                put("respCode", "1");
                put("respMsg", "删除成功，学号为:"+userId);
            }
        };
    }
    @RequestMapping(value="/changePassword",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>changePassword(@RequestParam("userId")int userId,@RequestParam("oldPassword")String oldPassword,@RequestParam("newPassword")String newPassword){
        User user=userService.selectByUserId(userId);
        if(!user.getPassword().equals(oldPassword)){
            return new HashMap<String,Object>(){
                {
                    put("respCode",0);
                    put("respMsg","旧密码不正确");
                }
            };
        }
        else{
            userService.changePassword(newPassword,userId);
            return new HashMap<String,Object>(){
                {
                    put("respCode",1);
                    put("respMsg","密码修改成功");
                }
            };
        }
    }
    @RequestMapping(value="/getStudentByClassName",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getStudentByClassName(@RequestParam("className")String className){
        List<HashMap<String,Object>>list=userService.getStudentByClassName(className);
        return new HashMap<String,Object>(){
            {
                put("data",list);
                put("respCode",1);
            }
        };
    }
    @RequestMapping(value = "/getStudentByUserId",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getStudentByUserId(@RequestParam("userId")int userId){
        List<HashMap<String,Object>>list=userService.getStudentByUserId(userId);
        return new HashMap<String,Object>(){
            {
                put("data",list);
                put("respCode",1);
            }
        };
    }
    @RequestMapping(value="/getStudentByUsername",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getStudentByUsername(@RequestParam("username")String username){
        List<HashMap<String,Object>>list=userService.getStudentByUsername(username);
        return new HashMap<String,Object>(){
            {
                put("data",list);
                put("respCode",1);
            }
        };
    }
}
