package com.SWAI.HP657.repository;

import com.SWAI.HP657.dto.Out.UserFindUserIdDto;
import com.SWAI.HP657.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// 유저 리포지토리
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findUserByEmail(String email);
    Optional<UserFindUserIdDto> findUserByUserId(Long userId);
    List<UserFindUserIdDto> findAllProjectedBy();
}