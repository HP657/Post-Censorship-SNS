package com.SWAI.HP657.config;

import com.SWAI.HP657.entity.Users;
import com.SWAI.HP657.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;

@Configuration
@PropertySource("classpath:application.secret.properties")
public class AppConfig {

    @Value("${admin.email}")
    private String AdminEmail;
    @Value("${admin.password}")
    private String AdminPassword;
    @Value("${admin.username}")
    private String AdminUsername;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @PostConstruct
    public void CreateAdmin() {
        Users User_admin = Users.builder()
                .email(AdminEmail)
                .password(AdminPassword)
                .username(AdminUsername)
                .build();
        userRepository.save(User_admin);
    }
}