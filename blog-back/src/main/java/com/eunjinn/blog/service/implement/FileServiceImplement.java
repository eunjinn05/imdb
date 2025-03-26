package com.eunjinn.blog.service.implement;

import com.eunjinn.blog.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileServiceImplement implements FileService {

    @Value("${file.path}")
    private String filePath;
    @Value("${file.url}")
    private String fileUrl;

    @Override
    public String upload(MultipartFile file) {
        if(file.isEmpty()) return null;
        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid+extension;
        String savePath = filePath + saveFileName;
        try {
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        String url = fileUrl + saveFileName;
        return url;
    }
}
