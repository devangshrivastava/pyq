from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import * 
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from account.renderers import UserRenderer


def get_tokens_for_user(user): 
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
# Create your views here.

class UserRegisterView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response(
            {"token":token,
            "message": "User created successfully"},
            status=status.HTTP_201_CREATED,
        )
        
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(email=email, password=password)
            if user is not None: 
                token = get_tokens_for_user(user)
                return Response(
                    {"token":token,
                    "message": "User logged in  successfully"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"errors": {"non_field_errors": ["Invalid credentials"]}}, 
                    status=status.HTTP_404_NOT_FOUND 
                )
            

class UserProfileView(APIView):
    renderer_classes =[UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
            
class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK) 

class UserChoicesView(APIView):
   def get(self, request, format=None):
       user_choices = UserChoices.objects.filter(email=request.user)
       serializer = UserChoicesSerializer(user_choices, many=True)
       print(serializer.data)
       print("hello\n\n\n")
       return Response(serializer.data, status=status.HTTP_200_OK)
   
class UserCoursesUpdateView(APIView):
   renderer_classes = [UserRenderer]
   permission_classes = [IsAuthenticated]
   def put(self, request, format=None):
        print(request.data)
        serializer = UserCoursesUpdateSerializer(data=request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'Courses Updated Successfully'}, status=status.HTTP_200_OK)