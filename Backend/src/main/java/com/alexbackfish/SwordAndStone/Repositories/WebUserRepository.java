package com.alexbackfish.SwordAndStone.Repositories;

import com.alexbackfish.SwordAndStone.Entities.WebUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WebUserRepository extends JpaRepository<WebUser, Long> {
    Optional<WebUser> findByUsername(String username);
}