package com.SWAI.HP657.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(unique = true)
    private String profileImgUrl;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

}