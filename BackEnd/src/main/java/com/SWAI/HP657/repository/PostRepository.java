package com.SWAI.HP657.repository;

import com.SWAI.HP657.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Posts, Long> {
}
