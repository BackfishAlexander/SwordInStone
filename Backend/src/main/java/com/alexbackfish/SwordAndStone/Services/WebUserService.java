package com.alexbackfish.SwordAndStone.Services;

import com.alexbackfish.SwordAndStone.Entities.Campaign;
import com.alexbackfish.SwordAndStone.Entities.PlayerCharacter;
import com.alexbackfish.SwordAndStone.Entities.WebUser;
import com.alexbackfish.SwordAndStone.Repositories.CampaignRepository;
import com.alexbackfish.SwordAndStone.Repositories.WebUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebUserService {

    @Autowired
    private WebUserRepository webUserRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Transactional
    public void addCampaignToUser(Long userId, Campaign campaign, boolean owner) {
        System.out.println("");
        WebUser user = webUserRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getCampaigns().contains(campaign)) {
            user.addCampaign(campaign);
        }
        if (!campaign.getMembers().contains(user)) {
            campaign.addMember(user);
        }
        if (owner) {
            campaign.setUser(user);
        }
        webUserRepository.save(user); // This line will save changes to the database
        campaignRepository.save(campaign);
    }
}
