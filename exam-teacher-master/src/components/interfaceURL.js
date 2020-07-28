/*
let baseUrl = "/sxt_exam/Servlet";
//管理员登录
export const  login = baseUrl;
//得到科目信息
export const subject_info = baseUrl;
//得到班级信息
export const get_class_info = baseUrl;
//得到知识点
export const knowledge_point = baseUrl;
//提交题目信息（试题录入）
export const q_checkin = baseUrl;
//出卷
export const paper_info = baseUrl;

//成绩查询
export const search_score = baseUrl;

//查询所有学生（得到一页数据）
export const get_student = baseUrl;
//查询学生（模糊搜索）
export const search_student = baseUrl;
//删除学生
export const delete_student = baseUrl;
//修改学生
export const change_student = baseUrl;
//添加学生
export const add_student = baseUrl;

//查询班级学生（得到一页数据）
export const get_class = baseUrl;
//查询班级（模糊搜索）
export const search_class = baseUrl;
//删除班级
export const delete_class = baseUrl;
//修改班级
export const change_class = baseUrl;
//添加班级
export const add_class = baseUrl;

//查询教师（得到一页数据）
export const get_teacher = baseUrl;
//查询教师（模糊搜索）
export const search_teacher = baseUrl;
//修改老师
export const change_teacher = baseUrl;
//删除老师
export const delete_teacher = baseUrl;
//添加老师
export const add_teacher = baseUrl;

//创建考试
export const create_exam = baseUrl;

//查询试卷（得到一页数据）
export const get_papers = baseUrl;

//获取工号
export const get_manager_id = baseUrl;

//设置阅卷老师
export const set_teacher = baseUrl;

//获取所有的试卷
export const get_all_papers = baseUrl;

//获取主观题题目以及学生答案
export const get_stu_answer = baseUrl;

//提交主观题学生答案
export const submit_score = baseUrl;

//搜索试卷
export const search_papers = baseUrl;

//修改密码
export const change_password = baseUrl;

//自动阅卷
export const auto_read = baseUrl;

//得到试卷编号
export const get_paperId = baseUrl;

*/







//管理员登录
export const login = "http://39.107.84.0:8762/login";
//得到科目信息
export const subject_info = "data/subject_info.json";
//得到班级信息
export const get_class_info = "http://39.107.84.0:8762/getAllClass";
//得到知识点
export const knowledge_point = "http://39.107.84.0:8763/getKnowledgePoint";
//得到题目
export const get_question = "http://39.107.84.0:8763/getQuestion";
//提交题目信息（试题录入）
export const q_checkin = "http://39.107.84.0:8763/addQuestion";
//出卷
export const paper_info = "http://39.107.84.0:8763/addPaper";

//成绩查询
export const search_score = "data/search_score.json";

//查询所有学生（得到一页数据）
export const get_student = "http://39.107.84.0:8762/getAllStudent";
//查询学生（模糊搜索）
export const search_student = "http://39.107.84.0:8762/queryStudentByName";
//删除学生
export const delete_student = "http://39.107.84.0:8762/deleteStudent";
//修改学生
export const change_student = "http://39.107.84.0:8762/updateStudent";
//添加学生
export const add_student = "http://39.107.84.0:8762/addStudent";

//查询班级学生（得到一页数据）
export const get_class = "http://39.107.84.0:8762/getAllClass";
//查询班级（模糊搜索）
export const search_class = "http://39.107.84.0:8762/queryClassByName";
//删除班级
export const delete_class = "http://39.107.84.0:8762/deleteClass";
//修改班级
export const change_class = "http://39.107.84.0:8762/updateClass";
//添加班级
export const add_class = "http://39.107.84.0:8762/addClass";

//查询教师（得到一页数据）
export const get_teacher = "http://39.107.84.0:8762/selectAllTeacher";
//查询教师（模糊搜索）
export const search_teacher = "http://39.107.84.0:8762/queryTeacherByName";
//修改老师
//export const change_teacher = "data/change_teacher.json";
//删除老师
export const delete_teacher = "http://39.107.84.0:8762/deleteUser";
//添加老师
export const add_teacher = "http://39.107.84.0:8762/addTeacher";

//创建考试
export const create_exam = "http://39.107.84.0:8763/createExam";
//获得试卷题目
export const get_paper = "http://39.107.84.0:8763/getExamByClass";

//查询试卷（得到一页数据）
export const get_papers = "http://39.107.84.0:8763/getExamByTeacherId";

//获取工号
export const get_manager_id = "data/get_manager_id.json";

//设置阅卷老师
export const set_teacher = "data/set_teacher.json";

//获取所有的试卷
export const get_all_papers = "data/get_all_papers.json";

//获取主观题题目以及学生答案
export const get_stu_answer = "data/get_stu_answer.json";

//提交主观题学生答案
export const submit_score = "data/submit_score.json";

//搜索试卷
export const search_papers = "data/search_papers.json";

//修改密码
export const change_password = "http://39.107.84.0:8762/changePassword";

//自动阅卷
export const auto_read = "data/auto_read.json";

//得到试卷编号
export const get_paperId = "http://39.107.84.0:8763/getPaperList";

//根据试卷获取题目列表
export const get_questionlist_by_paperId = "http://39.107.84.0:8763/getQuestionList";

//根据题目ID获取题目内容
export const get_question_by_questionById = "http://39.107.84.0:8763/getQuestionById";

//提交试卷
export const submit ="";

/*
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'
*/
