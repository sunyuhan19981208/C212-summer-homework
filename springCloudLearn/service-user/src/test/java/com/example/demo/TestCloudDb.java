package com.example.demo;

import java.sql.*;

public class TestCloudDb {
    public static void main(String[] args) {
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn= DriverManager.getConnection("jdbc:mysql://rm-bp149958e5hvnwfazko.mysql.rds.aliyuncs.com/stest", "suser", "One11111");
            Statement statement=conn.createStatement();
            ResultSet rs=statement.executeQuery("select * from test;");
            while(rs.next()){
                System.out.println(rs.getString("username"));
            }
        }catch (ClassNotFoundException e){
            System.out.println("类加载失败");
        }catch(SQLException e){
            System.out.println("连接失败");
        }
    }
}
