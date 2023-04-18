import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';//Para redirigir a una direccion sijn actualizar
import { Link } from 'react-router-dom'
import './Register.css';
export default function RegisterPage() {
  const navigate = useNavigate();
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [error7, setError7] = useState("");
  const [name, setName] = useState("");
  const [apells, setApells] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");


  const validateForm = () => {
    setError1("");
    setError2("");
    setError3("");
    setError4("");
    setError5("");
    setError6("");
    setError7("");
    let valid = true;
    //COMPROBAR QUE EL NOMBRE TIENE DE 3 A 25 DIGITOS
    if (name.length < 3 || name.length > 25) {
      setError1("* El nombre debe tener entre 3 y 25 caracteres.");
      valid = false;
    }
    //COMPROBAR QUE EL ApellsIDO ESTE ENTRE 2Y 25 CARACTERES"
    if (apells.length < 2 || apells.length > 25) {
      setError2("* El apellsido debe tener entre 2 y 25 caracteres.");
      valid = false;
    }
    //COMPROBAR QUE EL NOMBRE DE USUARIO TIENE DE 3 A 20 DIGITOS
    if (nick.length < 3 || nick.length > 20) {
      setError3("* El nombre de usuario debe tener entre 3 y 20 caracteres.");
      valid = false;
    }
    //COMPROBAR QUE EL EMAIL ES VÁLIDO
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setError4("* El correo electrónico no es válido.");
      valid = false;
    }
    //COMPROBAR QUE LA CONTRASEÑA1 DE USUARIO TIENE DE 5 A 20 DIGITOS
    if (pass1.length < 5 || pass1.length > 20) {
      setError5("* La contraseña debe tener entre 5 y 20 caracteres.");
      valid = false;
    }
    //COMPROBAR QUE LA CONTRASEÑA2 DE USUARIO TIENE DE 5 A 20 DIGITOS
    if (pass2.length < 5 || pass2.length > 20) {
      setError6("* La contraseña debe tener entre 5 y 20 caracteres.");
      valid = false;
    }
    //COMPROBAR QUE LAS CONTRASEÑAS COINCIDEN
    if (pass1 !== pass2) {
      setError7("* Las contraseñas no coinciden.");
      valid = false;
    }

    return valid;
  }
  //FUNCION QUE ENVIA EL FORMULARIO AL HACER CLIC
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/user/register', { //post al endpoint de register
        name,
        apells,
        nick,
        email,
        pass1,
        pass2,
      });
      navigate("/login"); //Redirigir a /login
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error);
      } else {
        console.log('Error:', err.message);
      }
    }
  };
  return (
    <div className='Register'>
      <form onSubmit={handleSubmit} className='Register_form' >
        <h2>Registrarse</h2>
        <div className='Register_box'>
          <input type="text" id="Register_nombre" name="nombre" value={name} onChange={e => setName(e.target.value)} required></input>
          <label>Nombre</label>
          <p className='Register_error_sesion'>{error1}</p>
        </div>

        <div className='Register_box'>
          <input type="text" id="Register_apellidos" name="apellidos" value={apells} onChange={e => setApells(e.target.value)} required></input>
          <label>Apellidos</label>
          <p className='Register_error_sesion'>{error2}</p>
        </div>

        <div className='Register_box'>
          <input type="text" id="Register_nickname" name="nickname" value={nick} onChange={e => setNick(e.target.value)} required></input>
          <label>Nombre de usuario</label>
          <p className='Register_error_sesion'>{error3}</p>
        </div>

        <div className='Register_box'>
          <input type="text" id="Register_email" name="email" value={email} onChange={e => setEmail(e.target.value)} required></input>
          <label>Email</label>
          <p className='Register_error_sesion'>{error4}</p>
        </div>

        <div className='Register_box'>
          <input type="password" id="Register_contraseña1" name="contraseña1" value={pass1} onChange={e => setPass1(e.target.value)} required></input>
          <label>Contraseña</label>
          <p className='Register_error_sesion'>{error5}</p>
          <p className='Register_error_sesion'>{error7}</p>
        </div>

        <div className='Register_box'>
          <input type="password" id="Register_contraseña2" name="contraseña2" value={pass2} onChange={e => setPass2(e.target.value)} required></input>
          <label>Confirmar Contraseña</label>
          <p className='Register_error_sesion'>{error6}</p>
          <p className='Register_error_sesion'>{error7}</p>
        </div>

        <div className='Register_boton'>
          <input type="submit" value="Registrarse"></input>
        </div>
        <div className='Register_cuenta'>
          Ya tienes una cuenta? <Link className='header_Link' to={`/login`}>Iniciar sesión.</Link>
        </div>
      </form>
    </div>
  )
}