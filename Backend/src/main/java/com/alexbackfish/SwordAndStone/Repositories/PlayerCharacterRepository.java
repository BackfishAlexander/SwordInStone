package com.alexbackfish.SwordAndStone.Repositories;

import com.alexbackfish.SwordAndStone.Entities.PlayerCharacter;
import com.alexbackfish.SwordAndStone.Entities.WebUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerCharacterRepository extends JpaRepository<PlayerCharacter, Long> {
}
