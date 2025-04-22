package com.example.InstruementMS.external;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private Long id;
    private String fullName;
    private String email;
    private String password;
    private String role;
    private String dp;
    private LocalDateTime createdAt;



}
