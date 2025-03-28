package com.socialmedia.app.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.core.ParameterizedTypeReference;
import java.util.*;
import jakarta.annotation.PostConstruct;

@Service
public class PostService {
    private String baseUrl = "http://20.244.56.144/test";
    private String token;
    private RestTemplate restTemplate = new RestTemplate();

    @PostConstruct
    public void initialize() {
        authenticate();
    }

    private void authenticate() {
        Map<String, String> authRequest = new HashMap<>();
        authRequest.put("companyName", "Sri Krishna College Of Technology");
        authRequest.put("clientID", "e76675fd-1c8d-451e-8426-9e46abf571d7");
        authRequest.put("clientSecret", "gRWZdJjtKAaWFnHN");
        authRequest.put("ownerName", "VIGNESH VASU");
        authRequest.put("ownerEmail", "727822tucs252@skct.edu.in");
        authRequest.put("rollNo", "727822TUCS252");

        Map<String, String> response = restTemplate.postForObject(
                baseUrl + "/auth",
                authRequest,
                Map.class);

        if (response != null && response.containsKey("access_token")) {
            this.token = response.get("access_token");
        }
    }

    public Map<String, Object> getUsers() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(
                baseUrl + "/users",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}).getBody();
    }

    public List<?> getUserPosts(String userId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        Map<String, Object> response = restTemplate.exchange(
                baseUrl + "/users/" + userId + "/posts",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}).getBody();
        return (List<?>) response.get("posts");
    }

    public List<Map<String, Object>> getTopUsers() {
        Map<String, Object> usersResponse = getUsers();
        Map<String, String> users = (Map<String, String>) usersResponse.get("users");

        Map<String, Integer> userPostCounts = new HashMap<>();
        for (String userId : users.keySet()) {
            List<?> userPosts = getUserPosts(userId);
            userPostCounts.put(userId, userPosts.size());
        }

        List<Map<String, Object>> topUsers = new ArrayList<>();
        userPostCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(5)
                .forEach(entry -> {
                    Map<String, Object> userInfo = new HashMap<>();
                    userInfo.put("userId", entry.getKey());
                    userInfo.put("name", users.get(entry.getKey()));
                    userInfo.put("postCount", entry.getValue());
                    topUsers.add(userInfo);
                });

        return topUsers;
    }

    public List<Map<String, Object>> getPosts(String type) {
        Map<String, Object> usersResponse = getUsers();
        Map<String, String> users = (Map<String, String>) usersResponse.get("users");
        List<Map<String, Object>> allPosts = new ArrayList<>();

        for (String userId : users.keySet()) {
            List<?> userPosts = getUserPosts(userId);
            for (Object post : userPosts) {
                Map<String, Object> postMap = (Map<String, Object>) post;
                postMap.put("userName", users.get(userId));
                allPosts.add(postMap);
            }
        }

        if ("latest".equals(type)) {
            allPosts.sort((a, b) -> Integer.compare(
                    (Integer) b.get("id"),
                    (Integer) a.get("id")));
            return allPosts.subList(0, Math.min(5, allPosts.size()));
        } else if ("popular".equals(type)) {
            Map<Integer, Integer> commentCounts = new HashMap<>();
            for (Map<String, Object> post : allPosts) {
                Integer postId = (Integer) post.get("id");
                List<?> comments = getPostComments(postId);
                commentCounts.put(postId, comments.size());
            }

            int maxComments = Collections.max(commentCounts.values());

            List<Map<String, Object>> popularPosts = new ArrayList<>();
            for (Map<String, Object> post : allPosts) {
                if (commentCounts.get(post.get("id")) == maxComments) {
                    popularPosts.add(post);
                }
            }
            return popularPosts;
        }

        return new ArrayList<>();
    }

    private List<?> getPostComments(Integer postId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        Map<String, Object> response = restTemplate.exchange(
                baseUrl + "/posts/" + postId + "/comments",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}).getBody();
        return (List<?>) response.get("comments");
    }
}