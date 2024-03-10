package com.alexbackfish.SwordAndStone.Repositories;

import com.alexbackfish.SwordAndStone.Entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
