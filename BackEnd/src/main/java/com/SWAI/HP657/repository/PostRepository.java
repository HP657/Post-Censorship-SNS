package com.SWAI.HP657.repository;

import com.SWAI.HP657.entity.Posts;
import com.SWAI.HP657.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Posts, Long> {
    Optional<Posts> findByPostId(Long postId);
    List<Posts> findByUser_UserId(Long userId);
    List<Posts> findByShareTrueOrderByPostIdDesc();
    List<Posts> findByShareFalseOrderByPostIdDesc();
    List<Posts> findAllByOrderByPostIdDesc();
}

