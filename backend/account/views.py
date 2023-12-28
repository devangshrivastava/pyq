from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer, UserChangePasswordSerializer, SendPasswordResetEmailSerializer, UserPasswordResetSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user): 
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
# Create your views here.


class UserRegisterView(APIView):
    def post(self, request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response(
                {"token":token,
                "message": "User created successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # return Response({'msg':"registration successful"})


class UserLoginView(APIView):
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
                    {"error": {"non_field_errors": ["Invalid credentials"]}}, 
                    status=status.HTTP_404_NOT_FOUND 
                )
            

class UserProfileView(APIView):
    # renderer_classes =[UserRenderer],
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        # if serializer.is_valid():
        print(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
            

class UserChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context = {'user': request.user})
        if serializer.is_valid(raise_exception=True):

            return Response(
                {"message": "Password changed successfully"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class SendPasswordResetEmailView(APIView):
#   renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
#   renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)