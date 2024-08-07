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

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private FlaskService flaskService;

    @Transactional
    public Response<String> postAdd(PostUploadDto postUploadDto, HttpServletRequest request) throws IOException {
        Long userId = (Long) request.getSession().getAttribute("userId");

        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Posts post = new Posts();
        post.setUser(user);
        post.setPostText(postUploadDto.getContent());
        post.setShare(false);

        MultipartFile postImg = postUploadDto.getPostImg();
        if (postImg != null && !postImg.isEmpty()) {
            String postImgUrl = imageService.uploadImage(postImg, "posts");
            post.setPostImgUrl(postImgUrl);

            post = postRepository.save(post);
            Long postId = post.getPostId();

            boolean isConfident = flaskService.verifyImageWithFlask(postImgUrl);
            System.out.println(isConfident);
            if (isConfident) {
                post.setShare(true);
                postRepository.save(post);
                return new Response<>("게시물 업로드 성공적 (이미지 검증 성공)", HttpStatus.OK);
            } else {
                return new Response<>("게시물 업로드 성공적 (이미지 검증 실패)", HttpStatus.OK);
            }
        } else {
            postRepository.save(post);
            return new Response<>("게시물 업로드 성공적 (이미지 없음)", HttpStatus.OK);
        }
    }
}
