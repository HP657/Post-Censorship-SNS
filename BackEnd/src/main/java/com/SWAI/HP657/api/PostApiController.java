package com.SWAI.HP657.api;

import com.SWAI.HP657.dto.In.PostUploadDto;
import com.SWAI.HP657.dto.In.SignUpDto;
import com.SWAI.HP657.dto.Response;
import com.SWAI.HP657.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/post")
public class PostApiController {

    @Autowired
    private PostService postService;

    @PostMapping("/add")
    public ResponseEntity<Response<String>> PostAdd(@ModelAttribute PostUploadDto postUploadDto, HttpServletRequest request) throws IOException {
        return postService.postAdd(postUploadDto, request).toResponseEntity();
    }

}
