package com.SWAI.HP657.dto.In;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

// 회원가입 DTO
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpDto {
    private String username;
    private MultipartFile profileImg;
    private String email;
    private String password;
}