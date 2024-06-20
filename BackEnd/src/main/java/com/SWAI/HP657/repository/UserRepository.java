package com.SWAI.HP657.repository;

import com.SWAI.HP657.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findUserByEmail(String email);
}