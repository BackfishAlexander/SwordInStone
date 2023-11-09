package com.alexbackfish.SwordAndStone.Services;

import com.alexbackfish.SwordAndStone.Entities.Campaign;
import com.alexbackfish.SwordAndStone.Entities.PlayerCharacter;
import com.alexbackfish.SwordAndStone.Entities.WebUser;
import com.alexbackfish.SwordAndStone.Repositories.WebUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebUserService {

    @Autowired
    private WebUserRepository webUserRepository;

    @Transactional
    public void addCampaignToUser(Long userId, Campaign campaign) {
        System.out.println("");
        WebUser user = webUserRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.addCampaign(campaign);
        webUserRepository.save(user); // This line will save changes to the database
    }
}
