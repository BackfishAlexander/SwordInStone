package com.alexbackfish.SwordAndStone.Controllers;

import com.alexbackfish.SwordAndStone.DTOs.CreateCampaignDTO;
import com.alexbackfish.SwordAndStone.DTOs.Requests.AuthenticationRequest;
import com.alexbackfish.SwordAndStone.DTOs.Requests.RegisterRequest;
import com.alexbackfish.SwordAndStone.DTOs.Responses.AuthenticationResponse;
import com.alexbackfish.SwordAndStone.DTOs.UsernameDTO;
import com.alexbackfish.SwordAndStone.Entities.Campaign;
import com.alexbackfish.SwordAndStone.Entities.WebUser;
import com.alexbackfish.SwordAndStone.Repositories.CampaignRepository;
import com.alexbackfish.SwordAndStone.Repositories.WebUserRepository;
import com.alexbackfish.SwordAndStone.Services.AuthenticationService;
import com.alexbackfish.SwordAndStone.Services.WebUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private WebUserRepository userRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private WebUserService webUserService;


    private final AuthenticationService authenticationService;

//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody String requestBody) {
//        System.out.println(requestBody);
//        return ResponseEntity.badRequest().body("Invalid username or password");
//    }

//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody WebUser loginDTO) {
//        Optional<WebUser> userOptional = userRepository.findByUsername(loginDTO.getUsername());
//
//        if (userOptional.isPresent()) {
//            WebUser user = userOptional.get();
//            if (user.getPassword().equals(loginDTO.getPassword())) {  // NOTE: Don't do this in production! Use encrypted passwords.
//                System.out.printf("User logged in: %s\n", user.getUsername());
//                return ResponseEntity.ok().body("Logged in successfully");
//            }
//        }
//        else {
//            System.out.println("Username not found: " + loginDTO.getUsername());
//        }
//        System.out.println("User failed to login");
//        return ResponseEntity.badRequest().body("Invalid username or password");
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(
//            @RequestBody WebUser user
//    ) {
//        System.out.println("Registration request...");
//        // Check if username already exists
//        if(userRepository.findByUsername(user.getUsername()).isPresent()) {
//            return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);
//        }
//
//        // Store the user (make sure to hash the password before storing in real applications!)
//        userRepository.saveAndFlush(user);
//        System.out.println("Saving user...");
//        System.out.println(user.getUsername());
//        System.out.println(user.getPassword());
//
//        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
//    }



    //admin admin


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/test")
    public String defaultPage() {
        return "<h1>Spring Server is running</h1>";
    }

//    @GetMapping("/test-a")
//    public String testA() {
//        return "<h1>requires authentication</h1>";
//    }
//
//    @GetMapping("/test-b")
//    public String testB() {
//        return "<h1>doesnt require authentication</h1>";
//    }
}

