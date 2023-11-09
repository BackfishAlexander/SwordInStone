package com.alexbackfish.SwordAndStone.Services;

import com.alexbackfish.SwordAndStone.Entities.Campaign;
import com.alexbackfish.SwordAndStone.Entities.PlayerCharacter;
import com.alexbackfish.SwordAndStone.Entities.WebUser;
import com.alexbackfish.SwordAndStone.Repositories.CampaignRepository;
import com.alexbackfish.SwordAndStone.Repositories.PlayerCharacterRepository;
import com.alexbackfish.SwordAndStone.Repositories.WebUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerCampaignService {

    @Autowired
    private WebUserRepository webUserRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private PlayerCharacterRepository playerCharacterRepository;

    @Transactional
    public void addPlayer(Long userId, Long campaignId, PlayerCharacter playerCharacter) {
        WebUser user = webUserRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(() -> new RuntimeException("Campaign not found"));

        user.addPlayerCharacter(playerCharacter);
        campaign.addPlayerCharacter(playerCharacter);
        playerCharacterRepository.save(playerCharacter); // This line will save changes to the database
    }
}
