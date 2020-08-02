### 分布式后端spring cloud
# 服务组成
service-euraka 注册与服务中心*1 端口：8761  
service-user 用户服务*1 端口：8762  
service-exam 考试服务*1 端口：8763  
service-feign 消费者服务*1，主要用于同时调用用户服务和考试服务 端口：8765  
service-zuul 网关服务*0 --云服务器集群性能过差(1c2g+1c1g)--项目组很穷，纯属用爱发电，所以为了性能数据没有配置网关在云服务器，前端直接访问的对应服务  
# 数据库：请勿修改数据库相关配置，所访问的数据库接口均是云数据库暴露的接口，可直接使用，若需sql文件请直接在issue中提出
# 接口：绝大部分接口采用添加参数，少数接口采用RequestBody传的json，返回均为json数据，格式自测，接口失效请提issue
 登录：http://39.107.84.0:8762/login?username=sunyuhan&password=one11111  
 带着cookie查用户名：http://39.107.84.0:8762/getUsername  
 添加学生:http://39.107.84.0:8762/addStudent?username=xialekun&className=软件sy1701  
 学生默认密码123456,默认学号是当前所有用户+1  
 添加班级:http://39.107.84.0:8762/addClass?className=软件sy1701  
 查看所有班级：http://39.107.84.0:8762/getAllClass  
 查询学生：http://39.107.84.0:8762/getAllStudent  
 模糊查询学生：http://39.107.84.0:8762/queryStudentByName?username=wuzi  
 模糊查询班级：http://39.107.84.0:8762/queryClassByName?className=软件  
 更新班级：http://39.107.84.0:8762/updateClass?className=软件sy1701&status=1  
 删除班级：http://39.107.84.0:8762/deleteClass?className=软件sy1701  
 更新学生：http://39.107.84.0:8762/updateStudent?userId=2&username=ruarya&password=derder&className=软件sy1701  
 删除学生：http://39.107.84.0:8762/deleteStudent?userId=5  
 查询科目：http://39.107.84.0:8763/getSubject  
 查询知识点：http://39.107.84.0:8763/getKnowledgePoint?subjectId=1&gradeId=2  
 添加题目:http://39.107.84.0:8763/addQuestion?questionStem=rua&type=5&choiceType=0&answer=noasr&pointId=1&choice=rua,ruarua,go,  
 查询题目:http://39.107.84.0:8763/getQuestion?pointId=1&type=1  
 添加试卷：http://39.107.84.0:8763/addPaper  
 查询试卷：http://39.107.84.0:8763/getPaperList?gradeId=1&subjectId=1  
 添加考试：http://39.107.84.0:8763/createExam  
 查询考试：http://39.107.84.0:8763/getExamByClass?className=  
 添加老师：http://39.107.84.0:8762/addTeacher?username=  
 查询所有老师:http://39.107.84.0:8762/selectAllTeacher  
 删除用户:http://39.107.84.0:8762/deleteUser?userId=  
 查询老师：http://39.107.84.0:8762/queryTeacherByName?username=  
 根据题目ID查询题目：http://39.107.84.0:8763/getQuestionById?questionId=79  
 根据老师获取题目:http://39.107.84.0:8763/getExamByTeacherId?userId=1  
 根据试卷获取题目：http://39.107.84.0:8763/getQuestionList?paperId=2  
 修改密码：http://39.107.84.0:8762/changePassword?userId=&oldPassword=&newPassword=  
 拿到待阅试卷：http://39.107.84.0:8763/getSubmitByExamId?examId=  
 提交:http://39.107.84.0:8763/submit  
```

{
    "userId":4,
    "examId":7,
    "answerList":[
        {
            "questionId":1,
            "answer":"A"
        },
        {
            "questionId":2,
            "answer":"A"
        }
    ]
}
```
 查看待阅试卷卷面:http://39.107.84.0:8763/getAnswerBySubmitId?submitId=2  
 阅卷：http://39.107.84.0:8763/judge  
 根据班级查询学生：http://39.107.84.0:8762/getStudentByClassName?className=软件  
 根据userId查询学生成绩：http://39.107.84.0:8765/getStudentScoreByUserId?userId=4  
 根据username模糊查询成绩：http://39.107.84.0:8765/getStudentScoreByUsername?username=wuziha  
 根据className模糊查询成绩：http://39.107.84.0:8765/getStudentScoreByClassName?className=软件
