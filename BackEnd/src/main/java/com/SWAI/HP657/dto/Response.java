package com.SWAI.HP657.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

// 이 프로젝트 표준 출력 형식
@Data
@NoArgsConstructor
public class Response<T> {
    private int status;
    private T data;

    public Response(T data, HttpStatus status) {
        this.status = status.value();
        this.data = data;
    }

    public ResponseEntity<Response<T>> toResponseEntity() {
        return ResponseEntity.status(this.status).body(this);
    }
}