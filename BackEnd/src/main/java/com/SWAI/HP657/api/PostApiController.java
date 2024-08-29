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

@RestController
@RequestMapping("/api/post")
public class PostApiController {

    @Autowired
    private PostService postService;

    @PostMapping("/add")
    public ResponseEntity<Response<String>> postAdd(
            @RequestParam("postImg") MultipartFile postImg,
            @RequestParam("content") String content,
            @RequestParam("username") String username,
            HttpServletRequest request) throws IOException {

        PostUploadDto postUploadDto = new PostUploadDto(postImg, content, username);
        return postService.postAdd(postUploadDto, request).toResponseEntity();
    }

    @GetMapping("/view/{postId}")
    public ResponseEntity<Response<Posts>> idPost(@PathVariable("postId") Long postId) {
        return postService.idPost(postId).toResponseEntity();
    }

    @GetMapping("/my/post")
    public ResponseEntity<Response<List<Posts>>> myPost(HttpServletRequest request) {
        return postService.myPost(request).toResponseEntity();
    }

    @GetMapping("/a/view")
    public ResponseEntity<Response<List<Posts>>> viewAPost() {
        return postService.viewAPost().toResponseEntity();
    }

    @GetMapping("/t/view")
    public ResponseEntity<Response<List<Posts>>> viewTPost() {
        return postService.viewTPost().toResponseEntity();
    }

    @GetMapping("/f/view")
    public ResponseEntity<Response<List<Posts>>> viewFPost() {
        return postService.viewFPost().toResponseEntity();
    }
    @GetMapping("/r/view")
    public ResponseEntity<Response<List<Posts>>> viewRPost() {
        return postService.viewRPost().toResponseEntity();
    }

    @PostMapping("/{postId}/request/review")
    public ResponseEntity<Response<String>> requestReview(@PathVariable("postId") Long postId) {
        return postService.requestReview(postId).toResponseEntity();
    }
    @PostMapping("{postId}/request/review/ok")
    public ResponseEntity<Response<String>> reviewOk(@PathVariable("postId") Long postId) {
        return postService.requestReviewOk(postId).toResponseEntity();
    }
}
