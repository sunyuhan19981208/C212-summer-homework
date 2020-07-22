package com.example.demo;


import java.sql.*;

public class TestDb {
    public static void main(String[] args) {
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn= DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/dbem", "root", "one11111");
            Statement statement=conn.createStatement();
            ResultSet rs=statement.executeQuery("select * from salary;");
            while(rs.next()){
                System.out.println(rs.getString("income"));
            }
        }catch (ClassNotFoundException e){
            System.out.println("类加载失败");
        }catch(SQLException e){
            System.out.println("连接失败");
        }
    }
}
