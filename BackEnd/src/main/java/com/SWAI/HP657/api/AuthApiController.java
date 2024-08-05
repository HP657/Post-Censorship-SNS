package com.SWAI.HP657.api;

import com.SWAI.HP657.dto.Response;
import com.SWAI.HP657.dto.In.SignInDto;
import com.SWAI.HP657.dto.In.SignUpDto;
import com.SWAI.HP657.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
public class AuthApiController {

    @Autowired
    private AuthService authService;

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<Response<String>> signUpUser(@ModelAttribute SignUpDto signupDto) throws IOException {
        return authService.signUp(signupDto).toResponseEntity();
    }

    //로그인
    @PostMapping("/signin")
    public ResponseEntity<Response<String>> signInUser(@RequestBody SignInDto signinDto, HttpServletRequest request) {
        return authService.signIn(signinDto, request).toResponseEntity();
    }

    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Response<String>> logOutUser(HttpServletRequest request) {
        return authService.logout(request).toResponseEntity();
    }

    @GetMapping("/info")
    public ResponseEntity<? extends Response<?>> getUserInfo(HttpServletRequest request) {
        return authService.findUserByUserId(request).toResponseEntity();
    }
}
