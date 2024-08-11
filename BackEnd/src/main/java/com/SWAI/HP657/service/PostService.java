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

import javax.swing.text.html.Option;
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
        post.setUsername(postUploadDto.getUsername());

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
    public Response<List<Posts>> viewAPost() {
        return new Response<>(postRepository.findAllByOrderByPostIdDesc(), HttpStatus.OK);
    }
    public Response<List<Posts>> viewTPost() {
        return new Response<>(postRepository.findByShareTrueOrderByPostIdDesc(), HttpStatus.OK);
    }
    public Response<List<Posts>> viewFPost() {
        return new Response<>(postRepository.findByShareFalseOrderByPostIdDesc(), HttpStatus.OK);
    }
    public Response<Posts> idPost(Long postId) {
        Optional<Posts> post = postRepository.findByPostId(postId);
        if (post.isPresent()) {
            return new Response<>(post.get(), HttpStatus.OK);
        } else {
            return new Response<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
