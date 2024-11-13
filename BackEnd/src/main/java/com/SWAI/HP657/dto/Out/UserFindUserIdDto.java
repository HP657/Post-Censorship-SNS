package com.SWAI.HP657.dto.Out;

// 필요한 정보만 가져오는 DTO
public interface UserFindUserIdDto {
    Long getUserId();
    String getUsername();
    String getEmail();
    String getProfileImgUrl();
}