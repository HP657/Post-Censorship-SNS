package com.SWAI.HP657.repository;

import com.SWAI.HP657.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// 게시물 리포지토리
public interface PostRepository extends JpaRepository<Posts, Long> {
    List<Posts> findByShareTrueOrderByPostIdDesc();
    List<Posts> findByShareFalseOrderByPostIdDesc();
    List<Posts> findAllByOrderByPostIdDesc();
    List<Posts> findByReviewRequestedTrueOrderByPostIdDesc();
    Optional<Posts> findByPostId(Long postId);
    List<Posts> findByUser_UserIdOrderByPostIdDesc(Long userId);
}

