package com.alexbackfish.SwordAndStone.Repositories;

import com.alexbackfish.SwordAndStone.Entities.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    @Override
    Optional<Campaign> findById(Long aLong);


    Optional<Campaign> findByURL(String URL);
}
