package com.SWAI.HP657.api;

import com.SWAI.HP657.dto.In.CommentDto;
import com.SWAI.HP657.dto.Response;
import com.SWAI.HP657.entity.Comments;
import com.SWAI.HP657.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 댓글 API 컨트롤러
@RestController
@RequestMapping("/api/comments")
public class CommentApiController {

    @Autowired
    private CommentService commentService;

    // 댓글 추가
    @PostMapping("/add/comment")
    public ResponseEntity<Response<String>> addComment(@RequestBody CommentDto commentDto, HttpServletRequest request) {
        return commentService.addComment(commentDto, request).toResponseEntity();
    }

    // 특정 게시물의 댓글 조회
    @GetMapping("/post/{postId}")
    public ResponseEntity<Response<List<Comments>>> getCommentsByPostId(@PathVariable("postId") Long postId) {
        return commentService.getCommentsByPostId(postId).toResponseEntity();
    }
}
