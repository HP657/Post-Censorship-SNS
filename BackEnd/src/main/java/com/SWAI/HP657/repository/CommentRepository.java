package com.SWAI.HP657.repository;

import com.SWAI.HP657.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// 댓글 리포지토리
@Repository
public interface CommentRepository extends JpaRepository<Comments, Long> {
    List<Comments> findByPost_PostId(Long postId);
}
