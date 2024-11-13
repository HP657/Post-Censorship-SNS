package com.SWAI.HP657.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

// 구글 클라우드 스토리지 사용하는 서비스 레이아웃
@Service
public class ImageService {

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    private final Storage storage;

    public ImageService(@Value("${spring.cloud.gcp.storage.credentials.location}") String credentialsLocation, ResourceLoader resourceLoader) throws IOException {
        Resource resource = resourceLoader.getResource(credentialsLocation);
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        this.storage = StorageOptions.newBuilder()
                .setCredentials(credentials)
                .build()
                .getService();
    }

    // 이미지 업로드 서비스
    public String uploadImage(MultipartFile file, String imgs) throws IOException {
        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
        String filePath = imgs + "/" + fileName;

        BlobId blobId = BlobId.of(bucketName, filePath);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();
        storage.create(blobInfo, file.getBytes());

        return String.format("https://storage.googleapis.com/%s/%s/%s", bucketName, imgs, fileName);
    }

    // 이미지 삭제 서비스
    public boolean deleteImage(String imageUrl) {
        String objectName = imageUrl.replace("https://storage.googleapis.com/" + bucketName + "/", "");

        boolean deleted = storage.delete(bucketName, objectName);

        if (deleted) {
            System.out.println("Object " + objectName + " was permanently deleted from " + bucketName);
        } else {
            System.out.println("The object " + objectName + " wasn't found in " + bucketName);
        }

        return deleted;
    }
}
