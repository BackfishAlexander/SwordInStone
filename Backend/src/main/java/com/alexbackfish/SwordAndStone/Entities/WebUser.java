package com.alexbackfish.SwordAndStone.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "WebUser")
public class WebUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    public WebUser() {
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
