package com.socialmedia.app.controller;

import com.socialmedia.app.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getTopUsers() {
        return ResponseEntity.ok(postService.getTopUsers());
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Map<String, Object>>> getPosts(
            @RequestParam(required = true) String type) {
        if (!type.equals("latest") && !type.equals("popular")) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(postService.getPosts(type));
    }
}