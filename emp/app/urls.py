from django.urls import path
from .views import *
urlpatterns = [
    # Student URLs
    path('stud/', student_ap.as_view(), name="student"),
    path('stud/get/<str:regno>/', student_ap.as_view(), name="get_student"),
    path('stud/put/<str:regno>/', student_ap.as_view(), name="update_student"),
    path('stud/del/<str:regno>/', student_ap.as_view(), name="delete_student"),
    # Employee URLs 
    path('emp/get/', emp_ap.as_view()),
    path('emp/post/', emp_ap.as_view(), name="create_employee"),
    path('emp/put/<str:Empid>/', emp_ap.as_view(), name="update_employee"),
    path('emp/del/<str:Empid>/', emp_ap.as_view(), name="delete_employee"),
    # emp_log URLs
    path('log/', emp_log.as_view(), name="log_employee"),
    path('log/get/<str:emp>', emp_log.as_view(), name="log_employeee"),
     path('log/edet/<str:empId>', hello.as_view(), name="log_employeeee"),
    # stud_view URLs
    path('details/', stud_view.as_view(), name="view_stud"),
    path('studet/<str:employeeData>', hello2.as_view(), name="view_studd"),
    path('sch/',sched.as_view(),name="sched"),
    path('reports/post/',reports.as_view(),name="reports_post"),
    path('reports/get/',reports.as_view(),name="report_get"),
]
