package com.eunjinn.blog.controller;

import com.eunjinn.blog.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    public String upload(@RequestPart("file") MultipartFile file) {
        String url = fileService.upload(file);
        return url;
    }

}
