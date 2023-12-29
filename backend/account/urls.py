from django.urls import path
from account.views import UserRegisterView, UserLoginView, UserProfileView, UserChangePasswordView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('profile/', UserProfileView.as_view(), name="profile"),
    path('changepassword/', UserChangePasswordView.as_view(), name="changepassword"),   
]