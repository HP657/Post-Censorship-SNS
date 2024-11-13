package com.SWAI.HP657.dto.In;

import lombok.Data;

// 댓글 DTO
@Data
public class CommentDto {
    private Long postId;
    private String commentText;
}
