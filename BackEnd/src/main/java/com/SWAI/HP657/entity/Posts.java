package com.SWAI.HP657.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)  // user_id 컬럼으로 외래 키 설정
    private Users user;

    @Column(unique = true)
    private String postImgUrl;

    @Column(nullable = false, unique = true)
    private String postText;

    @Column()
    private boolean share;
}
