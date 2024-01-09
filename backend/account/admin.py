from django.contrib import admin
from account.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from account.models import UserChoices
# Register your models here so that they appear on the admin page


# This class extends the UserAdmin class from django.contrib.auth.admin.
# It overrides certain attributes to customize the appearance and behavior of the User model in the Django admin interface.
class UserAdmin(BaseUserAdmin):

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id", "email", "name", "is_admin", "courses"] #this will display these fields on admin page
    list_filter = ["is_admin"]
    fieldsets = [
        ("User Credentials", {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name", "courses"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]

    # add_fieldsets is not a standard ModelAdmin attribute. 
    # UserAdmin overrides get_fieldsets to use this attribute when creating a user.

    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"], # It applies a CSS class to widen the form, making it visually more appealing.
                "fields": ["email", "name", "courses", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"] #this will allow us to search user by email(check in admin page)
    ordering = ["email","id"]
    filter_horizontal = []


# Now register the new UserAdmin...
# It tells Django's admin site to use the UserAdmin class for the administration of the User model.
admin.site.register(User, UserAdmin)
admin.site.register(UserChoices)