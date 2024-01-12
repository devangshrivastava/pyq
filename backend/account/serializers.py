from rest_framework import serializers
from account.models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator, default_token_generator 
from account.utils import *
from account.models import UserChoices
from django.contrib.postgres.fields import ArrayField

# from account.utils import Util



class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.pop('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match") 
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        
        # Generate a unique confirmation key
        # uid = urlsafe_base64_encode(force_bytes(user.id))
        # token = default_token_generator.make_token(user)
        # confirmation_key = f"{uid}:{token}"

        # # Send confirmation email
        # self.send_confirmation_email(user.email, confirmation_key)

        return user

    # def send_confirmation_email(self, email, confirmation_key):
    #     # Construct the confirmation URL
    #     confirmation_url = f"loacalhost:8000/confirm/{confirmation_key}/"

    #     # Customize the email subject and body as needed

    #     body = f'Click the following link to confirm your email registration: {confirmation_url}'
    #     data = {
    #     'subject':'Confirm your email registration',
    #     'body':body,
    #     'to_email':email
    #     }
    #     Util.send_email(data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['email', 'name', 'courses']

class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    user.set_password(password)
    user.save()
    return attrs

class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']

  def validate(self, attrs):
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():
      user = User.objects.get(email = email)
      uid = urlsafe_base64_encode(force_bytes(user.id))
      print('Encoded UID', uid)
      token = PasswordResetTokenGenerator().make_token(user)
      print('Password Reset Token', token)
      link = 'http://localhost:8000/api/user/reset/'+uid+'/'+token
      print('Password Reset Link', link)
      # Send EMail
      body = 'Click Following Link to Reset Your Password '+link
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':user.email
      }
      Util.send_email(data)
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')

class UserChoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserChoices
        fields = ['email', 'course_id']

class UserCoursesUpdateSerializer(serializers.ModelSerializer):
    courses = serializers.ListField(child=serializers.CharField(max_length=100))
    class Meta:
        model = User
        fields = ['courses']

    def validate(self, attrs):
        # print(attrs)
        # attrs = kwargs.get('attrs', {})
        courses = attrs.get('courses')
        user = self.context.get('user')
        
        if courses is not None and user is not None:
            user.courses = courses
            user.save()
            return user
        else:
            raise serializers.ValidationError("Invalid data or user not provided.")
      