from django.shortcuts import render
from .serializers import *
from .serializers import FileSerializer
from rest_framework.decorators import api_view
from .models import Courses
from .models import File
from rest_framework.response import Response


# Create your views here.



@api_view(['GET'])
def getAllCourses(request):
    courses = Courses.objects.all()
    serializer = AllCourseSerializer(courses,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCourse(request,pk):
    notes = Courses.objects.get(course_id=pk)
    serializer = CourseSerializer(notes,many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getFiles(request,course_id,type):
    files = File.objects.filter(file_type=type, course_id = course_id)
    serializer = FileSerializer(files,many=True)
    return Response(serializer.data)
