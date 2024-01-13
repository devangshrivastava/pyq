from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.contrib.postgres.fields import ArrayField
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, name, courses = [] ,password=None, password2=None):
    # we have used password2 here because we want to make sure that user has entered the same password in both the fields.
    # This is not a field in our model but we have used it here to validate the password.
    # This basically helps us during searliazation.
    
     
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name = name,
            courses = courses,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password=None, courses = []):
        
        if not email:
            raise ValueError("Admins must have an email address")

        user = self.create_user(
            email,
            password=password,
            name = name,
            courses = courses,
        )
        # user.set_password(password)
        user.is_admin = True
        user.save(using=self._db)
        return user




class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True) # without this true, user can not login even though they have registered
    is_admin = models.BooleanField(default=False) # our user is not admin by default, this help us in creating superuser
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    courses = ArrayField(models.CharField(max_length=100), blank=True, default= [])

    
    objects = UserManager()
    USERNAME_FIELD = "email" #we are using email as username i.e. user will login using email
    REQUIRED_FIELDS = ["name"]



    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # We dont want users to have all permissions. So only admin will have all permissions.
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`? This means a user can explore any module of the app"
        # Simplest possible answer: Yes, always general practice. If in case we don't want certain module to be accessed by user we can change it here.
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    



# The reason we have user and usermanager as 2 different classes because we want modularity in our code and we want to keep our code clean. 
# We can have all the functions in user class itself but it will make our code messy and difficult to understand.
# So we have created a separate class for usermanager which focuses on creation and different management for example if it's admin or not.
# Whereas user class will focus on creating fields and related things.
# It is a design pattern followed by django.
    


class UserChoices(models.Model):
    email = models.ForeignKey(User, verbose_name="user", on_delete=models.CASCADE, related_name="choices", blank=False)
    course_id = models.CharField(max_length=100,blank=False)