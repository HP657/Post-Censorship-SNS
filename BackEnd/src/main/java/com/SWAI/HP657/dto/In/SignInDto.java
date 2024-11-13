package com.SWAI.HP657.dto.In;

import lombok.Data;

// 로그인 DTO
@Data
public class SignInDto {
    private String email;
    private String password;
}