package com.alexbackfish.SwordAndStone.Controllers;

import com.alexbackfish.SwordAndStone.DTOs.CreateCampaignDTO;
import com.alexbackfish.SwordAndStone.DTOs.CreateShopDTO;
import com.alexbackfish.SwordAndStone.DTOs.JoinCampaignDTO;
import com.alexbackfish.SwordAndStone.Entities.Campaign;
import com.alexbackfish.SwordAndStone.Entities.Shop;
import com.alexbackfish.SwordAndStone.Entities.WebUser;
import com.alexbackfish.SwordAndStone.Repositories.CampaignRepository;
import com.alexbackfish.SwordAndStone.Repositories.WebUserRepository;
import com.alexbackfish.SwordAndStone.Services.PlayerCampaignService;
import com.alexbackfish.SwordAndStone.Services.WebUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CampaignController {

    @Autowired
    private WebUserRepository userRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private WebUserService webUserService;

    @Autowired
    private PlayerCampaignService playerCampaignService;


    /**
     * Takes in form-data to generate a new campaign owned by the logged in user
     * {
     *   "campaignName": "meme machine",
     *   "campaignDescription": "this is a campaign",
     *   "username": "testing", TODO: Make this an authentication key not a username
     *   "id": "" TODO: Figure out why this ID is being sent
     * }
     *
     * @author backfish.alexander@gmail.com
     */
    @PostMapping("/private/campaign/add")
    public ResponseEntity<?> addCampaign(@RequestBody CreateCampaignDTO formData) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Registration request...");
        // Check if username already exists


        System.out.printf("/add-campaign formdata: %s for %s\n", formData.getCampaignName(), username);

        Optional<WebUser> user = userRepository.findByUsername(username);

        if(!user.isPresent()) {
            return new ResponseEntity<>("Username doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        Campaign campaign = new Campaign();
        campaign.setCampaignName(formData.getCampaignName());
        campaign.setCampaignDescription(formData.getCampaignDescription());
        campaign.setUser(user.get());
        campaign.addMember(user.get());

        // Store the user (make sure to hash the password before storing in real applications!)
        webUserService.addCampaignToUser(user.get().getId(), campaign, true);


        return new ResponseEntity<>("Added new campaign to user", HttpStatus.OK);
    }

    @PostMapping("/private/shop/create")
    public ResponseEntity<?> addCampaign(@RequestBody CreateShopDTO formData) {
        WebUser user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow(() -> new RuntimeException("User not found"));
        Campaign campaign = campaignRepository.findById(formData.getCampaignId()).orElseThrow(() -> new RuntimeException("Campaign not found"));
        Shop shop = new Shop();
        shop.setCampaign(campaign);
        shop.setShopName(formData.getShopName());
        shop.setShopDescription(formData.getShopDescription());
        playerCampaignService.createShop(shop, campaign.getId());

        return new ResponseEntity<>("Created new shop named " + formData.getShopName(), HttpStatus.OK);
    }


    @PostMapping("/private/campaign/join")
    public ResponseEntity<?> joinCampaign(@RequestBody JoinCampaignDTO formData) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("JOINING CAMPAIGN");
        Optional<WebUser> userOptional = userRepository.findByUsername(username);
        Optional<Campaign> campaignOptional = campaignRepository.findById(formData.getCampaignId());

        if(!userOptional.isPresent()) {
            return new ResponseEntity<>("Username doesn't exist!", HttpStatus.BAD_REQUEST);
        }
        if (!campaignOptional.isPresent()) {
            return new ResponseEntity<>("Campaign doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        // Store the user (make sure to hash the password before storing in real applications!)
        webUserService.addCampaignToUser(userOptional.get().getId(), campaignOptional.get(), false);
        System.out.println("CAMPAIGN JOINED SUCCESSFULLY. SENDING SUCCESS.");
        return new ResponseEntity<>("Added new campaign to user", HttpStatus.OK);
    }



    /**
     * Returns a basic list of the given user's campaigns.
     * Holds all information needed to render the buttons.
     * {
     *     "id": {
     *         "name":          "campaignName",
     *         "description":   "campaignDescription",
     *         "id":            "campaignID",
     *         "misc Att.":     "misc Value"
     *     }
     * }
     *
     * @author backfish.alexander@gmail.com
     */
    @GetMapping(value = "/private/campaign/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> campaignList() {
        System.out.println("/private/view-campaigns request...");
        // Check if username already exists

        System.out.println("LISTING FOR " + SecurityContextHolder.getContext().getAuthentication().getName());
        Optional<WebUser> user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());

        if(!user.isPresent()) {
            return new ResponseEntity<>("Username doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        Map<Long, Map<String, String>> body = new HashMap<>();

        for (Campaign c : user.get().getCampaigns()) {
            System.out.println(c.getCampaignName());
            Map<String, String> campaign = new HashMap<>();
            campaign.put("name", c.getCampaignName());
            campaign.put("description", c.getCampaignDescription());
            campaign.put("ownerId", c.getUser().getId().toString());
            body.put(c.getId(), campaign);
        }

        System.out.println("returning " + body.size() + " campaigns");

        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    /**
     * Returns all information needed to display the home campaign page
     * Data Format:
     * {
     *     "id": {
     *         "name":          "campaignName",
     *         "description":   "campaignDescription",
     *         "id":            "campaignID",
     *         "misc Att.":     "misc Value"
     *     }
     * }
     *
     * @author backfish.alexander@gmail.com
     */
    @GetMapping(value = "/private/campaign/view/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> campaignView(@PathVariable("id") Long id) {
        System.out.println("/private/campaign/view/{id} request...");


        Optional<Campaign> campaignOptional = campaignRepository.findById(id);
        Optional<WebUser> user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());


        if(!campaignOptional.isPresent()) {
            return new ResponseEntity<>("Campaign doesn't exist!", HttpStatus.BAD_REQUEST);
        }
        if (!user.get().getCampaigns().contains(campaignOptional.get())) {
            return new ResponseEntity<>("You do not have access to this campaign", HttpStatus.UNAUTHORIZED);
        }

        Campaign campaign = campaignOptional.get();

//        Map<String, String> campaignData = new HashMap<>();
//        campaignData.put("name", campaign.getCampaignName());
//        campaignData.put("description", campaign.getCampaignDescription());
//        campaignData.put("id", Long.toString(id));
//
//
//
//        // Store the user (make sure to hash the password before storing in real applications!)
//        return new ResponseEntity<>(campaignData, HttpStatus.OK);
        return new ResponseEntity<>(campaign, HttpStatus.OK);
    }

    @DeleteMapping(value = "/private/campaign/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> campaignDelete(@PathVariable("id") Long id) {
        Optional<Campaign> campaignOptional = campaignRepository.findById(id);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<WebUser> userOptional = userRepository.findByUsername(username);

        if(!campaignOptional.isPresent()) {
            return new ResponseEntity<>("Campaign doesn't exist!", HttpStatus.BAD_REQUEST);
        }
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>("User doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        WebUser user = userOptional.get();

        if (!campaignOptional.get().getUser().getUsername().equals(user.getUsername())) {
            return new ResponseEntity<>("User doesn't own this campaign", HttpStatus.UNAUTHORIZED);
        }

        Campaign campaign = campaignOptional.get();
        campaignRepository.delete(campaign);

        return new ResponseEntity<>("Campaign deleted successfully", HttpStatus.OK);
    }


    @PostMapping(value = "/private/campaign/leave/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> campaignLeave(@PathVariable("id") Long id) {
        Optional<Campaign> campaignOptional = campaignRepository.findById(id);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<WebUser> userOptional = userRepository.findByUsername(username);

        if(!campaignOptional.isPresent()) {
            return new ResponseEntity<>("Campaign doesn't exist!", HttpStatus.BAD_REQUEST);
        }
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>("User doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        WebUser user = userOptional.get();
        Campaign campaign = campaignOptional.get();

        if (campaign.getUser().getId() == user.getId()) {
            return new ResponseEntity<>("Cant leave a campaign owned by user.", HttpStatus.BAD_REQUEST);
        }

        if (!user.getCampaigns().contains(campaign)) {
            return new ResponseEntity<>("User doesn't own this campaign", HttpStatus.UNAUTHORIZED);
        }

        user.removeCampaign(campaign);

        userRepository.save(user);

        return new ResponseEntity<>("Campaign left successfully", HttpStatus.OK);
    }
}
