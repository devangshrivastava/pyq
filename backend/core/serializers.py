from rest_framework.serializers import ModelSerializer
from .models import Courses 
from .models import File 


class AllCourseSerializer(ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'



class FileSerializer(ModelSerializer):
    class Meta:
        model = File
        # fields = '__all__'
        fields = ['course_id', 'file_type', 'file_nme']
        