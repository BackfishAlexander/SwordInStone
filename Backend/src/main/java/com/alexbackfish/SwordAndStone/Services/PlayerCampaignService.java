package com.alexbackfish.SwordAndStone.Services;

import com.alexbackfish.SwordAndStone.Entities.Campaign;
import com.alexbackfish.SwordAndStone.Entities.PlayerCharacter;
import com.alexbackfish.SwordAndStone.Entities.Shop;
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
        playerCharacter.setUser(user);
        playerCharacter.setCampaign(campaign);
        campaign.addPlayerCharacter(playerCharacter);
        playerCharacterRepository.save(playerCharacter); // This line will save changes to the database
    }

    @Transactional
    public void addUser(Long userId, Long campaignId) {
        WebUser user = webUserRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(() -> new RuntimeException("Campaign not found"));
        user.addCampaign(campaign);
        webUserRepository.save(user); // This line will save changes to the database
        campaignRepository.save(campaign);
    }

    public void createShop(Shop shop, Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(() -> new RuntimeException("Campaign not found"));
        campaign.addShop(shop);
        campaignRepository.save(campaign);
    }
}
