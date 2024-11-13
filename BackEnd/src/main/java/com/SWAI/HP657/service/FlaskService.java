package com.SWAI.HP657.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;

// AI 백엔드와 REST 통신을 위한 서비스
@Service
public class FlaskService {

    @Autowired
    private RestTemplate restTemplate;

    private final String FLASK_SERVER_URL = "http://localhost:5000/predict";

    public boolean verifyImageWithFlask(String imageUrl) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = new LinkedHashMap<>();
            body.put("image_url", imageUrl);

            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    FLASK_SERVER_URL, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<Map<String, Object>>() {});

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null) {
                    Boolean isConfident = (Boolean) responseBody.get("is_confident");
                    return isConfident != null && isConfident;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
