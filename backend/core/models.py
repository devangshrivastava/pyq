from django.db import models

# Create your models here.
class Courses(models.Model):
    course_id = models.CharField(max_length=100, primary_key=True, blank=False)
    course_name = models.CharField(max_length=100,blank=False)
    credits = models.IntegerField(blank=False)
    
    def __str__(self):
        return self.course_id[0:50]
    
class File(models.Model):
    type = (
         ('Tutorials','Tutorials'),
        ('Minor','Minor'),
    )
    course_id = models.ForeignKey(Courses, verbose_name="course", on_delete=models.CASCADE, related_name="files", blank=False)
    file_type = models.CharField(max_length=50, choices=type,blank=False)
    file_nme = models.CharField( max_length=50,blank=False)
    file = models.FileField(upload_to='files/',blank=False, default=None)
    def __str__(self):
        return self.file_nme[0:50]