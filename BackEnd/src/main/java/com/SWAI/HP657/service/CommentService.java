package com.SWAI.HP657.service;

import com.SWAI.HP657.dto.In.CommentDto;
import com.SWAI.HP657.dto.Response;
import com.SWAI.HP657.entity.Comments;
import com.SWAI.HP657.entity.Posts;
import com.SWAI.HP657.entity.Users;
import com.SWAI.HP657.repository.CommentRepository; // 적절한 패키지로 수정하세요
import com.SWAI.HP657.repository.PostRepository;
import com.SWAI.HP657.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

// 댓글 서비스 레이아웃
@Service
public class CommentService {

    @Autowired
    private  CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    // 댓글 추가 서비스
    public Response<String> addComment(CommentDto commentDto, HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("userId");
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Posts post =  postRepository.findByPostId(commentDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        Comments comment = new Comments();
        comment.setUser(user);
        comment.setPost(post);
        comment.setUsername(user.getUsername());
        comment.setCommentText(commentDto.getCommentText());
        commentRepository.save(comment);
        return new Response<>("댓글 달음", HttpStatus.OK);
    }

    // 등록된 게시물의 댓글 가져오는 서비스
    public Response<List<Comments>> getCommentsByPostId(Long postId) {
        List<Comments> comments = commentRepository.findByPost_PostId(postId);
        return new Response<>(comments, HttpStatus.OK);
    }
}
