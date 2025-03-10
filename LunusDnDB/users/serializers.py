from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source="profile.avatar", required=False, allow_null=True)

    class Meta:
        model = User
        fields = ("id", "username", "first_name", "avatar", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):

        profile_data = validated_data.pop('profile', {})

        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        profile_data['user'] = user
        Profile.objects.create(**profile_data)

        return user
