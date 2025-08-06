from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from .models import *
from rest_framework .views import APIView
from rest_framework.response import Response
from collections import defaultdict


class hello(APIView): #single employee detail retriving using empid
    def get(self,request,empId):
        employee=collection_emp.find_one({"emp":empId},{"_id": 0})
        return Response(employee)
    
class  hello2(APIView): #showing employee's individual student details
    def get(self,request,employeeData): 
        stu=collection_student.find({"trainer":employeeData.capitalize()},{"_id": 0})
        return Response(list(stu))
#emp-mixed   
class emp_log(APIView):
    def post(self,request): #emp login
        employee = collection_emp.find_one({"emp":request.data.get("emp")})
        if employee.get("password")==request.data.get("password"):
            return Response("Success")
        else:
            return Response({"error": "employee not found"})
    def get(self,request,empId): # single employee name retriving using empid
        employee=collection_emp.find_one({"emp":empId})
        return Response(employee.get('name'))

    
    
class stud_view(APIView): #all the student details
    def get(self,request):
        stu=collection_student.find({},{"_id": 0})
        return Response(list(stu))
    
 # emp details -insert,retrieve       
class emp_ap(APIView):
   def get(self, request):
            try:
                print("🔍 Trying to fetch employee records...")
                employee_cursor = collection_emp.find({}, {"_id": 0})
                employee_list = list(employee_cursor)
                print("✅ Employee Data Fetched:", employee_list)
                return Response(employee_list)
            except Exception as e:
                print("❌ Error in emp_ap.get():", e)
                return Response({"error": str(e)}, status=500)

    def post(self,request):
            collection_emp.insert_one(request.data)
            return Response("data successfully submitted")
    

    # def put(self,request,Empid):
    #     collection_emp.update_one({"Empid": Empid},{"$set":request.data})
    #     return Response("updated")
    # def delete(self,request,Empid):
    #     collection_emp.delete_one({"Empid": Empid})
    #     return Response("deleted")      


# student details -insert,update,delete,retrieve
class student_ap(APIView):
    def post(self,request):
            collection_student.insert_one(request.data)
            return Response("data successfully submitted")
    def get(self,request,regno):
        student = collection_student.find_one({"regno": regno},{"_id": 0})
        if student:
            return Response(student)
        else:
            return Response({"error": "Student not found"})
    def put(self,request,regno):
        collection_student.update_one({"regno": regno},{"$set":request.data})
        return Response("updated")
    def delete(self,request,regno):
        collection_student.delete_one({"regno": regno})
        return Response("deleted")
    

# schedule
class sched(APIView):
    def get(self, request):
        students = collection_student.find({}, {"_id": 0})
        trainer_data = defaultdict(lambda: [[] for _ in range(5)])  
        for student in students:
            trainer_name = student.get("trainer", "").strip().lower()
            try:
                slot = int(student.get("slot")) 
            except (ValueError, TypeError):
                continue  
            if trainer_name is not None and slot < 5 : 
                trainer_data[trainer_name][slot].append({
                    "name": student.get("name"),
                    "course": student.get("course")
                })
        formatted_data = [
            {"trainerName": trainer, "slots": slots}
            for trainer, slots in trainer_data.items()
        ]
        
        return Response(formatted_data)
# reports-insert,reterive
class reports(APIView):
    def post(self,request): 
        collection_rep.insert_one(request.data)
        return Response("data successfully submitted")
    def get(self,request):
        show=collection_rep.find({},{"_id":0})
        return Response(list(show))
