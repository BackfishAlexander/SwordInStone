package com.alexbackfish.SwordAndStone.Controllers;

import com.alexbackfish.SwordAndStone.DTOs.CreateCampaignDTO;
import com.alexbackfish.SwordAndStone.DTOs.CreateCharacterDTO;
import com.alexbackfish.SwordAndStone.Entities.Campaign;
import com.alexbackfish.SwordAndStone.Entities.PlayerCharacter;
import com.alexbackfish.SwordAndStone.Entities.WebUser;
import com.alexbackfish.SwordAndStone.Repositories.CampaignRepository;
import com.alexbackfish.SwordAndStone.Repositories.PlayerCharacterRepository;
import com.alexbackfish.SwordAndStone.Repositories.WebUserRepository;
import com.alexbackfish.SwordAndStone.Services.PlayerCampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CharacterController {

    @Autowired
    private WebUserRepository userRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private PlayerCampaignService playerCampaignService;



    @PostMapping(value = "/private/character/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createCharacter(@RequestBody CreateCharacterDTO formData) {
        System.out.println("Request received");
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<WebUser> user = userRepository.findByUsername(username);
        System.out.println("User found");
        Optional<Campaign> campaign = campaignRepository.findById(formData.getCampaignId());
        System.out.println("Campaign found");


        if(!user.isPresent()) {
            return new ResponseEntity<>("Username doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if (!campaign.isPresent()) {
            return new ResponseEntity<>("Campaign doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        PlayerCharacter character = new PlayerCharacter();
        character.setCharacterName(formData.getCharacterName());
        character.setCampaign(campaign.get());
        character.setImageID(formData.getCharacterImageURL());

        // Store the user (make sure to hash the password before storing in real applications!)
        playerCampaignService.addPlayer(user.get().getId(), campaign.get().getId(), character);

        return new ResponseEntity<>("Added new campaign to user", HttpStatus.OK);
    }

    /**
     * Returns all information needed to display a User's players
     *
     * @author backfish.alexander@gmail.com
     */
    @GetMapping(value = "/private/user/playerlist/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> campaignView() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<WebUser> userOptional = userRepository.findByUsername(username);

        if(!userOptional.isPresent()) {
            return new ResponseEntity<>("Player doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        WebUser user = userOptional.get();

        return new ResponseEntity<>(user.getPlayerCharacters(), HttpStatus.OK);
    }
}
