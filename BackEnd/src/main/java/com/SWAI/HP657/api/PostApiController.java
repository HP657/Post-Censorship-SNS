package com.SWAI.HP657.api;

import com.SWAI.HP657.dto.In.PostUploadDto;
import com.SWAI.HP657.dto.Response;
import com.SWAI.HP657.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/post")
public class PostApiController {

    @Autowired
    private PostService postService;

    @PostMapping("/add")
    public ResponseEntity<Response<String>> postAdd(
            @RequestParam("postImg") MultipartFile postImg,
            @RequestParam("content") String content,
            HttpServletRequest request) throws IOException {

        PostUploadDto postUploadDto = new PostUploadDto(postImg, content);
        return postService.postAdd(postUploadDto, request).toResponseEntity();
    }
}
