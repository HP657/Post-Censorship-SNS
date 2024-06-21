package com.SWAI.HP657.dto.In;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpDto {
    private String username;
    private MultipartFile profileImg;
    private String email;
    private String password;
}