package com.SWAI.HP657.api;

import com.SWAI.HP657.dto.In.PostUploadDto;
import com.SWAI.HP657.dto.Response;
import com.SWAI.HP657.entity.Posts;
import com.SWAI.HP657.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

// 게시물 API 컨트롤러
@RestController
@RequestMapping("/api/post")
public class PostApiController {

    @Autowired
    private PostService postService;

    // 게시물 등록
    @PostMapping("/add")
    public ResponseEntity<Response<String>> postAdd(
            @RequestParam("postImg") MultipartFile postImg,
            @RequestParam("content") String content,
            @RequestParam("username") String username,
            HttpServletRequest request) throws IOException {

        PostUploadDto postUploadDto = new PostUploadDto(postImg, content, username);
        return postService.postAdd(postUploadDto, request).toResponseEntity();
    }

    // 게시물 삭제
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Response<String>> postDelete(@PathVariable("postId") Long postId) {
        return postService.postDelete(postId).toResponseEntity();
    }

    // 유저Id로 등록된 게시물
    @GetMapping("/view/{postId}")
    public ResponseEntity<Response<Posts>> idPost(@PathVariable("postId") Long postId) {
        return postService.idPost(postId).toResponseEntity();
    }

    // 내 게시물
    @GetMapping("/my/post")
    public ResponseEntity<Response<List<Posts>>> myPost(HttpServletRequest request) {
        return postService.myPost(request).toResponseEntity();
    }

    // 모든 게시물
    @GetMapping("/a/view")
    public ResponseEntity<Response<List<Posts>>> viewAPost() {
        return postService.viewAPost().toResponseEntity();
    }

    // 공유된 게시물
    @GetMapping("/t/view")
    public ResponseEntity<Response<List<Posts>>> viewTPost() {
        return postService.viewTPost().toResponseEntity();
    }

    // 검열된 게시물
    @GetMapping("/f/view")
    public ResponseEntity<Response<List<Posts>>> viewFPost() {
        return postService.viewFPost().toResponseEntity();
    }

    // 재검토 요청된 게시물
    @GetMapping("/r/view")
    public ResponseEntity<Response<List<Posts>>> viewRPost() {
        return postService.viewRPost().toResponseEntity();
    }

    // 재검토 요청
    @PostMapping("/{postId}/request/review")
    public ResponseEntity<Response<String>> requestReview(@PathVariable("postId") Long postId) {
        return postService.requestReview(postId).toResponseEntity();
    }

    // 재검토 응답
    @PostMapping("{postId}/request/review/ok")
    public ResponseEntity<Response<String>> reviewOk(@PathVariable("postId") Long postId) {
        return postService.requestReviewOk(postId).toResponseEntity();
    }
}
