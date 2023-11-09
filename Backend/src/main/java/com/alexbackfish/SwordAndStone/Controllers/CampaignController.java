package com.alexbackfish.SwordAndStone.Controllers;

import com.alexbackfish.SwordAndStone.DTOs.CreateCampaignDTO;
import com.alexbackfish.SwordAndStone.Entities.Campaign;
import com.alexbackfish.SwordAndStone.Entities.WebUser;
import com.alexbackfish.SwordAndStone.Repositories.CampaignRepository;
import com.alexbackfish.SwordAndStone.Repositories.WebUserRepository;
import com.alexbackfish.SwordAndStone.Services.WebUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
        System.out.println("Registration request...");
        // Check if username already exists

        System.out.printf("/add-campaign formdata: %s for %s\n", formData.getCampaignName(), formData.getUsername());

        Optional<WebUser> user = userRepository.findByUsername(formData.getUsername());

        if(!user.isPresent()) {
            return new ResponseEntity<>("Username doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        Campaign campaign = new Campaign();
        campaign.setCampaignName(formData.getCampaignName());
        campaign.setCampaignDescription(formData.getCampaignDescription());

        // Store the user (make sure to hash the password before storing in real applications!)
        webUserService.addCampaignToUser(user.get().getId(), campaign);

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
    public ResponseEntity<?> campaignList(@RequestParam(value="username") String formData) {
        System.out.println("/private/view-campaigns request...");
        // Check if username already exists

        Optional<WebUser> user = userRepository.findByUsername(formData);

        if(!user.isPresent()) {
            return new ResponseEntity<>("Username doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        Map<Long, Map<String, String>> body = new HashMap<>();

        for (Campaign c : user.get().getCampaigns()) {
            Map<String, String> campaign = new HashMap<>();
            campaign.put("name", c.getCampaignName());
            campaign.put("description", c.getCampaignDescription());
            body.put(c.getId(), campaign);
        }

        // Store the user (make sure to hash the password before storing in real applications!)
        return new ResponseEntity<>(body, HttpStatus.OK);
    }


    //TODO: DELETE TESTING FUNCTION
    @GetMapping(value = "/private/testing", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> test() {
        WebUser u = userRepository.findByUsername("testing").get();
        return new ResponseEntity<>(u, HttpStatus.OK);
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

        if(!campaignOptional.isPresent()) {
            return new ResponseEntity<>("Campaign doesn't exist!", HttpStatus.BAD_REQUEST);
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
}
