package com.SWAI.HP657.dto.In;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

// 게시물 등록 DTO
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostUploadDto {
    private MultipartFile postImg;
    private String content;
    private String username;
}
