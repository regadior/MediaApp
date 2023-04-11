from .models import * #Importamos todos los modelos 
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import hashlib
import jwt
import json
import re #Módulo de Python que proporciona soporte para expresiones regulares
from django.http import JsonResponse, HttpResponse #importamos para poder responder con json o http
# Create your views here.

#FUNCION PARA HASHEAR LA CONTRASEÑA
def hash_password(pass1):
    return hashlib.sha256(pass1.encode()).hexdigest()

#FUNCION QUE GENERA UN TOKEN DE SESIÓN
def generate_token(usuario):
    payload = {
        'user_id': usuario.id_usuario,
        'username': usuario.nick,
        'name': usuario.name,
        'apells': usuario.apells,
        'email': usuario.email
    }
    secret = 'secreto'
    token = jwt.encode(payload, secret, algorithm='HS256')
    token = token.decode('utf-8')
    return token

#VISTA PARA REGISTRAR A UN USUARIO AL ENDPOINT http://localhost:8000/api/user/register/
@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        apells = data.get('apells')
        nick = data.get('nick')
        email = data.get('email')
        pass1 = data.get('pass1')
        pass2 = data.get('pass2')

        # Comprobar que todos los campos esten completos
        if not all([name, apells, nick, email, pass1, pass2]):
            return JsonResponse({'error': 'Missing parameters (incomplete fields)'}, status=400)

        # COMPROBAR QUE EL NOMBRE TIENE DE 3 A 25 DIGITOS
        if not(3<= len(name)<= 25):
            return JsonResponse({'error': 'The Name field must have between 3 and 25 digits.'}, status=400)
        
        # COMPROBAR QUE EL APELLIDO ESTE ENTRE 2Y 25 CARACTERES"
        if not (2<= len(apells)<= 25):
            return JsonResponse({'error': 'The Last Name field must have between 2 and 25 digits.'}, status=400)

        # COMPROBAR QUE EL NOMBRE DE USUARIO TIENE DE 3 A 20 DIGITOS
        if not(3<= len(nick)<= 20):
            return JsonResponse({'error': 'The Username field must have between 1 and 20 digits.'}, status=400)

        # COMPROBAR QUE EL EMAIL ES VÁLIDO
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return JsonResponse({'error': 'Email is invalid'}, status=400)
        
        # Comprobamos que las contraseñas coinciden
        if pass1 != pass2:
            return JsonResponse({'error': 'Passwords do not match'}, status=400)
        
        # COMPROBAR QUE LA CONTRASEÑA DE USUARIO TIENE DE 5 A 20 DIGITOS
        if not(5<= len(pass1)<= 20):
            return JsonResponse({'error': 'The User password field must have between 5 and 20 digits.'}, status=400)
        # Comprobamos que el usuario no exista ya en la base de datos
        user = None
        try:
            user = Usuario.objects.get(nick=nick)
        except Usuario.DoesNotExist:
            pass

        if user:
            return JsonResponse({'error': 'User with this username already exists'}, status=409)

        #Comprobamos que el correo no exista ya en la base de datos
        try:
            user = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            pass

        if user:
            return JsonResponse({'error': 'The user with this email already exists'}, status=409)

        # Crear el usuario
        hashed_password = hash_password(pass1)
        rol_usuario = RolUsuario.objects.get(id_rol=3)
        new_user = Usuario(name=name, apells=apells, nick=nick, email=email, contraseña=hashed_password, descripcion="Escribe aqui tu descripción",id_rol=rol_usuario)#el rol por defecto de usuer normal es el 3
        new_user.save()
        #RESPONDE UN 20OK
        return JsonResponse({'OK': 'Successfully registered user'}, status=200)
    return HttpResponse(status=405)

#VISTA PARA INICIAR SESION DE UN USUARIO AL ENDPOINT http://localhost:8000/api/user/login/
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nick = data.get('nick')
        pass1 = data.get('pass1')
        try:
            #SE COMPRUEBA QUE EL USUARIO EXISTA SEGUN SU NOMBRE DE USUARIO
            user = Usuario.objects.get(nick=nick)
            print(user)
            #SE COMPRUBA QUE LA CONTRASEÑA ALMACENADA ES IGUAL A LA INTRODUCIDA
            if hash_password(pass1) != user.contraseña:
                return JsonResponse({'error': 'Password is invalid'}, status=401)
            #ENVIA EL TOKEN DE SESION CON UN 200 OK EN UN JSON
            return JsonResponse({'session_token': generate_token(user)}, status=200)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Username does not exist'}, status=400)
    return HttpResponse(status=405)