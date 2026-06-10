import React, { useState, useEffect } from "react";

/* ---------------- LOCAL STORAGE KEYS ---------------- */

const STUDENTS_KEY = "students";
const SESSION_KEY = "student_session";

/* ---------------- LOCAL STORAGE FUNCTIONS ---------------- */

function getStudents() {
  return JSON.parse(localStorage.getItem(STUDENTS_KEY)) || [];
}

function saveStudents(students) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function saveSession(student) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(student));
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

/* ================= SIGNUP PAGE ================= */

function Signup({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    course: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const students = getStudents();

    const studentExists = students.find(
      (student) => student.email === form.email
    );

    if (studentExists) {
      alert("Student already registered");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: form.name,
      roll: form.roll,
      course: form.course,
      email: form.email,
      password: form.password,
    };

    saveStudents([...students, newStudent]);

    alert("Signup Successful");

    setForm({
      name: "",
      roll: "",
      course: "",
      email: "",
      password: "",
    });

    setPage("login");
  }

  return (
    <div className="container">
      <div className="box">

        <div className="topDesign"></div>

        <h1>Create Account</h1>
        <p className="subtitle">
          Student Login
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <div className="row">
            <input
              type="text"
              name="roll"
              placeholder="Roll Number"
              value={form.roll}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="course"
              placeholder="Course"
              value={form.course}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="switchText">
          Already have an account?
          <span onClick={() => setPage("login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

/* ================= LOGIN PAGE ================= */

function Login({ setPage, setStudent }) {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const students = getStudents();

    const foundStudent = students.find(
      (student) =>
        student.email === form.email &&
        student.password === form.password
    );

    if (!foundStudent) {
      alert("Invalid Email or Password");
      return;
    }

    saveSession(foundStudent);

    setStudent(foundStudent);

    alert("Login Successful");

    setPage("dashboard");
  }

  return (
    <div className="container">
      <div className="box">

        <div className="topDesign"></div>

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Login to continue
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="switchText">
          Don't have an account?
          <span onClick={() => setPage("signup")}>
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard({ student, logout }) {
  return (
    <div className="container">
      <div className="box dashboard">

        <div className="profileCircle">
          {student.name.charAt(0)}
        </div>

        <h1>{student.name}</h1>

        <p className="welcome">
          Welcome to Student Dashboard
        </p>

        <div className="infoCard">
          <p>
            <strong>Roll No:</strong> {student.roll}
          </p>

          <p>
            <strong>Course:</strong> {student.course}
          </p>

          <p>
            <strong>Email:</strong> {student.email}
          </p>
        </div>

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

/* ================= MAIN APP ================= */

export default function App() {

  const [page, setPage] = useState("signup");

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const session = getSession();

    if (session) {
      setStudent(session);
      setPage("dashboard");
    }
  }, []);

  function logout() {
    clearSession();
    setStudent(null);
    setPage("login");
  }

  /* PROFESSIONAL CSS */

  useEffect(() => {

    const style = document.createElement("style");

    style.innerHTML = `

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      body{
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg,#0f172a,#1e293b,#2563eb);
        min-height:100vh;
      }

      .container{
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:100vh;
        padding:20px;
      }

      .box{
        width:100%;
        max-width:430px;
        background:rgba(255,255,255,0.12);
        backdrop-filter:blur(15px);
        border:1px solid rgba(255,255,255,0.2);
        padding:35px;
        border-radius:24px;
        box-shadow:0 8px 40px rgba(188, 26, 188, 0.3);
        text-align:center;
        color:white;
        position:relative;
        overflow:hidden;
        animation:fadeIn 0.6s ease;
      }

      .topDesign{
        position:absolute;
        top:-60px;
        right:-60px;
        width:160px;
        height:160px;
        background:rgba(190, 38, 99, 0.12);
        border-radius:50%;
      }

      h1{
        font-size:32px;
        margin-bottom:8px;
        font-weight:700;
      }

      .subtitle{
        color:#dbeafe;
        margin-bottom:25px;
        font-size:14px;
      }

      form{
        display:flex;
        flex-direction:column;
        gap:15px;
      }

      .row{
        display:flex;
        gap:12px;
      }

      input{
        width:100%;
        padding:14px;
        border:none;
        outline:none;
        border-radius:12px;
        background:rgba(60, 41, 229, 0.15);
        color:white;
        font-size:15px;
        transition:0.3s;
      }

      input::placeholder{
        color:#dbeafe;
      }

      input:focus{
        background:rgba(115, 17, 128, 0.22);
        transform:scale(1.02);
        box-shadow:0 0 10px rgba(255,255,255,0.25);
      }

      button{
        width:100%;
        padding:14px;
        border:none;
        border-radius:12px;
        background:linear-gradient(135deg,#38bdf8,#2563eb);
        color:white;
        font-size:16px;
        font-weight:600;
        cursor:pointer;
        transition:0.3s;
        margin-top:10px;
      }

      button:hover{
        transform:translateY(-2px);
        box-shadow:0 8px 20px rgba(92, 16, 33, 0.5);
      }

      .switchText{
        margin-top:20px;
        color:#dbeafe;
        font-size:14px;
      }

      span{
        color:white;
        font-weight:700;
        margin-left:6px;
        cursor:pointer;
      }

      span:hover{
        text-decoration:underline;
      }

      .dashboard{
        text-align:center;
      }

      .profileCircle{
        width:90px;
        height:90px;
        border-radius:50%;
        background:linear-gradient(135deg,#38bdf8,#2563eb);
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:34px;
        font-weight:bold;
        margin:0 auto 20px;
      }

      .welcome{
        margin-bottom:20px;
        color:#dbeafe;
      }

      .infoCard{
        background:rgba(206, 39, 94, 0.12);
        padding:20px;
        border-radius:16px;
        text-align:left;
        margin-bottom:20px;
      }

      .infoCard p{
        margin:12px 0;
        font-size:15px;
      }

      @keyframes fadeIn{
        from{
          opacity:0;
          transform:translateY(20px);
        }
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      @media(max-width:500px){

        .row{
          flex-direction:column;
        }

        .box{
          padding:25px;
        }

        h1{
          font-size:26px;
        }
      }

    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };

  }, []);

  if (page === "signup") {
    return <Signup setPage={setPage} />;
  }

  if (page === "login") {
    return (
      <Login
        setPage={setPage}
        setStudent={setStudent}
      />
    );
  }

  return (
    <Dashboard
      student={student}
      logout={logout}
    />
  );
}
