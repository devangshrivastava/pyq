from django.urls import path
from . import views

# from account.views import  

urlpatterns = [
    path('courses/',views.getAllCourses,name="courses"),
    path('courses/<str:pk>/',views.getCourse,name="course"),
    path('courses/<str:course_id>/<str:type>/',views.getFiles,name="files")
]
