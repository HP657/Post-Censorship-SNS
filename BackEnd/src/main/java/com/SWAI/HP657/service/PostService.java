package com.SWAI.HP657.service;

import com.SWAI.HP657.dto.In.PostUploadDto;
import com.SWAI.HP657.dto.Response;
import com.SWAI.HP657.entity.Posts;
import com.SWAI.HP657.entity.Users;
import com.SWAI.HP657.repository.PostRepository;
import com.SWAI.HP657.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    public Response<String> postAdd(PostUploadDto postUploadDto, HttpServletRequest request) throws IOException {
        Long userId = (Long) request.getSession().getAttribute("userId");

        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Posts post = new Posts();
        post.setUser(user);
        post.setPostText(postUploadDto.getContent());
        post.setShare(false); // 기본값을 false로 설정

        MultipartFile postImg = postUploadDto.getPostImg();
        if (postImg != null && !postImg.isEmpty()) {
            String postImgUrl = imageService.uploadImage(postImg, "posts");
            post.setPostImgUrl(postImgUrl);
        }

        postRepository.save(post);
        return new Response<>("게시물 업로드 성공적", HttpStatus.OK);
    }

}
