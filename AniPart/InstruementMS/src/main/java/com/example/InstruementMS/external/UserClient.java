package com.example.InstruementMS.external;

import com.example.InstruementMS.util.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-client", url = "http://localhost:8080/public/user")
public interface UserClient {
    @GetMapping("/verify-JWT")
    ApiResponse<User> verifyJWT(@RequestHeader("Authorization") String bearerToken);
}

