from .models import * #Importamos todos los modelos 
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import hashlib
import jwt
import json
import datetime #Para obtener fecha sistema
import re #Módulo de Python que proporciona soporte para expresiones regulares
from django.http import JsonResponse, HttpResponse #importamos para poder responder con json o http
# Create your views here.
secret = 'secreto'
#FUNCION PARA HASHEAR LA CONTRASEÑA
def hash_password(pass1):
    return hashlib.sha256(pass1.encode()).hexdigest()

#FUNCION QUE GENERA UN session_token DE SESIÓN
def generate_session_token(usuario):
    issued_at = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ') # fecha de creación del session_token
    expires_at = (datetime.datetime.utcnow() + datetime.timedelta(minutes=30)).strftime('%Y-%m-%dT%H:%M:%S.%fZ') # fecha de expiración del session_token
    payload = {
        'user_id': usuario.id_usuario,
        'username': usuario.nick,
        'name': usuario.name,
        'apells': usuario.apells,
        'email': usuario.email,
        'issued_at': issued_at,
        'expires_at': expires_at
    }
    session_token = jwt.encode(payload, secret, algorithm='HS256')
    session_token = session_token.decode('utf-8')
    return session_token
#FUNCION QUE VALIDA UN session_token DE SESIÓN
def validate_session_token(session_token):
    if not session_token:
        return JsonResponse({'error': 'Token not exists.'}, status=401)
    if not session_token.startswith('Bearer '):
        return JsonResponse({'error': 'token needs to start with Bearer.'}, status=401)
    try:
        # Si el token no se puede decodificar correctamente, se levanta una excepción para indicar que es inválido
        payload = jwt.decode(session_token, secret, algorithms=['HS256'])
    except jwt.DecodeError:
        return JsonResponse({'error': 'cannot decode correctly'}, status=401)
        # Verificar si el token ha expirado
    if 'expires_at' in payload and payload['expires_at'] < datetime.datetime.utcnow():
        return JsonResponse({'error': 'session token expired.'}, status=401)

#VISTA PARA REGISTRAR A UN USUARIO AL ENDPOINT http://localhost:8000/api/user/register
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

#VISTA PARA INICIAR SESION DE UN USUARIO AL ENDPOINT http://localhost:8000/api/user/login
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nick = data.get('nick')
        pass1 = data.get('pass1')
        try:
            #SE COMPRUEBA QUE EL USUARIO EXISTA SEGUN SU NOMBRE DE USUARIO
            user = Usuario.objects.get(nick=nick)
            #SE COMPRUBA QUE LA CONTRASEÑA ALMACENADA ES IGUAL A LA INTRODUCIDA
            if hash_password(pass1) != user.contraseña:
                return JsonResponse({'error': 'Password is invalid'}, status=401)
            #ENVIA EL session_token DE SESION CON UN 200 OK EN UN JSON
            return JsonResponse({'session_token': generate_session_token(user)}, status=200)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Username does not exist'}, status=400)
    return HttpResponse(status=405)

#VISTA PARA CERRAR SESIÓN DE UN USUARIO AL ENDPOINT http://localhost:8000/api/user/logout
@csrf_exempt
def logout(request):
    if request.method == 'POST':
        # Elimina el session_token de sesión del usuario
        response = JsonResponse({'OK': 'Successfully logged out'}, status=200)
        response.delete_cookie('session_session_token')
        return response
    return HttpResponse(status=405)

#VISTA PARA OBTENER INFO DE UN USUARIO AL ENDPOINT http://localhost:8000/api/user/logout
@csrf_exempt
def userdata(request):
    if request.method == 'GET':
        # Obtener el session_token de la cabecera Authorization
        session_token = request.META.get('HTTP_AUTHORIZATION')
        validate_session_token(session_token)
        return HttpResponse(status=405)