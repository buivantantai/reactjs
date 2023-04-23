import React, { useState } from "react";
import Caja from "./caja";
import Bgheader from "./bgheader";
import Footer from "./footer";
import { registerFirebase } from "../feature/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import logo from "../../assets/img/MyAnimeList-login-icon.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = () => {
    window.location.reload();
  };
  return (
    <div style={{ backgroundColor: "#0f0f0f" }}>
      <div className="Header">
        <Caja></Caja>
        <Bgheader></Bgheader>
      </div>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "40px",
        }}
      >
        <div
          className="box"
          style={{ textAlign: "start", marginBottom: "222px" }}
        >
          <div className="box-item">
            <h1>Đăng Ký Tài Khoản MyListAnime</h1>
            <div className="peliculas">
              <Form
                style={{ marginRight: "130px" }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    dispatch(
                      registerFirebase({
                        email: email,
                        password: password,
                      })
                    );
                    navigate("/");
                    setTimeout(() => {
                      refresh();
                    }, 2000);
                  }
                }}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="btn-submit"
                  onClick={() => {
                    dispatch(
                      registerFirebase({
                        email: email,
                        password: password,
                      })
                    );
                    navigate("/");
                    setTimeout(() => {
                      refresh();
                    }, 2000);
                  }}
                >
                  Sign Up
                </Button>
              </Form>
              <div className="clear"></div>
            </div>
            <div className="lateral">
              <center>
                <img src={logo}></img>
              </center>
            </div>
            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
