from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class CreateUserAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(request.data)

        if 'avatar' in request.FILES:
            avatar_file = request.FILES['avatar']
            print(f"Nome do arquivo do avatar: {avatar_file.name}")

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUserAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Usuário e senha são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is not None:
            # Geração do token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({'message': 'Seja bem vindo cidadão, o Computador é seu amigo!', 'access_token': access_token}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Este acesso não está disponível para seu nível de segurança.'}, status=status.HTTP_401_UNAUTHORIZED)
